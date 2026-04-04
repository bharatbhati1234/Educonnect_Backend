// paymentController.js file -----------------------------------------------------------


import Razorpay from "razorpay";
import Payment from "../models/Payment.js";
import Course from "../models/Course.js";
import crypto from "crypto";
import Enrollment from "../models/Enrollment.js";

// ✅ CREATE ORDER
export const createOrder = async (req, res) => {
    try {

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const { courseId } = req.body;

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const options = {
            amount: course.price * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
            notes: {
                courseId,
                userId: req.user._id.toString()
            }
        };

        const order = await razorpay.orders.create(options);

        const payment = await Payment.create({
            user: req.user._id,
            course: courseId,
            amount: course.price,
            razorpay_order_id: order.id
        });

        res.json({
            success: true,
            order,
            payment
        });

    } catch (error) {
        console.log("ERROR:", error);
        res.status(500).json({ message: error.message });
    }
};


// ✅ VERIFY PAYMENT
export const verifyPayment = async (req, res) => {
    try {

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            courseId
        } = req.body;

         console.log("USER:", req.user);
        console.log("COURSE ID:", courseId);

        // 🔐 Signature Verify
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed"
            });
        }

        // 💾 Update Payment
        const payment = await Payment.findOneAndUpdate(
            { razorpay_order_id },
            {
                razorpay_payment_id,
                razorpay_signature,
                status: "completed"
            },
            { new: true }
        );

        if (!payment) {
            return res.status(404).json({
                message: "Payment not found"
            });
        }

        // 🚫 Prevent duplicate enrollment
        const alreadyEnrolled = await Enrollment.findOne({
            user: req.user._id,
            course: courseId
        });

        if (alreadyEnrolled) {
            return res.json({
                success: true,
                message: "Already enrolled"
            });
        }

        // 🎓 Enroll User
        await Enrollment.create({
            user: req.user._id,
            course: courseId
        });

        res.json({
            success: true,
            message: "Payment successful & enrolled",
            payment
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};