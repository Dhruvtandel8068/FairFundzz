import Worker from "../models/Worker.js";

// CREATE WORKER
export const createWorker = async (
  req,
  res
) => {
  try {
    const worker = await Worker.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(201).json(worker);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET WORKERS
export const getWorkers = async (
  req,
  res
) => {
  try {
    const workers = await Worker.find({
      createdBy: req.user.id,
    });

    res.json(workers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE WORKER
export const deleteWorker = async (
  req,
  res
) => {
  try {
    await Worker.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Worker deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};