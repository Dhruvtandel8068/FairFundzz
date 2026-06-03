import Worker from "../models/Worker.js";
import createAuditLog from "../utils/createAuditLog.js";

export const createWorker = async (req, res) => {
  const { name, role, phone, city, dailyWage, minimumWage } = req.body;

  if (!name || !role || !phone || !city || !dailyWage) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields",
    });
  }

  const worker = await Worker.create({
    name,
    role,
    phone,
    city,
    dailyWage: Number(dailyWage),
    minimumWage: minimumWage ? Number(minimumWage) : 450,
    createdBy: req.user._id,
  });

  await createAuditLog({
    req,
    action: "CREATE_WORKER",
    module: "workers",
    description: `Created worker ${worker.name}`,
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
    return res.status(404).json({
      success: false,
      message: "Worker not found",
    });
  }

  const updatedWorker = await Worker.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      dailyWage: Number(req.body.dailyWage),
      minimumWage: Number(req.body.minimumWage),
    },
    {
      new: true,
      runValidators: true,
    }
  );

  await createAuditLog({
    req,
    action: "UPDATE_WORKER",
    module: "workers",
    description: `Updated worker ${updatedWorker.name}`,
  });

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
    return res.status(404).json({
      success: false,
      message: "Worker not found",
    });
  }

  const workerName = worker.name;

  await worker.deleteOne();

  await createAuditLog({
    req,
    action: "DELETE_WORKER",
    module: "workers",
    description: `Deleted worker ${workerName}`,
  });

  res.json({
    success: true,
    message: "Worker deleted successfully",
  });
};