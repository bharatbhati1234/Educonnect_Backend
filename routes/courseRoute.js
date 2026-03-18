// courseRoute.js file ------------------------------------------------------------------

// Course Routes
// Defines API endpoints for course operations
 
import express from "express";

import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse
} from "../controllers/courseController.js";

import upload from "../middleware/courseUpload.js";

const router = express.Router();

router.post("/createcourse", upload.single("thumbnail"), createCourse);

router.get("/getcourses", getCourses);

router.get("/getcoursebyid/:id", getCourseById);

router.put("/updatecoursebyid/:id", upload.single("thumbnail"), updateCourse);

router.delete("/deletecoursebyid/:id", deleteCourse);

export default router;