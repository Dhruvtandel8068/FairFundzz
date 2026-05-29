import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import {
  CreditCard,
  Clock,
  CheckCircle,
  IndianRupee,
  Trash2,
  Loader2,
  Calculator,
} from "lucide-react";

type Worker = {
  _id: string;
  name: string;
  role: string;
  dailyWage: number;
};

type Payment = {
  _id: string;
  worker: Worker;
  month: string;
  presentDays: number;
  halfDays: number;
  absentDays: number;
  totalAmount: number;
  status: "Pending" | "Paid";
};

const Payments = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    workerId: "",
    month: "",
  });

  const fetchWorkers = async () => {
    const res = await API.get("/workers");
    setWorkers(res.data.workers || []);
  };

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await API.get("/payments");
      setPayments(res.data.payments || []);
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to fetch payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
    fetchPayments();
  }, []);

  const handleGeneratePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.workerId || !form.month) {
      alert("Please select worker and month");
      return;
    }

    try {
      await API.post("/payments/generate", {
        workerId: form.workerId,
        month: form.month,
      });

      setForm({
        workerId: "",
        month: "",
      });

      fetchPayments();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to generate payment");
    }
  };

  const handleMarkPaid = async (id: string) => {
    try {
      await API.put(`/payments/${id}/paid`);
      fetchPayments();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to mark as paid");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Delete this payment record?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/payments/${id}`);
      fetchPayments();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to delete payment");
    }
  };

  const totalPaid = payments
    .filter((payment) => payment.status === "Paid")
    .reduce((total, payment) => total + payment.totalAmount, 0);

  const totalPending = payments
    .filter((payment) => payment.status === "Pending")
    .reduce((total, payment) => total + payment.totalAmount, 0);

  const totalPayroll = payments.reduce(
    (total, payment) => total + payment.totalAmount,
    0
  );

  return (
    <div className="flex bg-[#f4f7fe] min-h-screen">
      <Navbar />

      <div className="ml-[220px] w-[calc(100%-220px)] p-6">
        <div className="bg-white p-6 rounded-3xl shadow flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Payments</h1>
            <p className="text-gray-500 mt-2">
              Generate worker payments automatically from attendance.
            </p>
          </div>

          <CreditCard className="text-blue-600" size={44} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-green-500 text-white p-6 rounded-2xl shadow">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl">Total Paid</h2>
                <p className="text-4xl font-bold mt-3">₹{totalPaid}</p>
              </div>
              <CheckCircle size={45} />
            </div>
          </div>

          <div className="bg-yellow-500 text-white p-6 rounded-2xl shadow">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl">Pending</h2>
                <p className="text-4xl font-bold mt-3">₹{totalPending}</p>
              </div>
              <Clock size={45} />
            </div>
          </div>

          <div className="bg-purple-500 text-white p-6 rounded-2xl shadow">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl">Total Payroll</h2>
                <p className="text-4xl font-bold mt-3">₹{totalPayroll}</p>
              </div>
              <IndianRupee size={45} />
            </div>
          </div>
        </div>

        <form
          onSubmit={handleGeneratePayment}
          className="bg-white rounded-3xl shadow-sm p-6 mt-8"
        >
          <h2 className="text-2xl font-bold mb-5">
            Generate Monthly Payment
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
                  {worker.name} - {worker.role}
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

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
              <Calculator size={20} />
              Generate Payment
            </button>
          </div>
        </form>

        <div className="bg-white mt-8 rounded-2xl shadow overflow-hidden">
          <div className="p-5 border-b">
            <h2 className="text-2xl font-bold">Payment Records</h2>
          </div>

          {loading ? (
            <div className="flex justify-center p-10">
              <Loader2 className="animate-spin text-blue-600" size={36} />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left p-4">Worker</th>
                    <th className="text-left p-4">Month</th>
                    <th className="text-left p-4">Present</th>
                    <th className="text-left p-4">Half Day</th>
                    <th className="text-left p-4">Absent</th>
                    <th className="text-left p-4">Amount</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {payments.map((payment) => (
                    <tr
                      key={payment._id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="p-4">
                        <p className="font-semibold">
                          {payment.worker?.name || "Worker deleted"}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {payment.worker?.role || "-"}
                        </p>
                      </td>

                      <td className="p-4">{payment.month}</td>
                      <td className="p-4">{payment.presentDays}</td>
                      <td className="p-4">{payment.halfDays}</td>
                      <td className="p-4">{payment.absentDays}</td>

                      <td className="p-4 font-semibold">
                        ₹{payment.totalAmount}
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm text-white ${
                            payment.status === "Paid"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>

                      <td className="p-4 flex gap-2">
                        {payment.status === "Pending" && (
                          <button
                            onClick={() => handleMarkPaid(payment._id)}
                            className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-2 rounded-lg"
                          >
                            Mark Paid
                          </button>
                        )}

                        <button
                          onClick={() => handleDelete(payment._id)}
                          className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {payments.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="p-6 text-center text-gray-500"
                      >
                        No payment records found.
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

export default Payments;