import Worker from "../models/Worker.js";

export const createWorker = async (req, res) => {
  const { name, role, phone, city, dailyWage, minimumWage } = req.body;

  if (!name || !role || !phone || !city || !dailyWage) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }

  const worker = await Worker.create({
    name,
    role,
    phone,
    city,
    dailyWage,
    minimumWage: minimumWage || 450,
    createdBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Worker created successfully",
    worker,
  });
};

export const getWorkers = async (req, res) => {
  const workers = await Worker.find({
    createdBy: req.user._id,
  }).sort({ createdAt: -1 });

  res.json({
    success: true,
    count: workers.length,
    workers,
  });
};

export const updateWorker = async (req, res) => {
  const worker = await Worker.findOne({
    _id: req.params.id,
    createdBy: req.user._id,
  });

  if (!worker) {
    res.status(404);
    throw new Error("Worker not found");
  }

  const updatedWorker = await Worker.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.json({
    success: true,
    message: "Worker updated successfully",
    worker: updatedWorker,
  });
};

export const deleteWorker = async (req, res) => {
  const worker = await Worker.findOne({
    _id: req.params.id,
    createdBy: req.user._id,
  });

  if (!worker) {
    res.status(404);
    throw new Error("Worker not found");
  }

  await worker.deleteOne();

  res.json({
    success: true,
    message: "Worker deleted successfully",
  });
};