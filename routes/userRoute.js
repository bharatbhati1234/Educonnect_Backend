// userRoute.js file -------------------------------------------------------------------


import express from "express";
import { getUserProfile, getAllUsers,getSingleUserById, updateUserProfile, deleteUser, forgotPassword, verifyOtp, resetPassword} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";


const router = express.Router();

// Get profile  (matlab jo login users hai unka data show hoga jo bhi ho admin,instructor,student)
router.get("/profile", authMiddleware, getUserProfile);

// get single user by id 
router.get("/getsingleuserbyid/:id", authMiddleware, roleMiddleware("admin"), getSingleUserById);

// GET ALL USERS (only admin)
router.get( "/getallusers", authMiddleware, roleMiddleware("admin"),getAllUsers);

// Update profile (matlab jo login users hai unka data Updated kersakte hai sirf);
// jis user,admin ya instructor ka data updated kerna hai usi ka token postman me insert kerne ka update k liye 
router.put("/profile", authMiddleware, updateUserProfile);

// delete profile
router.delete("/deleteuserbyid/:id", authMiddleware, roleMiddleware("admin"), deleteUser);

// forgot password
router.post("/forgot-password", forgotPassword);

// verify OTP
router.post("/verify-otp", verifyOtp);

// Reset Password
router.post("/reset-password", resetPassword);


export default router;