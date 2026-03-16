// otpGenerator.js file -------------------------------------------------------

// Generates 6 digit OTP.
// Used for email verification or password reset.
 

const generateOTP = () => {

  return Math.floor(100000 + Math.random() * 900000);

};

export default generateOTP;