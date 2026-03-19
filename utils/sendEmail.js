// sendEmail.js file ----------------------------------------------------------------------


import nodemailer from "nodemailer";   // nodemailer install kerne ka 

const sendEmail = async (toEmail, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bharatbhati4515@gmail.com",      // apna gmail
        pass: "jpxi ggwb yljf aufw"          //  app password (normal password nahi)
      }
    });

    const mailOptions = {
      from: "bharatbhati4515@gmail.com",
      to: toEmail,
      subject: "OTP for Password Reset",
      text: `Your OTP is ${otp}`
    };

    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email error:", error);
  }
};

export default sendEmail;