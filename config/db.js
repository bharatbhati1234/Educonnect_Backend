// mongodb connection setup file 

 // Establishes connection with MongoDB using mongoose.
 

import mongoose from "mongoose";

const connectDB = async () => {
  try {

    await mongoose.connect(process.env.MONGO_DB_LINK);

    console.log("MongoDB Connected Successfully");

  } catch (error) {

    console.error("MongoDB connection failed:", error.message);

    process.exit(1);

  }
};

export default connectDB;