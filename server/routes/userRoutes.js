import express from "express";
import protect from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

import {
  getUsers,
  createUser,
  updateUserRole,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", protect, allowRoles("admin"), getUsers);
router.post("/", protect, allowRoles("admin"), createUser);
router.put("/:id/role", protect, allowRoles("admin"), updateUserRole);
router.delete("/:id", protect, allowRoles("admin"), deleteUser);

export default router;