// enrollmentRoute.js file ----------------------------------------------------------


import express from "express";

import {
  enrollCourse,
  getMyCourses,
  getCourseStudents,
  markLessonComplete,
  getProgress
} from "../controllers/enrollmentController.js";

const router = express.Router();

router.post("/enroll", enrollCourse);

router.get("/getenrollcourse/:userId", getMyCourses);

router.get("/course-students/:courseId", getCourseStudents);

router.post("/enrollments/complete-lesson",markLessonComplete);

router.get("/progress/:userId/:courseId",getProgress);

export default router;