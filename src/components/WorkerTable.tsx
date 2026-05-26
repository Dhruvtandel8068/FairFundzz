const workers = [
  {
    name: "Rahul Sharma",
    role: "Electrician",
    wage: "₹1200/day",
  },
  {
    name: "Amit Patel",
    role: "Plumber",
    wage: "₹900/day",
  },
];

const WorkerTable = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">

      <h2 className="text-2xl font-semibold mb-6">
        Workers List
      </h2>

      <table className="w-full">

        <thead>

          <tr className="text-left border-b">

            <th className="pb-3">Name</th>
            <th className="pb-3">Role</th>
            <th className="pb-3">Daily Wage</th>

          </tr>

        </thead>

        <tbody>

          {workers.map((worker, index) => (

            <tr
              key={index}
              className="border-b"
            >

              <td className="py-4">
                {worker.name}
              </td>

              <td>
                {worker.role}
              </td>

              <td>
                {worker.wage}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default WorkerTable;