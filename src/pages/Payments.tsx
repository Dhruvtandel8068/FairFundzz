import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  Plus,
  Trash2,
  CreditCard,
  Clock,
  CheckCircle,
  IndianRupee,
} from "lucide-react";

type Payment = {
  id: number;
  workerName: string;
  amount: number;
  method: "Cash" | "UPI" | "Bank";
  status: "Paid" | "Pending";
  date: string;
  reference: string;
};

const defaultPayments: Payment[] = [
  {
    id: 1,
    workerName: "Rahul Sharma",
    amount: 15000,
    method: "UPI",
    status: "Paid",
    date: "2026-05-05",
    reference: "UPI12345",
  },
  {
    id: 2,
    workerName: "Amit Patel",
    amount: 12500,
    method: "Bank",
    status: "Pending",
    date: "2026-05-04",
    reference: "BANK9876",
  },
];

const Payments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);

  const [form, setForm] = useState({
    workerName: "",
    amount: "",
    method: "UPI",
    status: "Pending",
    reference: "",
  });

  useEffect(() => {
    const savedPayments = localStorage.getItem("payments");

    if (savedPayments) {
      setPayments(JSON.parse(savedPayments));
    } else {
      setPayments(defaultPayments);
      localStorage.setItem("payments", JSON.stringify(defaultPayments));
    }
  }, []);

  const savePayments = (updatedPayments: Payment[]) => {
    setPayments(updatedPayments);
    localStorage.setItem("payments", JSON.stringify(updatedPayments));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.workerName || !form.amount || !form.reference) {
      alert("Please fill all required fields");
      return;
    }

    const newPayment: Payment = {
      id: Date.now(),
      workerName: form.workerName,
      amount: Number(form.amount),
      method: form.method as "Cash" | "UPI" | "Bank",
      status: form.status as "Paid" | "Pending",
      date: new Date().toISOString().split("T")[0],
      reference: form.reference,
    };

    savePayments([newPayment, ...payments]);

    setForm({
      workerName: "",
      amount: "",
      method: "UPI",
      status: "Pending",
      reference: "",
    });
  };

  const handleDelete = (id: number) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this payment?"
    );

    if (!confirmDelete) return;

    const updatedPayments = payments.filter(
      (payment) => payment.id !== id
    );

    savePayments(updatedPayments);
  };

  const totalPaid = payments
    .filter((payment) => payment.status === "Paid")
    .reduce((total, payment) => total + payment.amount, 0);

  const totalPending = payments
    .filter((payment) => payment.status === "Pending")
    .reduce((total, payment) => total + payment.amount, 0);

  const totalTransactions = payments.length;

  return (
    <div className="flex bg-[#f4f7fe] min-h-screen">
      <Navbar />

      <div className="ml-[220px] w-[calc(100%-220px)] p-6">
        <div className="bg-white p-6 rounded-3xl shadow flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">
              Payments
            </h1>

            <p className="text-gray-500 mt-2">
              Track wages, pending payments, and salary transactions.
            </p>
          </div>

          <CreditCard className="text-blue-600" size={44} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-green-500 text-white p-6 rounded-2xl shadow">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl">Total Paid</h2>
                <p className="text-4xl font-bold mt-3">
                  ₹{totalPaid}
                </p>
              </div>

              <CheckCircle size={45} />
            </div>
          </div>

          <div className="bg-yellow-500 text-white p-6 rounded-2xl shadow">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl">Pending</h2>
                <p className="text-4xl font-bold mt-3">
                  ₹{totalPending}
                </p>
              </div>

              <Clock size={45} />
            </div>
          </div>

          <div className="bg-purple-500 text-white p-6 rounded-2xl shadow">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl">Transactions</h2>
                <p className="text-4xl font-bold mt-3">
                  {totalTransactions}
                </p>
              </div>

              <IndianRupee size={45} />
            </div>
          </div>
        </div>

        <form
          onSubmit={handleAddPayment}
          className="bg-white rounded-3xl shadow-sm p-6 mt-8"
        >
          <h2 className="text-2xl font-bold mb-5">
            Add Payment
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            <input
              name="workerName"
              value={form.workerName}
              onChange={handleChange}
              placeholder="Worker Name"
              className="border rounded-xl px-4 py-3"
            />

            <input
              name="amount"
              value={form.amount}
              onChange={handleChange}
              type="number"
              placeholder="Amount"
              className="border rounded-xl px-4 py-3"
            />

            <select
              name="method"
              value={form.method}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3"
            >
              <option value="UPI">UPI</option>
              <option value="Bank">Bank</option>
              <option value="Cash">Cash</option>
            </select>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3"
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
            </select>

            <input
              name="reference"
              value={form.reference}
              onChange={handleChange}
              placeholder="Reference ID"
              className="border rounded-xl px-4 py-3"
            />
          </div>

          <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
            <Plus size={20} />
            Add Payment
          </button>
        </form>

        <div className="bg-white mt-8 rounded-2xl shadow overflow-hidden">
          <div className="p-5 border-b">
            <h2 className="text-2xl font-bold">
              Payment Records
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-4">Worker</th>
                  <th className="text-left p-4">Amount</th>
                  <th className="text-left p-4">Method</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Reference</th>
                  <th className="text-left p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {payments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-4">{payment.workerName}</td>

                    <td className="p-4 font-semibold">
                      ₹{payment.amount}
                    </td>

                    <td className="p-4">{payment.method}</td>

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

                    <td className="p-4">{payment.date}</td>

                    <td className="p-4">{payment.reference}</td>

                    <td className="p-4">
                      <button
                        onClick={() => handleDelete(payment.id)}
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
                      colSpan={7}
                      className="p-6 text-center text-gray-500"
                    >
                      No payment records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;