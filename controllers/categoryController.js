
// categoryController.js file -----------------------------------------------------------

// Controller for handling category CRUD operations.
// Allows admin to create, update, delete and fetch categories.
 

import Category from "../models/Category.js";


// Create Category
export const createCategory = async (req, res) => {

    try {
        const { name, description } = req.body;
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({
                message: "Category already exists"
            });
        }

        const category = await Category.create({
            name,
            description
        });

        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data:category
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });

    }

};



// Get All Categories
export const getCategories = async (req, res) => {

    try {
        const categories = await Category.find();
        res.status(200).json({
            success: true,
            data:categories
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });

    }

};



// Get Single Category
export const getCategoryById = async (req, res) => {

    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            data:category
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });

    }

};



// Update Category
export const updateCategory = async (req, res) => {

    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data:category
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });

    }

};



// Delete Category
export const deleteCategory = async (req, res) => {

    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });

    }

};