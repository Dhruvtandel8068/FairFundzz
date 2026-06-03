import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import {
  Activity,
  Trash2,
  ShieldCheck,
  RefreshCcw,
  AlertTriangle,
} from "lucide-react";

type AuditLog = {
  _id: string;
  action: string;
  module: string;
  description: string;
  role: string;
  createdAt: string;
  performedBy?: {
    name: string;
    email: string;
  };
};

const AuditLogs = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await API.get("/audit-logs");
      setLogs(res.data.logs || []);
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to fetch audit logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="flex bg-[#f4f7fe] min-h-screen">
      <Navbar />

      <div className="ml-[220px] w-[calc(100%-220px)] p-6">
        <div className="bg-white rounded-3xl shadow-sm p-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Audit Logs
            </h1>
            <p className="text-gray-500 mt-2">
              Track user actions and system activity.
            </p>
          </div>

          <button
            onClick={fetchLogs}
            className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"
          >
            <RefreshCcw size={18} />
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-blue-600 text-white rounded-3xl p-6 shadow">
            <Activity size={36} />
            <p className="mt-4 text-lg">Total Logs</p>
            <h2 className="text-4xl font-bold">{logs.length}</h2>
          </div>

          <div className="bg-green-600 text-white rounded-3xl p-6 shadow">
            <ShieldCheck size={36} />
            <p className="mt-4 text-lg">System Monitored</p>
            <h2 className="text-4xl font-bold">Yes</h2>
          </div>

          <div className="bg-red-600 text-white rounded-3xl p-6 shadow">
            <AlertTriangle size={36} />
            <p className="mt-4 text-lg">Admin Only</p>
            <h2 className="text-4xl font-bold">Secure</h2>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6 mt-8">
          <h2 className="text-2xl font-bold mb-6">
            Activity History
          </h2>

          {loading ? (
            <p className="text-gray-500">Loading audit logs...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="p-4 text-left">Action</th>
                    <th className="p-4 text-left">Module</th>
                    <th className="p-4 text-left">Description</th>
                    <th className="p-4 text-left">User</th>
                    <th className="p-4 text-left">Role</th>
                    <th className="p-4 text-left">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {logs.map((log) => (
                    <tr key={log._id} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-semibold">{log.action}</td>
                      <td className="p-4 capitalize">{log.module}</td>
                      <td className="p-4">{log.description}</td>
                      <td className="p-4">
                        {log.performedBy?.name || "Unknown"}
                      </td>
                      <td className="p-4 uppercase">{log.role}</td>
                      <td className="p-4">
                        {new Date(log.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}

                  {logs.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="p-6 text-center text-gray-500"
                      >
                        No audit logs found.
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

export default AuditLogs;