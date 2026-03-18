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
      instructor,
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
      instructor,
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
