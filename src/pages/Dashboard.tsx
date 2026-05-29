import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProfileDropdown from "../components/ProfileDropdown";
import API from "../api/axios";
import {
  Users,
  CalendarCheck,
  CreditCard,
  AlertTriangle,
} from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalWorkers: 0,
    totalAttendance: 0,
    wageRisk: 0,
    totalPayments: 0,
    recentWorkers: [],
  });

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/dashboard");
      setStats(res.data.stats);
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to fetch dashboard");
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="flex bg-[#f4f7fe] min-h-screen">
      <Navbar />

      <div className="ml-[220px] w-[calc(100%-220px)] p-6">
        <div className="bg-white rounded-3xl shadow-sm p-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Dashboard
            </h1>
            <p className="text-gray-500 mt-2">
              Welcome back 👋
            </p>
          </div>

          <ProfileDropdown />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-blue-600 text-white rounded-3xl p-6 shadow">
            <Users size={36} />
            <p className="mt-4 text-lg">Total Workers</p>
            <h2 className="text-4xl font-bold">{stats.totalWorkers}</h2>
          </div>

          <div className="bg-green-600 text-white rounded-3xl p-6 shadow">
            <CalendarCheck size={36} />
            <p className="mt-4 text-lg">Attendance Records</p>
            <h2 className="text-4xl font-bold">{stats.totalAttendance}</h2>
          </div>

          <div className="bg-purple-600 text-white rounded-3xl p-6 shadow">
            <CreditCard size={36} />
            <p className="mt-4 text-lg">Estimated Payments</p>
            <h2 className="text-4xl font-bold">
              ₹{stats.totalPayments}
            </h2>
          </div>

          <div className="bg-red-600 text-white rounded-3xl p-6 shadow">
            <AlertTriangle size={36} />
            <p className="mt-4 text-lg">Wage Risk</p>
            <h2 className="text-4xl font-bold">{stats.wageRisk}</h2>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6 mt-8">
          <h2 className="text-2xl font-bold mb-5">
            Recent Workers
          </h2>

          {stats.recentWorkers.length === 0 ? (
            <p className="text-gray-500">No workers added yet.</p>
          ) : (
            <div className="space-y-4">
              {stats.recentWorkers.map((worker: any) => (
                <div
                  key={worker._id}
                  className="flex justify-between border-b pb-3"
                >
                  <div>
                    <h3 className="font-bold">{worker.name}</h3>
                    <p className="text-gray-500">
                      {worker.role} - {worker.city}
                    </p>
                  </div>

                  <p className="font-semibold">
                    ₹{worker.dailyWage}/day
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;