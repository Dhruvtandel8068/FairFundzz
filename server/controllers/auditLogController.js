import AuditLog from "../models/AuditLog.js";

export const getAuditLogs = async (req, res) => {
  const logs = await AuditLog.find()
    .populate("performedBy", "name email role")
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    count: logs.length,
    logs,
  });
};

export const deleteAuditLog = async (req, res) => {
  const log = await AuditLog.findById(req.params.id);

  if (!log) {
    res.status(404);
    throw new Error("Audit log not found");
  }

  await log.deleteOne();

  res.json({
    success: true,
    message: "Audit log deleted successfully",
  });
};

export const clearAuditLogs = async (req, res) => {
  await AuditLog.deleteMany();

  res.json({
    success: true,
    message: "All audit logs cleared successfully",
  });
};