import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import {
  AlertTriangle,
  BarChart3,
  CheckCircle,
  Clock,
  IndianRupee,
  Users,
} from "lucide-react";

const Reports = () => {
  const [reports, setReports] = useState<any>(null);

  const fetchReports = async () => {
    try {
      const res = await API.get("/reports");
      setReports(res.data.reports);
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to fetch reports");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (!reports) {
    return (
      <div className="flex bg-[#f4f7fe] min-h-screen">
        <Navbar />
        <div className="ml-[220px] p-6 text-xl">Loading reports...</div>
      </div>
    );
  }

  return (
    <div className="flex bg-[#f4f7fe] min-h-screen">
      <Navbar />

      <div className="ml-[220px] w-[calc(100%-220px)] p-6">
        <div className="bg-white rounded-3xl shadow-sm p-6">
          <h1 className="text-4xl font-bold text-gray-800">
            Reports & Analytics
          </h1>
          <p className="text-gray-500 mt-2">
            Business insights from workers, attendance, payments and compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-blue-600 text-white rounded-3xl p-6 shadow">
            <Users size={36} />
            <p className="mt-4 text-lg">Total Workers</p>
            <h2 className="text-4xl font-bold">{reports.totalWorkers}</h2>
          </div>

          <div className="bg-green-600 text-white rounded-3xl p-6 shadow">
            <CheckCircle size={36} />
            <p className="mt-4 text-lg">Compliance Score</p>
            <h2 className="text-4xl font-bold">
              {reports.complianceScore}%
            </h2>
          </div>

          <div className="bg-purple-600 text-white rounded-3xl p-6 shadow">
            <IndianRupee size={36} />
            <p className="mt-4 text-lg">Total Payroll</p>
            <h2 className="text-4xl font-bold">
              ₹{reports.totalPayroll}
            </h2>
          </div>

          <div className="bg-red-600 text-white rounded-3xl p-6 shadow">
            <AlertTriangle size={36} />
            <p className="mt-4 text-lg">Wage Violations</p>
            <h2 className="text-4xl font-bold">
              {reports.wageViolations}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-3xl shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
              <BarChart3 size={24} />
              Attendance Summary
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between border rounded-2xl p-4">
                <span>Present Days</span>
                <b>{reports.presentDays}</b>
              </div>

              <div className="flex justify-between border rounded-2xl p-4">
                <span>Half Days</span>
                <b>{reports.halfDays}</b>
              </div>

              <div className="flex justify-between border rounded-2xl p-4">
                <span>Absent Days</span>
                <b>{reports.absentDays}</b>
              </div>

              <div className="flex justify-between border rounded-2xl p-4">
                <span>Total Attendance Records</span>
                <b>{reports.totalAttendance}</b>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
              <Clock size={24} />
              Payment Summary
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between border rounded-2xl p-4">
                <span>Paid Amount</span>
                <b className="text-green-600">₹{reports.paidAmount}</b>
              </div>

              <div className="flex justify-between border rounded-2xl p-4">
                <span>Pending Amount</span>
                <b className="text-red-600">₹{reports.pendingAmount}</b>
              </div>

              <div className="flex justify-between border rounded-2xl p-4">
                <span>Total Payments</span>
                <b>{reports.totalPayments}</b>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6 mt-8">
          <h2 className="text-2xl font-bold mb-5">
            Wage Compliance Violations
          </h2>

          {reports.violationWorkers.length === 0 ? (
            <p className="text-gray-500">
              No wage violations found. All workers are compliant.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-red-600 text-white">
                  <tr>
                    <th className="p-4 text-left">Worker</th>
                    <th className="p-4 text-left">Role</th>
                    <th className="p-4 text-left">City</th>
                    <th className="p-4 text-left">Daily Wage</th>
                    <th className="p-4 text-left">Minimum Wage</th>
                    <th className="p-4 text-left">Difference</th>
                  </tr>
                </thead>

                <tbody>
                  {reports.violationWorkers.map((worker: any) => (
                    <tr key={worker._id} className="border-b">
                      <td className="p-4 font-semibold">{worker.name}</td>
                      <td className="p-4">{worker.role}</td>
                      <td className="p-4">{worker.city}</td>
                      <td className="p-4">₹{worker.dailyWage}</td>
                      <td className="p-4">₹{worker.minimumWage}</td>
                      <td className="p-4 text-red-600 font-bold">
                        ₹{worker.difference}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;