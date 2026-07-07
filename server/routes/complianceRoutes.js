import express from "express";

import protect from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

import {
  generateCompliance,
  getCompliance,
} from "../controllers/complianceController.js";

const router = express.Router();

router.post(
  "/generate",
  protect,
  allowRoles("admin", "manager"),
  generateCompliance
);

router.get(
  "/",
  protect,
  allowRoles("admin", "manager"),
  getCompliance
);

export default router;