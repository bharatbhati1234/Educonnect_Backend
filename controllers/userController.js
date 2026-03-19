// userController.js file -----------------------------------------------------------------

// esme create ka nhi hai kiuki create(post) ka register me authController.js register kerte hai tab usme banaye hai esliye 


import User from "../models/User.js";


// GET ALL USERS (Admin only)
export const getAllUsers = async (req, res) => {
    try {

        const users = await User.find().select("-password");

        res.json({
            success: true,
            count: users.length,
            users
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// get single user by id

export const getSingleUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            success: true,
            user
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



// GET PROFILE
export const getUserProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user._id).select("-password");

        res.json({
            success: true,
            user
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// UPDATE PROFILE
export const updateUserProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.name = req.body.name || user.name;
        user.profileImage = req.body.profileImage || user.profileImage;

        const updatedUser = await user.save();

        res.json({
            success: true,
            user: {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                profileImage: updatedUser.profileImage,
                role: updatedUser.role
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// DELETE USER (Admin only)
export const deleteUser = async (req, res) => {
    try {

        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// forgot password

import sendEmail from "../utils/sendEmail.js";

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOtp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;   //otp expire in 5 minutes

    await user.save();

    await sendEmail(email, otp);

    res.json({
        message: "OTP sent to email"
    });
};



// OTP verify

export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.resetOtp !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiry < Date.now()) {
        return res.status(400).json({ message: "OTP expired" });
    }

    res.json({ message: "OTP verified" });
};



// ResetPassword 

import bcrypt from "bcryptjs";

export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.resetOtp !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiry < Date.now()) {
        return res.status(400).json({ message: "OTP expired" });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    user.resetOtp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
};