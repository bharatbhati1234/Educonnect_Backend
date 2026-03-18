// Entrollment.js file ----------------------------------------------------------------------

// Enrollment Model Stores which user is enrolled in which course
 

import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },

  completedLessons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson"
  }],

  progress: {
    type: Number,
    default: 0
  },

  enrolledAt: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true });

export default mongoose.model("Enrollment", enrollmentSchema);