// =====================================================
// 404 NOT FOUND MIDDLEWARE
// =====================================================

const notFound = (req, res, next) => {

  res.status(404).json({

    success: false,

    message:
      `Route not found: ${req.method} ${req.originalUrl}`

  });

};


// =====================================================
// GLOBAL ERROR HANDLER
// =====================================================

const errorHandler = (
  err,
  req,
  res,
  next
) => {

  console.error(
    "=========================================="
  );

  console.error(
    "SERVER ERROR"
  );

  console.error(
    err
  );

  console.error(
    "=========================================="
  );


  const statusCode =
    res.statusCode >= 400
      ? res.statusCode
      : 500;


  res.status(statusCode).json({

    success: false,

    message:
      err.message ||
      "Internal Server Error",

    ...(process.env.NODE_ENV === "development"
      ? {
          stack: err.stack
        }
      : {})

  });

};


// =====================================================
// EXPORT
// =====================================================

module.exports = {

  notFound,

  errorHandler

};