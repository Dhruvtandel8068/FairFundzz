import express from "express";

const router = express.Router();

import {
  createWorker,
  getWorkers,
  deleteWorker,
} from "../controllers/workerController.js";

import protect from "../middleware/authMiddleware.js";

router.post("/", protect, createWorker);

router.get("/", protect, getWorkers);

router.delete("/:id", protect, deleteWorker);

export default router;