import Worker from "../models/Worker.js";
import Attendance from "../models/Attendance.js";

export const getDashboardStats = async (req, res) => {
  const workers = await Worker.find({
    createdBy: req.user._id,
  });

  const attendance = await Attendance.find({
    createdBy: req.user._id,
  }).populate("worker", "dailyWage minimumWage");

  const totalWorkers = workers.length;

  const wageRisk = workers.filter(
    (worker) => worker.dailyWage < worker.minimumWage
  ).length;

  const totalAttendance = attendance.length;

  const totalPayments = attendance.reduce((total, item) => {
    if (!item.worker) return total;

    const dailyWage = item.worker.dailyWage || 0;

    if (item.status === "Absent") return total;
    if (item.status === "Half Day") return total + dailyWage / 2;

    return total + dailyWage;
  }, 0);

  const recentWorkers = workers
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5);

  res.json({
    success: true,
    stats: {
      totalWorkers,
      totalAttendance,
      wageRisk,
      totalPayments,
      recentWorkers,
    },
  });
};