import express from "express";
import {
  deleteSoftUser,
  deleteUser,
  getDeletedUsers,
  getMe,
  getUsers,
  promoteUser,
  restoreDataUser,
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

// admin see deleted user
router.get("/deleted", authMiddleware, authorizeRole("ADMIN"), getDeletedUsers);

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

//soft delete admin
router.delete(
  "/soft/:id",
  authMiddleware,
  authorizeRole("ADMIN"),
  deleteSoftUser,
);
router.patch("/:id", authMiddleware, authorizeRole("ADMIN"), restoreDataUser);

export default router;
