// categoryRoute.js file ---------------------------------------------------------------

// Routes for category management.
// Defines API endpoints for category CRUD operations.
 

import express from "express";

import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from "../controllers/categoryController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();


// create category (admin only)
router.post("/createcategory", authMiddleware, roleMiddleware("admin"), createCategory);


// get all categories
router.get("/getcategories", getCategories);


// get category by id
router.get("/getcategorybyid/:id", getCategoryById);


// update category
router.put("/updatecategorybyid/:id", authMiddleware, roleMiddleware("admin"), updateCategory);


// delete category
router.delete("/deletecategorybyid/:id", authMiddleware, roleMiddleware("admin"), deleteCategory);


export default router;