// roleMiddleware.js file -------------------------------------------------------

// Global error handler middleware.
// Sends standardized error response to the client.
 

const errorMiddleware = (err, req, res, next) => {

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Server Error"
  });

};

export default errorMiddleware;