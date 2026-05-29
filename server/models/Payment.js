import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
      required: true,
    },

    month: {
      type: String,
      required: true,
    },

    presentDays: {
      type: Number,
      default: 0,
    },

    halfDays: {
      type: Number,
      default: 0,
    },

    absentDays: {
      type: Number,
      default: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;