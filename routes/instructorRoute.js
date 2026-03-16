// instructorRoute.js file ------------------------------------------------------------


// Instructor Routes
// Defines API endpoints for instructor management.
 

import express from "express";
import {
  createInstructor,
  getAllInstructors,
  getInstructorById,
  updateInstructor,
  deleteInstructor
} from "../controllers/instructorController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();


router.post(
  "/createinstructor/",
  authMiddleware,
  roleMiddleware("admin"),
  upload.single("profileImage"),
  createInstructor
);

router.get("/getinstructors/", getAllInstructors);

router.get("/getinstructorbyid/:id", getInstructorById);

router.put(
  "/updateinstructorbyid/:id",
  authMiddleware,
  roleMiddleware("admin"),
  upload.single("profileImage"),
  updateInstructor
);

router.delete(
  "/deleteinstructorbyid/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteInstructor
);

export default router;