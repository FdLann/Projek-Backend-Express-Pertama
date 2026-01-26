import { AppError } from "../utils/app-error.js";

export default function errorMiddleware(err, req, res, next) {
  let error = { ...err };
  error.message = err.message;

  error.statusCode = err.statusCode || 500;
  error.status = err.status || "error";

  if (err.code === "P2002") {
    error = new AppError("Email Sudah Digunakan", 400);
  }

  if (err.name === "JsonWebTokenError") {
    error = new AppError("Invalid Token", 401);
  }

  if (err.name === "TokenExpiredError") {
    error = new AppError("Token Expired", 401);
  }

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
}
