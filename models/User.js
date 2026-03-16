// User.js file -------------------------------------------------------


// User Schema for Educonnect platform
// stores authentication details and role-based acess(student, instructor, admin)


import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },

        email:{
            type:String,
            required:true,
            unique:true
        },

        password:{
            type:String,
            required:true
        },

        role:{
            type:String,
            enum:["student","instructor","admin"],
            default:"student"
        },

        profileImage:{
            type:String,
            default:""
        }
    },
    {timestamps:true}
)

const User = mongoose.model("User",userSchema);
export default User;