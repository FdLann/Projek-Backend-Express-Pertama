import express from "express";
import {
  deleteUser,
  getMe,
  updateMe,
} from "../controllers/user.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middleware.js";

const router = express.Router();

router.get("/me", authMiddleware, getMe);
router.put("/me", authMiddleware, updateMe);

// delete user By Admin
router.delete("/:id", authMiddleware, authorizeRole("ADMIN"), deleteUser);

export default router;
