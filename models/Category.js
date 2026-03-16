// Category.js file --------------------------------------------------------------

// category schema for grouping courses.
// example: web Development, data science, ui/ux etc.


import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            unique:true
        },

        description:{
            type:String,
            default:""
        }
    },
    {timestamps:true}
);

const Category = mongoose.model("Category",categorySchema);

export default Category;