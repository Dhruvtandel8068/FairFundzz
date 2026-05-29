import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  createWorker,
  getWorkers,
  updateWorker,
  deleteWorker,
} from "../controllers/workerController.js";

const router = express.Router();

router
  .route("/")
  .post(protect, createWorker)
  .get(protect, getWorkers);

router
  .route("/:id")
  .put(protect, updateWorker)
  .delete(protect, deleteWorker);

export default router;