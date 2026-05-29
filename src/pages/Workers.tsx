import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  Plus,
  Trash2,
  Search,
  AlertTriangle,
} from "lucide-react";

type Worker = {
  id: number;
  name: string;
  role: string;
  phone: string;
  city: string;
  dailyWage: number;
  minimumWage: number;
  status: "Active" | "Inactive";
};

const defaultWorkers: Worker[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Electrician",
    phone: "9876543210",
    city: "Valsad",
    dailyWage: 600,
    minimumWage: 450,
    status: "Active",
  },
  {
    id: 2,
    name: "Amit Patel",
    role: "Plumber",
    phone: "9876543211",
    city: "Surat",
    dailyWage: 380,
    minimumWage: 450,
    status: "Active",
  },
];

const Workers = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    role: "",
    phone: "",
    city: "",
    dailyWage: "",
    minimumWage: "450",
  });

  useEffect(() => {
    const savedWorkers = localStorage.getItem("workers");

    if (savedWorkers) {
      setWorkers(JSON.parse(savedWorkers));
    } else {
      setWorkers(defaultWorkers);
      localStorage.setItem("workers", JSON.stringify(defaultWorkers));
    }
  }, []);

  const saveWorkers = (updatedWorkers: Worker[]) => {
    setWorkers(updatedWorkers);
    localStorage.setItem("workers", JSON.stringify(updatedWorkers));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddWorker = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.role ||
      !form.phone ||
      !form.city ||
      !form.dailyWage
    ) {
      alert("Please fill all required fields");
      return;
    }

    const newWorker: Worker = {
      id: Date.now(),
      name: form.name,
      role: form.role,
      phone: form.phone,
      city: form.city,
      dailyWage: Number(form.dailyWage),
      minimumWage: Number(form.minimumWage),
      status: "Active",
    };

    saveWorkers([newWorker, ...workers]);

    setForm({
      name: "",
      role: "",
      phone: "",
      city: "",
      dailyWage: "",
      minimumWage: "450",
    });
  };

  const handleDelete = (id: number) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this worker?"
    );

    if (!confirmDelete) return;

    const updatedWorkers = workers.filter(
      (worker) => worker.id !== id
    );

    saveWorkers(updatedWorkers);
  };

  const filteredWorkers = workers.filter((worker) =>
    worker.name.toLowerCase().includes(search.toLowerCase()) ||
    worker.role.toLowerCase().includes(search.toLowerCase()) ||
    worker.city.toLowerCase().includes(search.toLowerCase())
  );

  const wageRiskCount = workers.filter(
    (worker) => worker.dailyWage < worker.minimumWage
  ).length;

  return (
    <div className="flex bg-[#f4f7fe] min-h-screen">
      <Navbar />

      <div className="ml-[220px] w-[calc(100%-220px)] p-6">
        <div className="bg-white rounded-3xl shadow-sm p-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Workers Management
            </h1>

            <p className="text-gray-500 mt-2 text-lg">
              Add, track, and monitor worker wage compliance.
            </p>
          </div>

          <div className="bg-red-100 text-red-700 px-5 py-3 rounded-2xl font-semibold flex items-center gap-2">
            <AlertTriangle size={20} />
            Wage Risk: {wageRiskCount}
          </div>
        </div>

        <form
          onSubmit={handleAddWorker}
          className="bg-white rounded-3xl shadow-sm p-6 mt-8"
        >
          <h2 className="text-2xl font-bold mb-5">
            Add New Worker
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Worker Name"
              className="border rounded-xl px-4 py-3"
            />

            <input
              name="role"
              value={form.role}
              onChange={handleChange}
              placeholder="Skill / Role"
              className="border rounded-xl px-4 py-3"
            />

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="border rounded-xl px-4 py-3"
            />

            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              className="border rounded-xl px-4 py-3"
            />

            <input
              name="dailyWage"
              value={form.dailyWage}
              onChange={handleChange}
              placeholder="Daily Wage"
              type="number"
              className="border rounded-xl px-4 py-3"
            />

            <input
              name="minimumWage"
              value={form.minimumWage}
              onChange={handleChange}
              placeholder="Minimum Wage"
              type="number"
              className="border rounded-xl px-4 py-3"
            />
          </div>

          <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
            <Plus size={20} />
            Add Worker
          </button>
        </form>

        <div className="bg-white rounded-3xl shadow-sm p-6 mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              Worker Records
            </h2>

            <div className="relative">
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search worker..."
                className="border rounded-xl pl-10 pr-4 py-3"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-4 text-left">Worker</th>
                  <th className="p-4 text-left">Role</th>
                  <th className="p-4 text-left">Phone</th>
                  <th className="p-4 text-left">City</th>
                  <th className="p-4 text-left">Daily Wage</th>
                  <th className="p-4 text-left">Compliance</th>
                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredWorkers.map((worker) => {
                  const isRisk =
                    worker.dailyWage < worker.minimumWage;

                  return (
                    <tr
                      key={worker.id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-4 font-semibold">
                        {worker.name}
                      </td>

                      <td className="p-4">{worker.role}</td>
                      <td className="p-4">{worker.phone}</td>
                      <td className="p-4">{worker.city}</td>

                      <td className="p-4 font-semibold">
                        ₹{worker.dailyWage}
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-4 py-1 rounded-full text-sm text-white ${
                            isRisk
                              ? "bg-red-500"
                              : "bg-green-500"
                          }`}
                        >
                          {isRisk ? "Below Minimum Wage" : "Safe"}
                        </span>
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() => handleDelete(worker.id)}
                          className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {filteredWorkers.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="p-6 text-center text-gray-500"
                    >
                      No workers found.
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

export default Workers;