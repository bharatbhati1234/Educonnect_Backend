
// roleMiddleware.js file ------------------------------------------------

// Middleware for role based access control.
// Allows route access only if user's role matches allowed roles.
 

const roleMiddleware = (...roles) => {

  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied"
      });

    }

    next();

  };

};

export default roleMiddleware;