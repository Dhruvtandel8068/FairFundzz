import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  createAttendance,
  getAttendance,
  deleteAttendance,
} from "../controllers/attendanceController.js";

const router = express.Router();

router
  .route("/")
  .post(protect, createAttendance)
  .get(protect, getAttendance);

router.route("/:id").delete(protect, deleteAttendance);

export default router;