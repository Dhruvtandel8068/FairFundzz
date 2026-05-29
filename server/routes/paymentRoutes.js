import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  generatePayment,
  getPayments,
  markPaymentPaid,
  deletePayment,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/generate", protect, generatePayment);
router.get("/", protect, getPayments);
router.put("/:id/paid", protect, markPaymentPaid);
router.delete("/:id", protect, deletePayment);

export default router;