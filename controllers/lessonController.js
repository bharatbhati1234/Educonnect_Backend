// lessonController.js file ------------------------------------------------------------

// Lesson Controller Handles lesson creation, retrieval, update and deletion
 

import Lesson from "../models/Lesson.js";
import Section from "../models/Section.js";


// CREATE LESSON
export const createLesson = async (req, res) => {
  try {

    const { title, videoUrl, duration, sectionId } = req.body;

    const lesson = await Lesson.create({
      title,
      videoUrl,
      duration,
      section: sectionId
    });

    await Section.findByIdAndUpdate(sectionId, {
      $push: { lessons: lesson._id }
    });

    res.status(201).json({
      success: true,
      lesson
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET ALL LESSONS
export const getAllLessons = async (req, res) => {
  try {

    const lessons = await Lesson.find()
      .populate("section");

    res.json({
      success: true,
      count: lessons.length,
      lessons
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET LESSONS BY SECTION
export const getLessons = async (req, res) => {
  try {

    const lessons = await Lesson.find({
      section: req.params.sectionId
    });

    res.json({
      success: true,
      lessons
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET SINGLE LESSON

export const getSingleLesson = async (req, res) => {
  try {

    const lesson = await Lesson.findById(req.params.id)
      .populate("section");

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found"
      });
    }

    res.json({
      success: true,
      lesson
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// UPDATE LESSON
export const updateLesson = async (req, res) => {
  try {

    const lesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      lesson
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// DELETE LESSON
export const deleteLesson = async (req, res) => {
  try {

    await Lesson.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Lesson deleted"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};