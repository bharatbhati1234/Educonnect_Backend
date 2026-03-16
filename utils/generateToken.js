
// generateToken.js file ---------------------------------------------------------

// Utility function for generating JWT token.
// Used during login and authentication responses.
 

import jwt from "jsonwebtoken";

const generateToken = (user) => {

  return jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );

};

export default generateToken;