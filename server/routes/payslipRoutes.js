import express from "express";
import protect from "../middleware/authMiddleware.js";
import { downloadPayslip } from "../controllers/payslipController.js";

const router = express.Router();

router.get("/:id/download", protect, downloadPayslip);

export default router;