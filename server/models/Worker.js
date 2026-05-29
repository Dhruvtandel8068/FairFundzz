import mongoose from "mongoose";

const workerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    dailyWage: {
      type: Number,
      required: true,
      min: 0,
    },

    minimumWage: {
      type: Number,
      required: true,
      default: 450,
      min: 0,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
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

const Worker = mongoose.model("Worker", workerSchema);

export default Worker;