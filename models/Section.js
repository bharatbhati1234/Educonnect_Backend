// Section.js file -------------------------------------------------------------------

// Section Model Groups multiple lessons inside a course
 

import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },

  lessons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson"
    }
  ]

}, { timestamps: true });

export default mongoose.model("Section", sectionSchema);