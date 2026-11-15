const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorMiddleware;

// This middleware function is used to handle errors in the application.
//  It logs the error stack trace to the console and sends a JSON response with the error message and status code. 
// If the error does not have a specific status code, it defaults to 500 (Internal Server Error).