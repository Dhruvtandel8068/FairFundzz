const Workers = () => {

  const workers = [
    {
      name: "Rahul Sharma",
      role: "Electrician",
      salary: "₹18,000",
      status: "Paid",
    },
    {
      name: "Amit Patel",
      role: "Plumber",
      salary: "₹15,000",
      status: "Pending",
    },
    {
      name: "Ravi Kumar",
      role: "Welder",
      salary: "₹20,000",
      status: "Paid",
    },
    {
      name: "Karan Yadav",
      role: "Carpenter",
      salary: "₹17,500",
      status: "Pending",
    },
  ];

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="mb-8">

        <h1 className="text-5xl font-bold text-gray-800">
          Workers Management
        </h1>

        <p className="text-gray-500 mt-3 text-lg">
          Manage all registered workers.
        </p>

      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">

            <tr>

              <th className="p-5 text-left">Name</th>

              <th className="p-5 text-left">Role</th>

              <th className="p-5 text-left">Salary</th>

              <th className="p-5 text-left">Status</th>

            </tr>

          </thead>

          <tbody>

            {workers.map((worker, index) => (

              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition"
              >

                <td className="p-5 font-semibold">
                  {worker.name}
                </td>

                <td className="p-5">
                  {worker.role}
                </td>

                <td className="p-5">
                  {worker.salary}
                </td>

                <td className="p-5">

                  <span
                    className={`px-4 py-1 rounded-full text-sm text-white ${
                      worker.status === "Paid"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {worker.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Workers;