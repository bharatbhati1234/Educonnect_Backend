// Payment.js file -------------------------------------------------------------



import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },

  amount: Number,

  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String,

  status: {
    type: String,
    default: "pending"
  }

}, { timestamps: true });

export default mongoose.model("Payment", paymentSchema);