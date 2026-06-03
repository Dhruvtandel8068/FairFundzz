import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  createLeave,
  getLeaves,
  updateLeaveStatus,
  deleteLeave,
} from "../controllers/leaveController.js";

const router = express.Router();

router.route("/")
  .post(protect, createLeave)
  .get(protect, getLeaves);

router.put("/:id/status", protect, updateLeaveStatus);
router.delete("/:id", protect, deleteLeave);

export default router;