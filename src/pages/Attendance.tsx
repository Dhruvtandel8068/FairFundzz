import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import {
  CalendarCheck,
  Plus,
  Trash2,
  Loader2,
} from "lucide-react";

type Worker = {
  _id: string;
  name: string;
  role: string;
  dailyWage: number;
};

type AttendanceRecord = {
  _id: string;
  worker: Worker;
  date: string;
  status: "Present" | "Absent" | "Half Day";
  hoursWorked: number;
  notes?: string;
};

const Attendance = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    worker: "",
    date: "",
    status: "Present",
    hoursWorked: "8",
    notes: "",
  });

  const fetchWorkers = async () => {
    const res = await API.get("/workers");
    setWorkers(res.data.workers || []);
  };

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const res = await API.get("/attendance");
      setAttendance(res.data.attendance || []);
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to fetch attendance");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
    fetchAttendance();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
      ...(name === "status" && value === "Absent"
        ? { hoursWorked: "0" }
        : {}),
      ...(name === "status" && value === "Half Day"
        ? { hoursWorked: "4" }
        : {}),
      ...(name === "status" && value === "Present"
        ? { hoursWorked: "8" }
        : {}),
    });
  };

  const handleAddAttendance = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.worker || !form.date || !form.status) {
      alert("Please select worker, date and status");
      return;
    }

    try {
      await API.post("/attendance", {
        worker: form.worker,
        date: form.date,
        status: form.status,
        hoursWorked: Number(form.hoursWorked),
        notes: form.notes,
      });

      setForm({
        worker: "",
        date: "",
        status: "Present",
        hoursWorked: "8",
        notes: "",
      });

      fetchAttendance();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to add attendance");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Delete this attendance record?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/attendance/${id}`);
      fetchAttendance();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to delete attendance");
    }
  };

  return (
    <div className="flex bg-[#f4f7fe] min-h-screen">
      <Navbar />

      <div className="ml-[220px] w-[calc(100%-220px)] p-6">
        <div className="bg-white rounded-3xl shadow-sm p-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Attendance Management
            </h1>

            <p className="text-gray-500 mt-2 text-lg">
              Track daily attendance, work hours and wage calculation base.
            </p>
          </div>

          <div className="bg-blue-100 text-blue-700 px-5 py-3 rounded-2xl font-semibold flex items-center gap-2">
            <CalendarCheck size={20} />
            Records: {attendance.length}
          </div>
        </div>

        <form
          onSubmit={handleAddAttendance}
          className="bg-white rounded-3xl shadow-sm p-6 mt-8"
        >
          <h2 className="text-2xl font-bold mb-5">
            Add Attendance
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <select
              name="worker"
              value={form.worker}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3"
            >
              <option value="">Select Worker</option>
              {workers.map((worker) => (
                <option key={worker._id} value={worker._id}>
                  {worker.name} - {worker.role}
                </option>
              ))}
            </select>

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3"
            />

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3"
            >
              <option value="Present">Present</option>
              <option value="Half Day">Half Day</option>
              <option value="Absent">Absent</option>
            </select>

            <input
              type="number"
              name="hoursWorked"
              value={form.hoursWorked}
              onChange={handleChange}
              placeholder="Hours Worked"
              className="border rounded-xl px-4 py-3"
            />

            <input
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Notes"
              className="border rounded-xl px-4 py-3 md:col-span-2"
            />
          </div>

          <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
            <Plus size={20} />
            Add Attendance
          </button>
        </form>

        <div className="bg-white rounded-3xl shadow-sm p-6 mt-8">
          <h2 className="text-2xl font-bold mb-6">
            Attendance Records
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
                    <th className="p-4 text-left">Role</th>
                    <th className="p-4 text-left">Date</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-left">Hours</th>
                    <th className="p-4 text-left">Notes</th>
                    <th className="p-4 text-left">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {attendance.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-4 font-semibold">
                        {item.worker?.name}
                      </td>

                      <td className="p-4">
                        {item.worker?.role}
                      </td>

                      <td className="p-4">
                        {new Date(item.date).toLocaleDateString()}
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-4 py-1 rounded-full text-sm text-white ${
                            item.status === "Present"
                              ? "bg-green-500"
                              : item.status === "Half Day"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="p-4">
                        {item.hoursWorked}
                      </td>

                      <td className="p-4">
                        {item.notes || "-"}
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {attendance.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="p-6 text-center text-gray-500"
                      >
                        No attendance records found.
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

export default Attendance;