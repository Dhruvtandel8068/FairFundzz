import mongoose from "mongoose";

const violationSchema = new mongoose.Schema(
  {
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
      required: true,
    },

    workerName: String,

    type: {
      type: String,
      enum: [
        "Minimum Wage",
        "Attendance",
        "Payroll",
        "Overtime",
      ],
    },

    message: String,

    severity: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    resolved: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const complianceSchema = new mongoose.Schema(
  {
    month: {
      type: String,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    totalWorkers: {
      type: Number,
      default: 0,
    },

    compliantWorkers: {
      type: Number,
      default: 0,
    },

    violations: [violationSchema],

    complianceScore: {
      type: Number,
      default: 100,
    },

    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Compliance", complianceSchema);