import express from "express";
import protect from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

import {
  getAuditLogs,
  deleteAuditLog,
  clearAuditLogs,
} from "../controllers/auditLogController.js";

const router = express.Router();

router.get("/", protect, allowRoles("admin"), getAuditLogs);
router.delete("/clear", protect, allowRoles("admin"), clearAuditLogs);
router.delete("/:id", protect, allowRoles("admin"), deleteAuditLog);

export default router;