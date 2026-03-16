/**
 * Instructor Controller
 * Handles instructor creation, update, deletion and retrieval.
 * Supports profile image upload and instructor profile management.
 */

import Instructor from "../models/Instructor.js";


// CREATE INSTRUCTOR
export const createInstructor = async(req,res)=>{

try{

const {
name,
email,
title,
bio,
expertise,
phone,
address,
facebook,
twitter,
linkedin,
website
} = req.body
console.log(req.body)


const existingInstructor = await Instructor.findOne({email})

if(existingInstructor){
return res.status(400).json({
success:false,
message:"Instructor already exists"
})
}

const profileImage = req.file ? req.file.filename : ""
console.log(req.file)

const instructor = await Instructor.create({

name,
email,
title,
bio,
expertise,
phone,
address,
profileImage,

socialLinks:{
facebook,
twitter,
linkedin,
website
}

})

res.status(201).json({
success:true,
message:"Instructor created successfully",
instructor
})

}
catch(error){

res.status(500).json({
success:false,
message:error.message
})

}

}



// GET ALL INSTRUCTORS
export const getAllInstructors = async(req,res)=>{

try{

const instructors = await Instructor.find().sort({createdAt:-1})

res.status(200).json({
success:true,
count:instructors.length,
instructors
})

}
catch(error){

res.status(500).json({
success:false,
message:error.message
})

}

}



// GET SINGLE INSTRUCTOR
export const getInstructorById = async(req,res)=>{

try{

const instructor = await Instructor.findById(req.params.id)

if(!instructor){
return res.status(404).json({
success:false,
message:"Instructor not found"
})
}

res.status(200).json({
success:true,
instructor
})

}
catch(error){

res.status(500).json({
success:false,
message:error.message
})

}

}



// UPDATE INSTRUCTOR
export const updateInstructor = async(req,res)=>{

try{

const {
name,
email,
title,
bio,
expertise,
phone,
address,
facebook,
twitter,
linkedin,
website
} = req.body


const updateData = {
name,
email,
title,
bio,
expertise,
phone,
address,
socialLinks:{
facebook,
twitter,
linkedin,
website
}
}


if(req.file){
updateData.profileImage = req.file.filename
}

const instructor = await Instructor.findByIdAndUpdate(
req.params.id,
updateData,
{new:true}
)

res.status(200).json({
success:true,
message:"Instructor updated successfully",
instructor
})

}
catch(error){

res.status(500).json({
success:false,
message:error.message
})

}

}



// DELETE INSTRUCTOR
export const deleteInstructor = async(req,res)=>{

try{

await Instructor.findByIdAndDelete(req.params.id)

res.status(200).json({
success:true,
message:"Instructor deleted successfully"
})

}
catch(error){

res.status(500).json({
success:false,
message:error.message
})

}

}