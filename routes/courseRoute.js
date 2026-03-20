// courseRoute.js file ------------------------------------------------------------------

// Course Routes
// Defines API endpoints for course operations
 
import express from "express";

import {
  createCourse,
  getCourses,
  getCourseById,
  getCoursesByCategory,
  getCoursesByInstructor,
  updateCourse,
  deleteCourse,
  filterCourses
} from "../controllers/courseController.js";

import upload from "../middleware/courseUpload.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";



const router = express.Router();

// create course (only admin/instructor)
router.post(
  "/createcourse",
  authMiddleware,
  roleMiddleware("admin", "instructor"),
  upload.single("thumbnail"),
  createCourse
);

// getallcourses
router.get("/getcourses", getCourses);

//get course by id
router.get("/getcoursebyid/:id", getCourseById);


// get courses by category 
router.get("/category/:id", getCoursesByCategory);

//get course by instructor
router.get("/instructor/:id", getCoursesByInstructor);

// update course
router.put(
  "/updatecoursebyid/:id",
  authMiddleware,
  roleMiddleware("admin", "instructor"),
  upload.single("thumbnail"),
  updateCourse
);

// delete course
router.delete(
  "/deletecoursebyid/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteCourse
);


// filter,search,pagination route

router.get("/filtercourses", filterCourses);

export default router;