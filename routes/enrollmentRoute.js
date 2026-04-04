// enrollmentRoute.js file ----------------------------------------------------------


import express from "express";

import {
  enrollCourse,
  getMyCourses,
  getCourseStudents,
  markLessonComplete,
  getProgress
} from "../controllers/enrollmentController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";



const router = express.Router();

router.post("/enroll", authMiddleware, enrollCourse);

router.get("/my-courses", authMiddleware, getMyCourses);

router.get(
  "/course-students/:courseId",
  authMiddleware,
  roleMiddleware("admin", "instructor"),
  getCourseStudents
);

router.post("/complete-lesson", authMiddleware, markLessonComplete);

router.get("/progress/:courseId", authMiddleware, getProgress);

export default router;