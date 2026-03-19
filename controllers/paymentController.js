// paymentController.js file -----------------------------------------------------------


import Razorpay from "razorpay";
import Payment from "../models/Payment.js";
import Course from "../models/Course.js";



export const createOrder = async (req, res) => {
    try {

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const { courseId } = req.body;
        // console.log(process.env.RAZORPAY_KEY_ID);

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const options = {
            amount: course.price * 100, // paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);

        // save in DB
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




import crypto from "crypto";
import Enrollment from "../models/Enrollment.js";

export const verifyPayment = async (req, res) => {
    try {

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            courseId
        } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");


        // if (expectedSignature !== razorpay_signature) {             // ye part commit kiya hai 4 lines 
        //     return res.status(400).json({
        //         message: "Payment verification failed"
        //     });
        // }

        // update payment
        const payment = await Payment.findOneAndUpdate(
            { razorpay_order_id },
            {
                razorpay_payment_id,
                razorpay_signature,
                status: "completed"
            },
            { returnDocument: "after" }
        );

        // enroll user after payment
        await Enrollment.create({
            user: req.user._id,
            course: courseId
        });

        res.json({
            success: true,
            message: "Payment successful",
            payment
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};