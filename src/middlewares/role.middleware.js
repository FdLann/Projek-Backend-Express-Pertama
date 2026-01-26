import { AppError } from "../utils/app-error.js";

export function authorizeRole(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      throw new AppError("Forbidden: access denied", 403);
    }
    next();
  };
}
