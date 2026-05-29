import Payment from "../models/Payment.js";
import Attendance from "../models/Attendance.js";
import Worker from "../models/Worker.js";

export const generatePayment = async (req, res) => {
  const { workerId, month } = req.body;

  if (!workerId || !month) {
    res.status(400);
    throw new Error("Worker and month are required");
  }

  const worker = await Worker.findOne({
    _id: workerId,
    createdBy: req.user._id,
  });

  if (!worker) {
    res.status(404);
    throw new Error("Worker not found");
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

  const totalAmount =
    presentDays * worker.dailyWage + halfDays * (worker.dailyWage / 2);

  const existingPayment = await Payment.findOne({
    worker: workerId,
    month,
    createdBy: req.user._id,
  });

  if (existingPayment) {
    existingPayment.presentDays = presentDays;
    existingPayment.halfDays = halfDays;
    existingPayment.absentDays = absentDays;
    existingPayment.totalAmount = totalAmount;

    await existingPayment.save();

    return res.json({
      success: true,
      message: "Payment recalculated successfully",
      payment: existingPayment,
    });
  }

  const payment = await Payment.create({
    worker: workerId,
    month,
    presentDays,
    halfDays,
    absentDays,
    totalAmount,
    createdBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Payment generated successfully",
    payment,
  });
};

export const getPayments = async (req, res) => {
  const payments = await Payment.find({
    createdBy: req.user._id,
  })
    .populate("worker", "name role phone city dailyWage")
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    count: payments.length,
    payments,
  });
};

export const markPaymentPaid = async (req, res) => {
  const payment = await Payment.findOne({
    _id: req.params.id,
    createdBy: req.user._id,
  });

  if (!payment) {
    res.status(404);
    throw new Error("Payment not found");
  }

  payment.status = "Paid";
  await payment.save();

  res.json({
    success: true,
    message: "Payment marked as paid",
    payment,
  });
};

export const deletePayment = async (req, res) => {
  const payment = await Payment.findOne({
    _id: req.params.id,
    createdBy: req.user._id,
  });

  if (!payment) {
    res.status(404);
    throw new Error("Payment not found");
  }

  await payment.deleteOne();

  res.json({
    success: true,
    message: "Payment deleted successfully",
  });
};