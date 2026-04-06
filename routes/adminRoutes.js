// adminRoutes.js file --------------------------------------------------------------

import express from "express";
import authMiddleware from "../middleware/authMiddleware.js"; // ✅ correct
import { isAdmin } from "../middleware/adminMiddleware.js";
import { getDashboardStats } from "../controllers/adminController.js";


const router = express.Router();


// 🔐 protected admin route

router.get("/dashboard-stats", authMiddleware, isAdmin, getDashboardStats);


export default router;