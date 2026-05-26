import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema(
  {
    userType: {
      type: String,
      enum: ['worker', 'contractor'],
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    contact: {
      type: String,
      required: true,
      trim: true,
    },
    jobRole: {
      type: String,
      trim: true,
    },
    wage: {
      type: Number,
    },
    workType: {
      type: String,
      trim: true,
    },
    workers: {
      type: Number,
    },
    document: {
      originalName: String,
      mimeType: String,
      size: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Registration', registrationSchema);
