// sectionRoute.js file ----------------------------------------------------------------

// Section Routes Defines API endpoints for managing course sections
 

import express from "express";

import {
  createSection,
  getAllSections,
  getSections,
  getSingleSection,   
  updateSection,
  deleteSection
} from "../controllers/sectionController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";


const router = express.Router();

router.post("/createsection", authMiddleware, roleMiddleware("admin", "instructor"), createSection);

router.get("/getallsections", getAllSections);

router.get("/getsectionbycourseid/:courseId", getSections);

router.get("/getsinglesection/:id", getSingleSection);

router.put("/updatesectionbyid/:id",authMiddleware, roleMiddleware("admin", "instructor"), updateSection);

router.delete("/deletesectionbyid/:id",authMiddleware, roleMiddleware("admin", "instructor"), deleteSection);

export default router;


