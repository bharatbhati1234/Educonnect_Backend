// sectionController.js file ---------------------------------------------------

// Section Controller Handles creation, retrieval, update and deletion of course sections
 

import Section from "../models/Section.js";
import Course from "../models/Course.js";


// CREATE SECTION
export const createSection = async (req, res) => {
  try {

    const { title, courseId } = req.body;

    const section = await Section.create({
      title,
      course: courseId
    });

    await Course.findByIdAndUpdate(courseId, {
      $push: { sections: section._id }
    });

    res.status(201).json({
      success: true,
      section
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET ALL SECTIONS
export const getAllSections = async (req, res) => {
  try {

    const sections = await Section.find()
      .populate("course")
      .populate("lessons");

    res.json({
      success: true,
      count: sections.length,
      sections
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET SINGLE SECTION

export const getSingleSection = async (req, res) => {
  try {

    const section = await Section.findById(req.params.id)
      .populate("lessons");

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found"
      });
    }

    res.json({
      success: true,
      section
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET SECTIONS BY COURSE
export const getSections = async (req, res) => {
  try {

    const sections = await Section.find({ course: req.params.courseId })
      .populate("lessons");

    res.json({
      success: true,
      sections
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// UPDATE SECTION
export const updateSection = async (req, res) => {
  try {

    const section = await Section.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      section
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// DELETE SECTION
export const deleteSection = async (req, res) => {
  try {

    await Section.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Section deleted"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
