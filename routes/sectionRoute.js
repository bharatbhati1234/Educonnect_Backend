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

const router = express.Router();

router.post("/createsection", createSection);

router.get("/getallsections", getAllSections);

router.get("/getsectionbycourseid/:courseId", getSections);

router.get("/getsinglesection/:id", getSingleSection);

router.put("/updatesectionbyid/:id", updateSection);

router.delete("/deletesectionbyid/:id", deleteSection);

export default router;


