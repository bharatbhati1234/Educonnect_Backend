// adminController.js file -------------------------------------------------------------

import User from "../models/User.js";
import Instructor from "../models/Instructor.js";
import Course from "../models/Course.js";
import Category from "../models/Category.js";
import Enrollment from "../models/Enrollment.js";
import Payment from "../models/Payment.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalInstructors = await Instructor.countDocuments();
    const totalCourses = await Course.countDocuments();
    const totalCategories = await Category.countDocuments();
    const totalEnrollments = await Enrollment.countDocuments();

    const payments = await Payment.find({ status: "completed" });

    const totalRevenue = payments.reduce(
      (acc, item) => acc + item.amount,
      0
    );

    res.json({
      totalUsers,
      totalInstructors,
      totalCourses,
      totalCategories,
      totalEnrollments,
      totalRevenue,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};