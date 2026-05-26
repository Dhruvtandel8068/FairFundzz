import Navbar from "../components/Navbar";

const payments = [
  {
    worker: "Rahul Sharma",
    amount: "₹15,000",
    status: "Paid",
    date: "5 May 2026",
  },
  {
    worker: "Amit Patel",
    amount: "₹12,500",
    status: "Pending",
    date: "4 May 2026",
  },
  {
    worker: "Ravi Kumar",
    amount: "₹18,000",
    status: "Paid",
    date: "2 May 2026",
  },
];

const Payments = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Navbar />

      <div className="ml-[220px] w-full p-6">
        {/* Header */}
        <div className="bg-white p-5 rounded-2xl shadow flex justify-between items-center">
          <h1 className="text-3xl font-bold">Payments</h1>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl">
            + Add Payment
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-green-500 text-white p-6 rounded-2xl shadow">
            <h2 className="text-xl">Total Paid</h2>
            <p className="text-4xl font-bold mt-3">₹4.5L</p>
          </div>

          <div className="bg-yellow-500 text-white p-6 rounded-2xl shadow">
            <h2 className="text-xl">Pending</h2>
            <p className="text-4xl font-bold mt-3">₹85K</p>
          </div>

          <div className="bg-purple-500 text-white p-6 rounded-2xl shadow">
            <h2 className="text-xl">Transactions</h2>
            <p className="text-4xl font-bold mt-3">248</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white mt-8 rounded-2xl shadow overflow-hidden">
          <div className="p-5 border-b">
            <h2 className="text-2xl font-bold">Recent Payments</h2>
          </div>

          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4">Worker</th>
                <th className="text-left p-4">Amount</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Date</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((payment, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="p-4">{payment.worker}</td>

                  <td className="p-4 font-semibold">
                    {payment.amount}
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

                  <td className="p-4">{payment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payments;