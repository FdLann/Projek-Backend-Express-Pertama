export default function errorMiddleware(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  if (err.code === "P2002") {
    return res.status(400).json({
      status: "fail",
      message: "Email Sudah Digunakan",
    });
  }

  res.status(statusCode).json({
    status: err.status || "error",
    message: err.message || "Internal Server Error",
  });
}
