const ComplianceTable = ({ violations }: any) => {

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

      <h2 className="text-2xl font-bold mb-5">
        Compliance Violations
      </h2>

      <table className="w-full">

        <thead>

          <tr className="bg-blue-600 text-white">

            <th className="p-3">Worker</th>

            <th>Violation</th>

            <th>Severity</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {violations.map((item: any, index: number) => (

            <tr
              key={index}
              className="border-b"
            >

              <td className="p-4">
                {item.workerName}
              </td>

              <td>{item.message}</td>

              <td>

                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full">

                  {item.severity}

                </span>

              </td>

              <td>

                {item.resolved
                  ? "Resolved"
                  : "Pending"}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default ComplianceTable;