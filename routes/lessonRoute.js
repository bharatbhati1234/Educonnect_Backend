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

const router = express.Router();

router.post("/createlesson", createLesson);

router.get("/getalllessons", getAllLessons);

router.get("/getlessonbysectionid/:sectionId", getLessons);

router.get("/getsinglelesson/:id", getSingleLesson);


router.put("/updatelessonbyid/:id", updateLesson);

router.delete("/deletelessonbyid/:id", deleteLesson);

export default router;