import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import {
  IndianRupee,
  Calculator,
  CheckCircle,
  Clock,
  Trash2,
  Loader2,
} from "lucide-react";

type Worker = {
  _id: string;
  name: string;
  role: string;
  dailyWage: number;
};

type PayrollItem = {
  _id: string;
  worker: Worker;
  month: string;
  presentDays: number;
  halfDays: number;
  absentDays: number;
  overtimeHours: number;
  bonus: number;
  deduction: number;
  dailyWage: number;
  grossSalary: number;
  netSalary: number;
  status: "Pending" | "Approved" | "Paid";
};

const Payroll = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [payrolls, setPayrolls] = useState<PayrollItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    workerId: "",
    month: "",
    overtimeHours: "",
    bonus: "",
    deduction: "",
  });

  const fetchWorkers = async () => {
    const res = await API.get("/workers");
    setWorkers(res.data.workers || []);
  };

  const fetchPayrolls = async () => {
    try {
      setLoading(true);
      const res = await API.get("/payrolls");
      setPayrolls(res.data.payrolls || []);
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to fetch payrolls");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
    fetchPayrolls();
  }, []);

  const generatePayroll = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.workerId || !form.month) {
      alert("Please select worker and month");
      return;
    }

    try {
      await API.post("/payrolls/generate", {
        workerId: form.workerId,
        month: form.month,
        overtimeHours: Number(form.overtimeHours) || 0,
        bonus: Number(form.bonus) || 0,
        deduction: Number(form.deduction) || 0,
      });

      setForm({
        workerId: "",
        month: "",
        overtimeHours: "",
        bonus: "",
        deduction: "",
      });

      fetchPayrolls();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to generate payroll");
    }
  };

  const approvePayroll = async (id: string) => {
    try {
      await API.put(`/payrolls/${id}/approve`);
      fetchPayrolls();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to approve payroll");
    }
  };

  const markPaid = async (id: string) => {
    try {
      await API.put(`/payrolls/${id}/paid`);
      fetchPayrolls();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to mark paid");
    }
  };

  const deletePayroll = async (id: string) => {
    if (!confirm("Delete this payroll?")) return;

    try {
      await API.delete(`/payrolls/${id}`);
      fetchPayrolls();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to delete payroll");
    }
  };

  const totalPayroll = payrolls.reduce(
    (sum, item) => sum + item.netSalary,
    0
  );

  const pendingCount = payrolls.filter(
    (item) => item.status === "Pending"
  ).length;

  const paidCount = payrolls.filter(
    (item) => item.status === "Paid"
  ).length;

  return (
    <div className="flex bg-[#f4f7fe] min-h-screen">
      <Navbar />

      <div className="ml-[220px] w-[calc(100%-220px)] p-6">
        <div className="bg-white rounded-3xl shadow-sm p-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Payroll Management
            </h1>
            <p className="text-gray-500 mt-2">
              Generate monthly salary from attendance, overtime, bonus and deduction.
            </p>
          </div>

          <div className="bg-blue-100 text-blue-700 px-5 py-3 rounded-2xl font-semibold flex items-center gap-2">
            <IndianRupee size={20} />
            Payrolls: {payrolls.length}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-purple-600 text-white rounded-3xl p-6 shadow">
            <IndianRupee size={36} />
            <p className="mt-4 text-lg">Total Payroll</p>
            <h2 className="text-4xl font-bold">₹{totalPayroll}</h2>
          </div>

          <div className="bg-yellow-500 text-white rounded-3xl p-6 shadow">
            <Clock size={36} />
            <p className="mt-4 text-lg">Pending</p>
            <h2 className="text-4xl font-bold">{pendingCount}</h2>
          </div>

          <div className="bg-green-600 text-white rounded-3xl p-6 shadow">
            <CheckCircle size={36} />
            <p className="mt-4 text-lg">Paid</p>
            <h2 className="text-4xl font-bold">{paidCount}</h2>
          </div>
        </div>

        <form
          onSubmit={generatePayroll}
          className="bg-white rounded-3xl shadow-sm p-6 mt-8"
        >
          <h2 className="text-2xl font-bold mb-5">
            Generate Payroll
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            <select
              value={form.workerId}
              onChange={(e) =>
                setForm({ ...form, workerId: e.target.value })
              }
              className="border rounded-xl px-4 py-3"
            >
              <option value="">Select Worker</option>
              {workers.map((worker) => (
                <option key={worker._id} value={worker._id}>
                  {worker.name} - ₹{worker.dailyWage}/day
                </option>
              ))}
            </select>

            <input
              type="month"
              value={form.month}
              onChange={(e) =>
                setForm({ ...form, month: e.target.value })
              }
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="number"
              placeholder="Overtime Hours"
              value={form.overtimeHours}
              onChange={(e) =>
                setForm({ ...form, overtimeHours: e.target.value })
              }
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="number"
              placeholder="Bonus"
              value={form.bonus}
              onChange={(e) =>
                setForm({ ...form, bonus: e.target.value })
              }
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="number"
              placeholder="Deduction"
              value={form.deduction}
              onChange={(e) =>
                setForm({ ...form, deduction: e.target.value })
              }
              className="border rounded-xl px-4 py-3"
            />
          </div>

          <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
            <Calculator size={20} />
            Generate Payroll
          </button>
        </form>

        <div className="bg-white rounded-3xl shadow-sm p-6 mt-8">
          <h2 className="text-2xl font-bold mb-6">
            Payroll Records
          </h2>

          {loading ? (
            <div className="flex justify-center p-10">
              <Loader2 className="animate-spin text-blue-600" size={36} />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="p-4 text-left">Worker</th>
                    <th className="p-4 text-left">Month</th>
                    <th className="p-4 text-left">Present</th>
                    <th className="p-4 text-left">Half</th>
                    <th className="p-4 text-left">Absent</th>
                    <th className="p-4 text-left">Bonus</th>
                    <th className="p-4 text-left">Deduction</th>
                    <th className="p-4 text-left">Net Salary</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-left">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {payrolls.map((item) => (
                    <tr key={item._id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <p className="font-semibold">
                          {item.worker?.name || "Worker deleted"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.worker?.role || "-"}
                        </p>
                      </td>

                      <td className="p-4">{item.month}</td>
                      <td className="p-4">{item.presentDays}</td>
                      <td className="p-4">{item.halfDays}</td>
                      <td className="p-4">{item.absentDays}</td>
                      <td className="p-4">₹{item.bonus}</td>
                      <td className="p-4">₹{item.deduction}</td>

                      <td className="p-4 font-bold">
                        ₹{item.netSalary}
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm text-white ${
                            item.status === "Paid"
                              ? "bg-green-500"
                              : item.status === "Approved"
                              ? "bg-blue-500"
                              : "bg-yellow-500"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="p-4 flex gap-2">
                        {item.status === "Pending" && (
                          <button
                            onClick={() => approvePayroll(item._id)}
                            className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg"
                          >
                            Approve
                          </button>
                        )}

                        {item.status === "Approved" && (
                          <button
                            onClick={() => markPaid(item._id)}
                            className="bg-green-100 text-green-700 px-3 py-2 rounded-lg"
                          >
                            Paid
                          </button>
                        )}

                        <button
                          onClick={() => deletePayroll(item._id)}
                          className="bg-red-100 text-red-600 p-2 rounded-lg"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {payrolls.length === 0 && (
                    <tr>
                      <td
                        colSpan={10}
                        className="p-6 text-center text-gray-500"
                      >
                        No payroll records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payroll;