import express from "express";
import protect from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

import {
  generatePayroll,
  getPayrolls,
  approvePayroll,
  markPayrollPaid,
  deletePayroll,
} from "../controllers/payrollController.js";

const router = express.Router();

router.post(
  "/generate",
  protect,
  allowRoles("admin", "manager"),
  generatePayroll
);

router.get(
  "/",
  protect,
  allowRoles("admin", "manager"),
  getPayrolls
);

router.put(
  "/:id/approve",
  protect,
  allowRoles("admin"),
  approvePayroll
);

router.put(
  "/:id/paid",
  protect,
  allowRoles("admin"),
  markPayrollPaid
);

router.delete(
  "/:id",
  protect,
  allowRoles("admin"),
  deletePayroll
);

export default router;