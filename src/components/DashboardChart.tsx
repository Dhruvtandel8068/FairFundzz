import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", payments: 20000 },
  { month: "Feb", payments: 35000 },
  { month: "Mar", payments: 40000 },
  { month: "Apr", payments: 50000 },
  { month: "May", payments: 70000 },
];

const DashboardChart = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">

      <h2 className="text-2xl font-semibold mb-6">
        Payment Analytics
      </h2>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="payments"
              stroke="#2563eb"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default DashboardChart;