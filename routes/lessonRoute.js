// lessonRoute.js file --------------------------------------------------------------

// Lesson Routes Defines API endpoints for managing lessons inside sections
 

import express from "express";

import {
  createLesson,
  getAllLessons,
  getLessons,
  getSingleLesson,
  updateLesson,
  deleteLesson
} from "../controllers/lessonController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/createlesson", authMiddleware, roleMiddleware("admin", "instructor"), createLesson);

router.get("/getalllessons", getAllLessons);

router.get("/getlessonbysectionid/:sectionId", getLessons);

router.get("/getsinglelesson/:id", getSingleLesson);

router.put("/updatelessonbyid/:id", authMiddleware, roleMiddleware("admin", "instructor"), updateLesson);

router.delete("/deletelessonbyid/:id", authMiddleware, roleMiddleware("admin", "instructor"), deleteLesson);

export default router;