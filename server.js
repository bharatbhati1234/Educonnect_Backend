
// server.js file --------------------------------------------------------

/**
 * main file of EduConnect backend server.
 * Initializes Express, connects database and loads all API routes.
 */

// npm init -y
// npm i express
// npm i nodemon
// npm install --save-dev @babel/core @babel/cli @babel/preset-env
// npm install mongoose
// npm install dotenv
// npm i express-validator
// npm install multer
// npm install bcrypt
// npm install jsonwebtoken
// npm install nodemailer


import express from "express";
import cors from "cors";    /// backend ko frontend se connect kerne k liye cors 


import dotenv from "dotenv";
dotenv.config();


import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";   // register/login route import kiya hai 
import categoryRoute from "./routes/categoryRoute.js" // category ka route import kiya hai 
import instructorRoute from "./routes/instructorRoute.js" // instructor ka route import kiya hai 
import path from "path";
import courseRoute from "./routes/courseRoute.js"  // course ka route import kiya hai 
import lessonRoute from "./routes/lessonRoute.js" // lesson ka route import kiya hai 
import sectionRoute from "./routes/sectionRoute.js" // section ka route import kiya hai 
import enrollmentRoutes from "./routes/enrollmentRoute.js";   // enrollment ka route import kiya hai 
import userRoute from "./routes/userRoute.js" // user ka route import kiya hai 
import paymentRoute from "./routes/paymentRoute.js" // payments ka route import kiya hai 
import adminRoutes from "./routes/adminRoutes.js";




const app = express();

// serve uploaded images
app.use("/uploads", express.static("uploads"));

app.use(cors());   


// middleware
app.use(express.json());   



// connect database
connectDB();

const PORT = process.env.PORT || 5000;

// test route
app.get("/", (req, res) => {
  res.send("Express server is connected");
});


// API routes
app.use("/api/auth",authRoute);
app.use("/api/",categoryRoute);
app.use("/api/",instructorRoute);
app.use("/api/",courseRoute);
app.use("/api/",lessonRoute);
app.use("/api/",sectionRoute);
app.use("/api/enrollments",enrollmentRoutes);
app.use("/api/",userRoute);
app.use("/api/payment",paymentRoute);
app.use("/api/admin", adminRoutes);



// server calling 

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




