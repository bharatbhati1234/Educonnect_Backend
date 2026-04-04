// entrollmentController.js file ---------------------------------------------------------------------


// Enrollment Controller Handles course enrollment and fetching enrolled courses


// Enrollment Controller

import Enrollment from "../models/Enrollment.js";
import Lesson from "../models/Lesson.js";
import Section from "../models/Section.js";
import Course from "../models/Course.js"; 


// ENROLL USER IN COURSE
export const enrollCourse = async (req, res) => {
  try {

    const { courseId } = req.body;
    const userId = req.user._id;

    // Check already enrolled
    const existing = await Enrollment.findOne({
      user: userId,
      course: courseId
    });

    if (existing) {
      return res.status(400).json({
        message: "Already enrolled"
      });
    }

    const enrollment = await Enrollment.create({
      user: userId,
      course: courseId
    });

    console.log("enrollment created")

    // UPDATE STUDENT COUNT
    await Course.findByIdAndUpdate(courseId, {
      $inc: { students: 1 }
    });

    res.status(201).json({
      success: true,
      enrollment
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET MY COURSES (SECURE)
export const getMyCourses = async (req, res) => {
  try {

    const enrollments = await Enrollment.find({
      user: req.user._id
    }).populate("course");

    res.json({
      success: true,
      courses: enrollments
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET COURSE STUDENTS
export const getCourseStudents = async (req, res) => {
  try {

    const students = await Enrollment.find({
      course: req.params.courseId
    }).populate("user");

    res.json({
      success: true,
      students
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// MARK LESSON COMPLETE 
export const markLessonComplete = async (req, res) => {
  try {

    const { courseId, lessonId } = req.body;
    const userId = req.user._id; 

    const enrollment = await Enrollment.findOne({
      user: userId,
      course: courseId
    });

    if (!enrollment) {
      return res.status(404).json({ message: "Not enrolled" });
    }

    // already completed check
    if (enrollment.completedLessons.includes(lessonId)) {
      return res.json({ message: "Already completed" });
    }

    enrollment.completedLessons.push(lessonId);

    // TOTAL LESSON COUNT
    const sections = await Section.find({ course: courseId });

    let totalLessons = 0;

    for (let sec of sections) {
      totalLessons += sec.lessons.length;
    }

    // avoid divide by zero
    if (totalLessons === 0) {
      enrollment.progress = 0;
    } else {
      enrollment.progress =
        (enrollment.completedLessons.length / totalLessons) * 100;
    }

    await enrollment.save();

    res.json({
      success: true,
      progress: enrollment.progress
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET PROGRESS
export const getProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user._id;

    const enrollment = await Enrollment.findOne({
      user: userId,
      course: courseId
    }).populate("completedLessons");

    if (!enrollment) {
      return res.status(404).json({
        message: "Not enrolled"
      });
    }

    res.json({
      success: true,
      progress: enrollment.progress,
      completedLessons: enrollment.completedLessons
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



