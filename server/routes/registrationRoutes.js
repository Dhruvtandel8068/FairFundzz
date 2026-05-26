import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import { randomUUID } from 'node:crypto';
import Registration from '../models/Registration.js';

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const memoryRegistrations = [];

const parseNumber = (value) => {
  if (value === undefined || value === '') {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const buildRegistration = (body, file) => ({
  userType: body.userType,
  name: body.name,
  email: body.email,
  contact: body.contact,
  jobRole: body.jobRole,
  wage: parseNumber(body.wage),
  workType: body.workType,
  workers: parseNumber(body.workers),
  document: file
    ? {
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
      }
    : undefined,
});

router.get('/', async (_req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json(memoryRegistrations);
    }

    const registrations = await Registration.find().sort({ createdAt: -1 }).limit(50);
    return res.json(registrations);
  } catch (error) {
    return next(error);
  }
});

router.post('/', upload.single('document'), async (req, res, next) => {
  try {
    const registration = buildRegistration(req.body, req.file);

    if (!registration.userType || !registration.name || !registration.email || !registration.contact) {
      return res.status(400).json({ message: 'Name, email, contact, and user type are required.' });
    }

    if (mongoose.connection.readyState !== 1) {
      const savedRegistration = {
        _id: randomUUID(),
        ...registration,
        createdAt: new Date().toISOString(),
      };
      memoryRegistrations.unshift(savedRegistration);
      return res.status(201).json(savedRegistration);
    }

    const savedRegistration = await Registration.create(registration);
    return res.status(201).json(savedRegistration);
  } catch (error) {
    return next(error);
  }
});

export default router;
