import Leave from "../models/Leave.js";
import Worker from "../models/Worker.js";

export const createLeave = async (req, res) => {
  const { worker, leaveType, fromDate, toDate, reason } = req.body;

  if (!worker || !leaveType || !fromDate || !toDate || !reason) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const existingWorker = await Worker.findOne({
    _id: worker,
    createdBy: req.user._id,
  });

  if (!existingWorker) {
    res.status(404);
    throw new Error("Worker not found");
  }

  const leave = await Leave.create({
    worker,
    leaveType,
    fromDate,
    toDate,
    reason,
    createdBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Leave request created successfully",
    leave,
  });
};

export const getLeaves = async (req, res) => {
  const leaves = await Leave.find({
    createdBy: req.user._id,
  })
    .populate("worker", "name role phone city")
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    count: leaves.length,
    leaves,
  });
};

export const updateLeaveStatus = async (req, res) => {
  const { status } = req.body;

  if (!["Approved", "Rejected", "Pending"].includes(status)) {
    res.status(400);
    throw new Error("Invalid leave status");
  }

  const leave = await Leave.findOne({
    _id: req.params.id,
    createdBy: req.user._id,
  });

  if (!leave) {
    res.status(404);
    throw new Error("Leave request not found");
  }

  leave.status = status;
  await leave.save();

  res.json({
    success: true,
    message: `Leave ${status.toLowerCase()} successfully`,
    leave,
  });
};

export const deleteLeave = async (req, res) => {
  const leave = await Leave.findOne({
    _id: req.params.id,
    createdBy: req.user._id,
  });

  if (!leave) {
    res.status(404);
    throw new Error("Leave request not found");
  }

  await leave.deleteOne();

  res.json({
    success: true,
    message: "Leave request deleted successfully",
  });
};