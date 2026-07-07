import Worker from "../models/Worker.js";
import Payroll from "../models/Payroll.js";
import Compliance from "../models/Compliance.js";
import { calculateComplianceScore } from "../utils/complianceCalculator.js";

export const generateCompliance = async (req, res) => {
  try {
    const workers = await Worker.find({
      createdBy: req.user._id,
    });

    const payrolls = await Payroll.find({
      createdBy: req.user._id,
    });

    let violations = [];

    workers.forEach((worker) => {
      if (worker.dailyWage < worker.minimumWage) {
        violations.push({
          worker: worker._id,
          workerName: worker.name,
          type: "Minimum Wage",
          severity: "High",
          message: `${worker.name} is paid below minimum wage`,
        });
      }

      const payroll = payrolls.find(
        (p) => p.worker.toString() === worker._id.toString()
      );

      if (!payroll) {
        violations.push({
          worker: worker._id,
          workerName: worker.name,
          type: "Payroll",
          severity: "Medium",
          message: `${worker.name} has no payroll generated`,
        });
      }
    });

    const score = calculateComplianceScore(
      workers.length,
      violations.length
    );

    const compliantWorkers =
      workers.length - violations.length < 0
        ? 0
        : workers.length - violations.length;

    const month = new Date().toLocaleString("default", {
      month: "long",
    });

    const year = new Date().getFullYear();

    let report = await Compliance.findOne({
      month,
      year,
      generatedBy: req.user._id,
    });

    if (report) {
      report.totalWorkers = workers.length;
      report.compliantWorkers = compliantWorkers;
      report.violations = violations;
      report.complianceScore = score;

      await report.save();
    } else {
      report = await Compliance.create({
        month,
        year,
        totalWorkers: workers.length,
        compliantWorkers,
        violations,
        complianceScore: score,
        generatedBy: req.user._id,
      });
    }

    res.json({
      success: true,
      report,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getCompliance = async (req, res) => {
  try {
    const reports = await Compliance.find({
      generatedBy: req.user._id,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      reports,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};