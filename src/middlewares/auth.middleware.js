import { verifyToken } from "../utils/jwt.js";
import { AppError } from "../utils/app-error.js";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Authorization header missing", 401);
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new AppError("Token Missing", 401);
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    throw new AppError("Invalid or expired token", 401);
  }
}
