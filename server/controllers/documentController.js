import path from "path";
import fs from "fs";
import Document from "../models/Document.js";
import Worker from "../models/Worker.js";

export const uploadDocument = async (req, res) => {
  const { worker, documentType } = req.body;

  if (!worker || !documentType) {
    res.status(400);
    throw new Error("Worker and document type are required");
  }

  if (!req.file) {
    res.status(400);
    throw new Error("Please upload a file");
  }

  const existingWorker = await Worker.findOne({
    _id: worker,
    createdBy: req.user._id,
  });

  if (!existingWorker) {
    res.status(404);
    throw new Error("Worker not found");
  }

  const document = await Document.create({
    worker,
    documentType,
    fileName: req.file.originalname,
    filePath: req.file.path,
    fileMimeType: req.file.mimetype,
    uploadedBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Document uploaded successfully",
    document,
  });
};

export const getDocuments = async (req, res) => {
  const documents = await Document.find({
    uploadedBy: req.user._id,
  })
    .populate("worker", "name role phone city")
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    count: documents.length,
    documents,
  });
};

export const downloadDocument = async (req, res) => {
  const document = await Document.findOne({
    _id: req.params.id,
    uploadedBy: req.user._id,
  });

  if (!document) {
    res.status(404);
    throw new Error("Document not found");
  }

  const filePath = path.resolve(document.filePath);

  if (!fs.existsSync(filePath)) {
    res.status(404);
    throw new Error("File not found on server");
  }

  res.download(filePath, document.fileName);
};

export const deleteDocument = async (req, res) => {
  const document = await Document.findOne({
    _id: req.params.id,
    uploadedBy: req.user._id,
  });

  if (!document) {
    res.status(404);
    throw new Error("Document not found");
  }

  if (fs.existsSync(document.filePath)) {
    fs.unlinkSync(document.filePath);
  }

  await document.deleteOne();

  res.json({
    success: true,
    message: "Document deleted successfully",
  });
};