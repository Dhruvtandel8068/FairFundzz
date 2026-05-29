import Attendance from "../models/Attendance.js";
import Worker from "../models/Worker.js";

export const createAttendance = async (req, res) => {
  const { worker, date, status, hoursWorked, notes } = req.body;

  if (!worker || !date || !status) {
    res.status(400);
    throw new Error("Worker, date and status are required");
  }

  const existingWorker = await Worker.findOne({
    _id: worker,
    createdBy: req.user._id,
  });

  if (!existingWorker) {
    res.status(404);
    throw new Error("Worker not found");
  }

  const attendance = await Attendance.create({
    worker,
    date,
    status,
    hoursWorked: status === "Absent" ? 0 : Number(hoursWorked) || 8,
    notes,
    createdBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Attendance added successfully",
    attendance,
  });
};

export const getAttendance = async (req, res) => {
  const attendance = await Attendance.find({
    createdBy: req.user._id,
  })
    .populate("worker", "name role phone city dailyWage minimumWage")
    .sort({ date: -1 });

  res.json({
    success: true,
    count: attendance.length,
    attendance,
  });
};

export const deleteAttendance = async (req, res) => {
  const attendance = await Attendance.findOne({
    _id: req.params.id,
    createdBy: req.user._id,
  });

  if (!attendance) {
    res.status(404);
    throw new Error("Attendance record not found");
  }

  await attendance.deleteOne();

  res.json({
    success: true,
    message: "Attendance deleted successfully",
  });
};