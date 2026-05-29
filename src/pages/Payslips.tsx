import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import { Download, FileText, Loader2 } from "lucide-react";

type Worker = {
  _id: string;
  name: string;
  role: string;
  city: string;
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

const Payslips = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await API.get("/payments");
      setPayments(res.data.payments || []);
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to fetch payslips");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const downloadPayslip = async (paymentId: string, workerName: string, month: string) => {
    try {
      const res = await API.get(`/payslips/${paymentId}/download`, {
        responseType: "blob",
      });

      const fileURL = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");

      link.href = fileURL;
      link.setAttribute("download", `${workerName}-${month}-payslip.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(fileURL);
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to download payslip");
    }
  };

  return (
    <div className="flex bg-[#f4f7fe] min-h-screen">
      <Navbar />

      <div className="ml-[220px] w-[calc(100%-220px)] p-6">
        <div className="bg-white rounded-3xl shadow-sm p-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Payslips
            </h1>
            <p className="text-gray-500 mt-2">
              Download professional salary slips generated from payment records.
            </p>
          </div>

          <div className="bg-blue-100 text-blue-700 px-5 py-3 rounded-2xl font-semibold flex items-center gap-2">
            <FileText size={20} />
            Total Payslips: {payments.length}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6 mt-8">
          <h2 className="text-2xl font-bold mb-6">
            Salary Slip Records
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
                    <th className="p-4 text-left">Half Day</th>
                    <th className="p-4 text-left">Absent</th>
                    <th className="p-4 text-left">Salary</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-left">Download</th>
                  </tr>
                </thead>

                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment._id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <p className="font-semibold">
                          {payment.worker?.name || "Worker deleted"}
                        </p>
                        <p className="text-sm text-gray-500">
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

                      <td className="p-4">
                        <button
                          onClick={() =>
                            downloadPayslip(
                              payment._id,
                              payment.worker?.name || "worker",
                              payment.month
                            )
                          }
                          className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-xl flex items-center gap-2"
                        >
                          <Download size={18} />
                          PDF
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
                        No payslips found. Generate payments first.
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

export default Payslips;