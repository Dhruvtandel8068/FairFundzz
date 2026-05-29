import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  generateNotifications,
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
} from "../controllers/notificationController.js";

const router = express.Router();

router.post("/generate", protect, generateNotifications);
router.get("/", protect, getNotifications);
router.put("/read-all", protect, markAllNotificationsRead);
router.put("/:id/read", protect, markNotificationRead);
router.delete("/:id", protect, deleteNotification);

export default router;