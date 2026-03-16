/**
 * Instructor Schema
 * Stores instructor profile details used across EduConnect platform
 * including profile page, instructor listing and course association.
 */

import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },

    title:{
        type:String,
        default:"Instructor"
    },

    bio:{
        type:String,
        default:""
    },

    expertise:{
        type:String,
        default:""
    },

    profileImage:{
        type:String,
        default:""
    },

    phone:{
        type:String,
        default:""
    },

    address:{
        type:String,
        default:""
    },

    students:{
        type:Number,
        default:0
    },

    rating:{
        type:Number,
        default:0
    },

    socialLinks:{
        facebook:{ type:String, default:"" },
        twitter:{ type:String, default:"" },
        linkedin:{ type:String, default:"" },
        website:{ type:String, default:"" }
    }

},{timestamps:true})


const Instructor = mongoose.model("Instructor", instructorSchema)

export default Instructor