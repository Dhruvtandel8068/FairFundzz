import AuditLog from "../models/AuditLog.js";

const createAuditLog = async ({
  req,
  action,
  module,
  description,
}) => {
  try {
    if (!req.user) return;

    await AuditLog.create({
      action,
      module,
      description,
      performedBy: req.user._id,
      role: req.user.role,
      ipAddress: req.ip || "",
    });
  } catch (error) {
    console.log("Audit Log Error:", error.message);
  }
};

export default createAuditLog;