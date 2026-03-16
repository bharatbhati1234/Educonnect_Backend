// Lesson.js file ----------------------------------------------------------------

// esme jo course buy karege student to esme us course k videos rehege 

import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({

  title:{
    type:String,
    required:true
  },

  videoUrl:{
    type:String
  },

  duration:{
    type:String
  },

  course:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Course"
  }

},{
  timestamps:true
})

export default mongoose.model("Lesson",lessonSchema)