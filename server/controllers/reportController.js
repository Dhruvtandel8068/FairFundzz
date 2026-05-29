import Worker from "../models/Worker.js";
import Attendance from "../models/Attendance.js";
import Payment from "../models/Payment.js";

export const getReports = async (req, res) => {
  const workers = await Worker.find({
    createdBy: req.user._id,
  });

  const attendance = await Attendance.find({
    createdBy: req.user._id,
  }).populate("worker", "name role city dailyWage minimumWage");

  const payments = await Payment.find({
    createdBy: req.user._id,
  }).populate("worker", "name role city dailyWage");

  const totalWorkers = workers.length;

  const activeWorkers = workers.filter(
    (worker) => worker.status === "Active"
  ).length;

  const wageViolations = workers.filter(
    (worker) => worker.dailyWage < worker.minimumWage
  ).length;

  const totalAttendance = attendance.length;

  const presentDays = attendance.filter(
    (item) => item.status === "Present"
  ).length;

  const halfDays = attendance.filter(
    (item) => item.status === "Half Day"
  ).length;

  const absentDays = attendance.filter(
    (item) => item.status === "Absent"
  ).length;

  const totalPayroll = payments.reduce(
    (total, payment) => total + payment.totalAmount,
    0
  );

  const paidAmount = payments
    .filter((payment) => payment.status === "Paid")
    .reduce((total, payment) => total + payment.totalAmount, 0);

  const pendingAmount = payments
    .filter((payment) => payment.status === "Pending")
    .reduce((total, payment) => total + payment.totalAmount, 0);

  const complianceScore =
    totalWorkers === 0
      ? 100
      : Math.round(((totalWorkers - wageViolations) / totalWorkers) * 100);

  const workersByCity = workers.reduce((acc, worker) => {
    acc[worker.city] = (acc[worker.city] || 0) + 1;
    return acc;
  }, {});

  const payrollByMonth = payments.reduce((acc, payment) => {
    acc[payment.month] = (acc[payment.month] || 0) + payment.totalAmount;
    return acc;
  }, {});

  const violationWorkers = workers
    .filter((worker) => worker.dailyWage < worker.minimumWage)
    .map((worker) => ({
      _id: worker._id,
      name: worker.name,
      role: worker.role,
      city: worker.city,
      dailyWage: worker.dailyWage,
      minimumWage: worker.minimumWage,
      difference: worker.minimumWage - worker.dailyWage,
    }));

  res.json({
    success: true,
    reports: {
      totalWorkers,
      activeWorkers,
      wageViolations,
      complianceScore,
      totalAttendance,
      presentDays,
      halfDays,
      absentDays,
      totalPayroll,
      paidAmount,
      pendingAmount,
      totalPayments: payments.length,
      workersByCity,
      payrollByMonth,
      violationWorkers,
    },
  });
};