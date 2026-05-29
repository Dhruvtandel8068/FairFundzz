import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  registerUser,
  loginUser,
  changePassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/change-password", protect, changePassword);

export default router;