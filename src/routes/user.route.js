import express from "express";
import {
  deleteUser,
  getMe,
  getUsers,
  promoteUser,
  updateMe,
  updateRole,
} from "../controllers/user.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middleware.js";

const router = express.Router();

router.get("/me", authMiddleware, getMe);
router.put("/me", authMiddleware, updateMe);
// router get page By Admin
router.get("/", authMiddleware, authorizeRole("ADMIN"), getUsers);

// update role Admin by Admin
router.patch(
  "/:id/promote",
  authMiddleware,
  authorizeRole("ADMIN"),
  promoteUser,
);

// Updat role user Or Admin By Admin
router.patch("/:id/role", authMiddleware, authorizeRole("ADMIN"), updateRole);

// delete user By Admin
router.delete("/:id", authMiddleware, authorizeRole("ADMIN"), deleteUser);

export default router;
