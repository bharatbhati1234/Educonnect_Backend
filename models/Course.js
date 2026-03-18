
// Course.js file -----------------------------------------------------------------


import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  slug: {
    type: String
  },

  description: {
    type: String
  },

  price: {
    type: Number,
    default: 0
  },

  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"]
  },

  duration: {
    type: String
  },

  language: {
    type: String,
    default: "English"
  },

  thumbnail: {
    type: String
  },

  introVideo: {
    type: String
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },

  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instructor"
  },

  lessons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson"
  }],

  sections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section"
    }
  ],

  students: {
    type: Number,
    default: 0
  },

  rating: {
    type: Number,
    default: 0
  },

  totalRatings: {
    type: Number,
    default: 0
  },

  certificate: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true
})

export default mongoose.model("Course", courseSchema)