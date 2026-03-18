// Lesson.js file ----------------------------------------------------------------

// Lesson Model Stores individual course lessons including video and duration
 

import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  videoUrl: {
    type: String,
    required: true
  },

  duration: {
    type: String
  },

  isPreview: {
    type: Boolean,
    default: false
  },

  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Section"
  }

}, { timestamps: true });

export default mongoose.model("Lesson", lessonSchema);