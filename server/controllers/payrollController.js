import Payroll from "../models/Payroll.js";
import Worker from "../models/Worker.js";
import Attendance from "../models/Attendance.js";

export const generatePayroll = async (req, res) => {
  const {
    workerId,
    month,
    overtimeHours = 0,
    bonus = 0,
    deduction = 0,
  } = req.body;

  if (!workerId || !month) {
    return res.status(400).json({
      success: false,
      message: "Worker and month are required",
    });
  }

  const worker = await Worker.findOne({
    _id: workerId,
    createdBy: req.user._id,
  });

  if (!worker) {
    return res.status(404).json({
      success: false,
      message: "Worker not found",
    });
  }

  const startDate = new Date(`${month}-01`);
  const endDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth() + 1,
    1
  );

  const attendance = await Attendance.find({
    worker: workerId,
    createdBy: req.user._id,
    date: {
      $gte: startDate,
      $lt: endDate,
    },
  });

  const presentDays = attendance.filter(
    (item) => item.status === "Present"
  ).length;

  const halfDays = attendance.filter(
    (item) => item.status === "Half Day"
  ).length;

  const absentDays = attendance.filter(
    (item) => item.status === "Absent"
  ).length;

  const dailyWage = Number(worker.dailyWage);
  const overtimeRate = dailyWage / 8;

  const attendanceSalary =
    presentDays * dailyWage + halfDays * (dailyWage / 2);

  const overtimeAmount = Number(overtimeHours) * overtimeRate;

  const grossSalary =
    attendanceSalary + overtimeAmount + Number(bonus);

  const netSalary = grossSalary - Number(deduction);

  const existingPayroll = await Payroll.findOne({
    worker: workerId,
    month,
    createdBy: req.user._id,
  });

  if (existingPayroll) {
    existingPayroll.presentDays = presentDays;
    existingPayroll.halfDays = halfDays;
    existingPayroll.absentDays = absentDays;
    existingPayroll.overtimeHours = Number(overtimeHours);
    existingPayroll.bonus = Number(bonus);
    existingPayroll.deduction = Number(deduction);
    existingPayroll.dailyWage = dailyWage;
    existingPayroll.grossSalary = grossSalary;
    existingPayroll.netSalary = netSalary;

    await existingPayroll.save();

    return res.json({
      success: true,
      message: "Payroll recalculated successfully",
      payroll: existingPayroll,
    });
  }

  const payroll = await Payroll.create({
    worker: workerId,
    month,
    presentDays,
    halfDays,
    absentDays,
    overtimeHours: Number(overtimeHours),
    bonus: Number(bonus),
    deduction: Number(deduction),
    dailyWage,
    grossSalary,
    netSalary,
    createdBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Payroll generated successfully",
    payroll,
  });
};

export const getPayrolls = async (req, res) => {
  const payrolls = await Payroll.find({
    createdBy: req.user._id,
  })
    .populate("worker", "name role phone city dailyWage minimumWage")
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    count: payrolls.length,
    payrolls,
  });
};

export const approvePayroll = async (req, res) => {
  const payroll = await Payroll.findOne({
    _id: req.params.id,
    createdBy: req.user._id,
  });

  if (!payroll) {
    return res.status(404).json({
      success: false,
      message: "Payroll not found",
    });
  }

  payroll.status = "Approved";
  await payroll.save();

  res.json({
    success: true,
    message: "Payroll approved successfully",
    payroll,
  });
};

export const markPayrollPaid = async (req, res) => {
  const payroll = await Payroll.findOne({
    _id: req.params.id,
    createdBy: req.user._id,
  });

  if (!payroll) {
    return res.status(404).json({
      success: false,
      message: "Payroll not found",
    });
  }

  payroll.status = "Paid";
  await payroll.save();

  res.json({
    success: true,
    message: "Payroll marked as paid",
    payroll,
  });
};

export const deletePayroll = async (req, res) => {
  const payroll = await Payroll.findOne({
    _id: req.params.id,
    createdBy: req.user._id,
  });

  if (!payroll) {
    return res.status(404).json({
      success: false,
      message: "Payroll not found",
    });
  }

  await payroll.deleteOne();

  res.json({
    success: true,
    message: "Payroll deleted successfully",
  });
};