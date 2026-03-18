// entrollmentController.js file ---------------------------------------------------------------------


// Enrollment Controller Handles course enrollment and fetching enrolled courses
 

import Enrollment from "../models/Enrollment.js";
import Lesson from "../models/Lesson.js";


// ENROLL USER IN COURSE
export const enrollCourse = async (req, res) => {
  try {

    const { userId, courseId } = req.body;

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

    res.status(201).json({
      success: true,
      enrollment
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET MY COURSES
export const getMyCourses = async (req, res) => {
  try {

    const enrollments = await Enrollment.find({
      user: req.params.userId
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


export const markLessonComplete = async (req, res) => {
  try {
    const { userId, courseId, lessonId } = req.body;

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

    // total lessons count
    const totalLessons = await Lesson.countDocuments({
      course: courseId
    });

    enrollment.progress =
      (enrollment.completedLessons.length / totalLessons) * 100;

    await enrollment.save();

    res.json({
      success: true,
      progress: enrollment.progress
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.params;

    const enrollment = await Enrollment.findOne({
      user: userId,
      course: courseId
    }).populate("completedLessons");

    res.json({
      success: true,
      progress: enrollment.progress,
      completedLessons: enrollment.completedLessons
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};