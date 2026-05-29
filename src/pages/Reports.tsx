import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  FileText,
  Printer,
  Users,
  IndianRupee,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

type Worker = {
  id: number;
  name: string;
  role: string;
  phone: string;
  city: string;
  dailyWage: number;
  minimumWage: number;
  status: "Active" | "Inactive";
};

type Payment = {
  id: number;
  workerName: string;
  amount: number;
  method: "Cash" | "UPI" | "Bank";
  status: "Paid" | "Pending";
  date: string;
  reference: string;
};

const Reports = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    const savedWorkers = localStorage.getItem("workers");
    const savedPayments = localStorage.getItem("payments");

    if (savedWorkers) {
      setWorkers(JSON.parse(savedWorkers));
    }

    if (savedPayments) {
      setPayments(JSON.parse(savedPayments));
    }
  }, []);

  const totalWorkers = workers.length;

  const totalPaid = payments
    .filter((payment) => payment.status === "Paid")
    .reduce((total, payment) => total + payment.amount, 0);

  const totalPending = payments
    .filter((payment) => payment.status === "Pending")
    .reduce((total, payment) => total + payment.amount, 0);

  const wageRiskWorkers = workers.filter(
    (worker) => worker.dailyWage < worker.minimumWage
  );

  const complianceScore =
    totalWorkers === 0
      ? 100
      : Math.round(
          ((totalWorkers - wageRiskWorkers.length) / totalWorkers) * 100
        );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex bg-[#f4f7fe] min-h-screen">
      <Navbar />

      <div className="ml-[220px] w-[calc(100%-220px)] p-6 print:ml-0 print:w-full">
        <div className="bg-white rounded-3xl shadow-sm p-6 flex justify-between items-center print:shadow-none">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Reports
            </h1>

            <p className="text-gray-500 mt-2 text-lg">
              Worker wage, payment, and compliance audit report.
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 print:hidden"
          >
            <Printer size={20} />
            Print Report
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-blue-500 text-white p-6 rounded-2xl shadow">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg">Total Workers</h2>
                <p className="text-4xl font-bold mt-3">
                  {totalWorkers}
                </p>
              </div>

              <Users size={42} />
            </div>
          </div>

          <div className="bg-green-500 text-white p-6 rounded-2xl shadow">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg">Total Paid</h2>
                <p className="text-4xl font-bold mt-3">
                  ₹{totalPaid}
                </p>
              </div>

              <IndianRupee size={42} />
            </div>
          </div>

          <div className="bg-yellow-500 text-white p-6 rounded-2xl shadow">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg">Pending Wages</h2>
                <p className="text-4xl font-bold mt-3">
                  ₹{totalPending}
                </p>
              </div>

              <AlertTriangle size={42} />
            </div>
          </div>

          <div
            className={`text-white p-6 rounded-2xl shadow ${
              complianceScore >= 80
                ? "bg-green-600"
                : complianceScore >= 50
                ? "bg-orange-500"
                : "bg-red-600"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg">Compliance Score</h2>
                <p className="text-4xl font-bold mt-3">
                  {complianceScore}%
                </p>
              </div>

              <CheckCircle size={42} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6 mt-8">
          <div className="flex items-center gap-3 mb-5">
            <FileText className="text-purple-600" />
            <h2 className="text-2xl font-bold">
              Audit Summary
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
            <div className="border rounded-2xl p-5">
              <h3 className="font-bold mb-3">
                Worker Compliance
              </h3>

              <p>
                Total registered workers:{" "}
                <b>{totalWorkers}</b>
              </p>

              <p>
                Workers below minimum wage:{" "}
                <b className="text-red-600">
                  {wageRiskWorkers.length}
                </b>
              </p>

              <p>
                Safe wage workers:{" "}
                <b className="text-green-600">
                  {totalWorkers - wageRiskWorkers.length}
                </b>
              </p>
            </div>

            <div className="border rounded-2xl p-5">
              <h3 className="font-bold mb-3">
                Payment Summary
              </h3>

              <p>
                Total transactions:{" "}
                <b>{payments.length}</b>
              </p>

              <p>
                Paid transactions:{" "}
                <b className="text-green-600">
                  {
                    payments.filter(
                      (payment) => payment.status === "Paid"
                    ).length
                  }
                </b>
              </p>

              <p>
                Pending transactions:{" "}
                <b className="text-red-600">
                  {
                    payments.filter(
                      (payment) => payment.status === "Pending"
                    ).length
                  }
                </b>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6 mt-8">
          <h2 className="text-2xl font-bold mb-5">
            Wage Risk Workers
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-red-600 text-white">
                <tr>
                  <th className="p-4 text-left">Worker</th>
                  <th className="p-4 text-left">Role</th>
                  <th className="p-4 text-left">City</th>
                  <th className="p-4 text-left">Daily Wage</th>
                  <th className="p-4 text-left">Minimum Wage</th>
                  <th className="p-4 text-left">Risk</th>
                </tr>
              </thead>

              <tbody>
                {wageRiskWorkers.map((worker) => (
                  <tr
                    key={worker.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-4 font-semibold">
                      {worker.name}
                    </td>

                    <td className="p-4">{worker.role}</td>
                    <td className="p-4">{worker.city}</td>

                    <td className="p-4">
                      ₹{worker.dailyWage}
                    </td>

                    <td className="p-4">
                      ₹{worker.minimumWage}
                    </td>

                    <td className="p-4">
                      <span className="bg-red-500 text-white px-4 py-1 rounded-full text-sm">
                        Underpaid
                      </span>
                    </td>
                  </tr>
                ))}

                {wageRiskWorkers.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-6 text-center text-gray-500"
                    >
                      No wage risk found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6 mt-8">
          <h2 className="text-2xl font-bold mb-5">
            Pending Payments
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-yellow-500 text-white">
                <tr>
                  <th className="p-4 text-left">Worker</th>
                  <th className="p-4 text-left">Amount</th>
                  <th className="p-4 text-left">Method</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Reference</th>
                </tr>
              </thead>

              <tbody>
                {payments
                  .filter((payment) => payment.status === "Pending")
                  .map((payment) => (
                    <tr
                      key={payment.id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-4 font-semibold">
                        {payment.workerName}
                      </td>

                      <td className="p-4">
                        ₹{payment.amount}
                      </td>

                      <td className="p-4">
                        {payment.method}
                      </td>

                      <td className="p-4">
                        {payment.date}
                      </td>

                      <td className="p-4">
                        {payment.reference}
                      </td>
                    </tr>
                  ))}

                {payments.filter((payment) => payment.status === "Pending")
                  .length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-6 text-center text-gray-500"
                    >
                      No pending payments.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center text-gray-400 mt-8 print:block">
          Report generated by FairFundz
        </div>
      </div>
    </div>
  );
};

export default Reports;