// courseController.js file -------------------------------------------------------------


// Course Controller Handles course creation, update, deletion and retrieval
// including thumbnail upload and intro video support.
 


import Course from "../models/Course.js";


// CREATE COURSE
export const createCourse = async (req, res) => {
  try {

    const {
      title,
      description,
      price,
      level,
      duration,
      language,
      category,
      instructor,
      certificate,
      introVideo
    } = req.body;

    const thumbnail = req.file ? req.file.filename : null;

    const course = await Course.create({
      title,
      description,
      price,
      level,
      duration,
      language,
      category,
      instructor: req.user._id,
      certificate,
      introVideo,
      thumbnail
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET ALL COURSES
export const getCourses = async (req, res) => {
  try {

    const courses = await Course.find()
      .populate("instructor")
      .populate("category");

    res.json({
      success: true,
      count: courses.length,
      courses
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET SINGLE COURSE (BY ID)
export const getCourseById = async (req, res) => {
  try {

    const course = await Course.findById(req.params.id)
      .populate("instructor")
      .populate("category")
      .populate("lessons");

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    res.json({
      success: true,
      course
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET COURSES BY CATEGORY
export const getCoursesByCategory = async (req, res) => {
  try {
    const courses = await Course.find({ category: req.params.id })
      .populate("category")
      .populate("instructor");

    res.json({
      success: true,
      courses
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET COURSES BY INSTRUCTOR
export const getCoursesByInstructor = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.params.id })
      .populate("category")
      .populate("instructor");

    res.json({
      success: true,
      courses
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// UPDATE COURSE
export const updateCourse = async (req, res) => {
  try {

    const {
      title,
      description,
      price,
      level,
      duration,
      language,
      category,
      instructor,
      certificate,
      introVideo
    } = req.body;

    const updateData = {
      title,
      description,
      price,
      level,
      duration,
      language,
      category,
      instructor: req.user._id,
      certificate,
      introVideo
    };

    if (req.file) {
      updateData.thumbnail = req.file.filename;
    }

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({
      success: true,
      message: "Course updated successfully",
      course
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// DELETE COURSE
export const deleteCourse = async (req, res) => {
  try {

    await Course.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Course deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// forgot password 

export const forgotPassword = async (req, res) => {
  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOtp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 min

    await user.save();

    res.json({
      success: true,
      message: "OTP generated",
      otp // ⚠️ abhi testing ke liye bhej rahe
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// search, filter and Pagination 

export const filterCourses = async (req, res) => {
  try {

    const {
      category,
      instructor,
      level,
      price,
      search,
      sort = "newest",
      page = 1,
      limit = 6
    } = req.query;

    let query = {};

    // filters
    if (category) query.category = category;

    if (instructor) query.instructor = instructor;

    if (level) query.level = level;

    if (price === "free") query.price = 0;

    if (price === "paid") query.price = { $gt: 0 };

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // sorting
    let sortOption = {};

    if (sort === "newest") sortOption = { createdAt: -1 };
    if (sort === "oldest") sortOption = { createdAt: 1 };
    if (sort === "priceLow") sortOption = { price: 1 };
    if (sort === "priceHigh") sortOption = { price: -1 };

    // pagination
    const skip = (page - 1) * limit;

    const total = await Course.countDocuments(query);

    const courses = await Course.find(query)
      .populate("category")
      .populate("instructor")
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      count: courses.length,
      courses
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
