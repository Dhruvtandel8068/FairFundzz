import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Present", "Absent", "Half Day"],
      required: true,
      default: "Present",
    },

    hoursWorked: {
      type: Number,
      default: 8,
      min: 0,
    },

    notes: {
      type: String,
      trim: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;