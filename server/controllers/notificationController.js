import Notification from "../models/Notification.js";
import Worker from "../models/Worker.js";
import Payment from "../models/Payment.js";
import Attendance from "../models/Attendance.js";

export const generateNotifications = async (req, res) => {
  const userId = req.user._id;

  await Notification.deleteMany({
    createdBy: userId,
    type: {
      $in: ["attendance", "payment", "compliance"],
    },
  });

  const workers = await Worker.find({
    createdBy: userId,
  });

  const payments = await Payment.find({
    createdBy: userId,
    status: "Pending",
  }).populate("worker", "name");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const notifications = [];

  workers.forEach((worker) => {
    if (worker.dailyWage < worker.minimumWage) {
      notifications.push({
        title: "Wage Compliance Alert",
        message: `${worker.name} is paid ₹${worker.dailyWage}, below minimum wage ₹${worker.minimumWage}.`,
        type: "compliance",
        createdBy: userId,
      });
    }
  });

  for (const worker of workers) {
    const attendanceToday = await Attendance.findOne({
      worker: worker._id,
      createdBy: userId,
      date: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    if (!attendanceToday) {
      notifications.push({
        title: "Attendance Missing",
        message: `${worker.name}'s attendance has not been marked today.`,
        type: "attendance",
        createdBy: userId,
      });
    }
  }

  payments.forEach((payment) => {
    notifications.push({
      title: "Payment Pending",
      message: `${payment.worker?.name || "Worker"} has pending payment of ₹${payment.totalAmount} for ${payment.month}.`,
      type: "payment",
      createdBy: userId,
    });
  });

  if (notifications.length > 0) {
    await Notification.insertMany(notifications);
  }

  res.json({
    success: true,
    message: "Notifications generated successfully",
    count: notifications.length,
  });
};

export const getNotifications = async (req, res) => {
  const notifications = await Notification.find({
    createdBy: req.user._id,
  }).sort({ createdAt: -1 });

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  res.json({
    success: true,
    count: notifications.length,
    unreadCount,
    notifications,
  });
};

export const markNotificationRead = async (req, res) => {
  const notification = await Notification.findOne({
    _id: req.params.id,
    createdBy: req.user._id,
  });

  if (!notification) {
    res.status(404);
    throw new Error("Notification not found");
  }

  notification.isRead = true;
  await notification.save();

  res.json({
    success: true,
    message: "Notification marked as read",
    notification,
  });
};

export const markAllNotificationsRead = async (req, res) => {
  await Notification.updateMany(
    { createdBy: req.user._id },
    { isRead: true }
  );

  res.json({
    success: true,
    message: "All notifications marked as read",
  });
};

export const deleteNotification = async (req, res) => {
  const notification = await Notification.findOne({
    _id: req.params.id,
    createdBy: req.user._id,
  });

  if (!notification) {
    res.status(404);
    throw new Error("Notification not found");
  }

  await notification.deleteOne();

  res.json({
    success: true,
    message: "Notification deleted successfully",
  });
};