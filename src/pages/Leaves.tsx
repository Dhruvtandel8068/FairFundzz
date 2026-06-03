import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import {
  CalendarDays,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  Plus,
  Loader2,
} from "lucide-react";

type Worker = {
  _id: string;
  name: string;
  role: string;
};

type Leave = {
  _id: string;
  worker: Worker;
  leaveType: "Sick" | "Casual" | "Emergency" | "Personal";
  fromDate: string;
  toDate: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
};

const Leaves = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    worker: "",
    leaveType: "Sick",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const fetchWorkers = async () => {
    const res = await API.get("/workers");
    setWorkers(res.data.workers || []);
  };

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const res = await API.get("/leaves");
      setLeaves(res.data.leaves || []);
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to fetch leaves");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
    fetchLeaves();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.worker ||
      !form.leaveType ||
      !form.fromDate ||
      !form.toDate ||
      !form.reason
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/leaves", form);

      setForm({
        worker: "",
        leaveType: "Sick",
        fromDate: "",
        toDate: "",
        reason: "",
      });

      fetchLeaves();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to create leave");
    }
  };

  const updateStatus = async (
    id: string,
    status: "Approved" | "Rejected" | "Pending"
  ) => {
    try {
      await API.put(`/leaves/${id}/status`, { status });
      fetchLeaves();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to update leave");
    }
  };

  const deleteLeave = async (id: string) => {
    const confirmDelete = confirm("Delete this leave request?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/leaves/${id}`);
      fetchLeaves();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to delete leave");
    }
  };

  const pendingCount = leaves.filter((l) => l.status === "Pending").length;
  const approvedCount = leaves.filter((l) => l.status === "Approved").length;
  const rejectedCount = leaves.filter((l) => l.status === "Rejected").length;

  return (
    <div className="flex bg-[#f4f7fe] min-h-screen">
      <Navbar />

      <div className="ml-[220px] w-[calc(100%-220px)] p-6">
        <div className="bg-white rounded-3xl shadow-sm p-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Leave Management
            </h1>
            <p className="text-gray-500 mt-2">
              Apply, approve, reject and track worker leave requests.
            </p>
          </div>

          <div className="bg-blue-100 text-blue-700 px-5 py-3 rounded-2xl font-semibold flex items-center gap-2">
            <CalendarDays size={20} />
            Total Leaves: {leaves.length}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-yellow-500 text-white rounded-3xl p-6 shadow">
            <Clock size={36} />
            <p className="mt-4 text-lg">Pending</p>
            <h2 className="text-4xl font-bold">{pendingCount}</h2>
          </div>

          <div className="bg-green-600 text-white rounded-3xl p-6 shadow">
            <CheckCircle size={36} />
            <p className="mt-4 text-lg">Approved</p>
            <h2 className="text-4xl font-bold">{approvedCount}</h2>
          </div>

          <div className="bg-red-600 text-white rounded-3xl p-6 shadow">
            <XCircle size={36} />
            <p className="mt-4 text-lg">Rejected</p>
            <h2 className="text-4xl font-bold">{rejectedCount}</h2>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-sm p-6 mt-8"
        >
          <h2 className="text-2xl font-bold mb-5">
            Apply Leave
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            <select
              value={form.worker}
              onChange={(e) => setForm({ ...form, worker: e.target.value })}
              className="border rounded-xl px-4 py-3"
            >
              <option value="">Select Worker</option>
              {workers.map((worker) => (
                <option key={worker._id} value={worker._id}>
                  {worker.name} - {worker.role}
                </option>
              ))}
            </select>

            <select
              value={form.leaveType}
              onChange={(e) =>
                setForm({ ...form, leaveType: e.target.value })
              }
              className="border rounded-xl px-4 py-3"
            >
              <option value="Sick">Sick</option>
              <option value="Casual">Casual</option>
              <option value="Emergency">Emergency</option>
              <option value="Personal">Personal</option>
            </select>

            <input
              type="date"
              value={form.fromDate}
              onChange={(e) =>
                setForm({ ...form, fromDate: e.target.value })
              }
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="date"
              value={form.toDate}
              onChange={(e) => setForm({ ...form, toDate: e.target.value })}
              className="border rounded-xl px-4 py-3"
            />

            <input
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              placeholder="Reason"
              className="border rounded-xl px-4 py-3"
            />
          </div>

          <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
            <Plus size={20} />
            Submit Leave
          </button>
        </form>

        <div className="bg-white rounded-3xl shadow-sm p-6 mt-8">
          <h2 className="text-2xl font-bold mb-6">
            Leave Requests
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
                    <th className="p-4 text-left">Type</th>
                    <th className="p-4 text-left">From</th>
                    <th className="p-4 text-left">To</th>
                    <th className="p-4 text-left">Reason</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-left">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {leaves.map((leave) => (
                    <tr key={leave._id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <p className="font-semibold">
                          {leave.worker?.name || "Worker deleted"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {leave.worker?.role || "-"}
                        </p>
                      </td>

                      <td className="p-4">{leave.leaveType}</td>

                      <td className="p-4">
                        {new Date(leave.fromDate).toLocaleDateString()}
                      </td>

                      <td className="p-4">
                        {new Date(leave.toDate).toLocaleDateString()}
                      </td>

                      <td className="p-4">{leave.reason}</td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm text-white ${
                            leave.status === "Approved"
                              ? "bg-green-500"
                              : leave.status === "Rejected"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                          }`}
                        >
                          {leave.status}
                        </span>
                      </td>

                      <td className="p-4 flex gap-2">
                        {leave.status === "Pending" && (
                          <>
                            <button
                              onClick={() =>
                                updateStatus(leave._id, "Approved")
                              }
                              className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-2 rounded-lg"
                            >
                              Approve
                            </button>

                            <button
                              onClick={() =>
                                updateStatus(leave._id, "Rejected")
                              }
                              className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg"
                            >
                              Reject
                            </button>
                          </>
                        )}

                        <button
                          onClick={() => deleteLeave(leave._id)}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {leaves.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="p-6 text-center text-gray-500"
                      >
                        No leave requests found.
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

export default Leaves;