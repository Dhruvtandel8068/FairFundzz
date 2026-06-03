import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import { Users as UsersIcon, Trash2, Plus, Shield } from "lucide-react";

type User = {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "worker";
  createdAt: string;
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "worker",
  });

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data.users || []);
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.role) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/users", form);

      setForm({
        name: "",
        email: "",
        password: "",
        role: "worker",
      });

      fetchUsers();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to create user");
    }
  };

  const updateRole = async (id: string, role: string) => {
    try {
      await API.put(`/users/${id}/role`, { role });
      fetchUsers();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to update role");
    }
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Delete this user?")) return;

    try {
      await API.delete(`/users/${id}`);
      fetchUsers();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <div className="flex bg-[#f4f7fe] min-h-screen">
      <Navbar />

      <div className="ml-[220px] w-[calc(100%-220px)] p-6">
        <div className="bg-white rounded-3xl shadow-sm p-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              User Management
            </h1>
            <p className="text-gray-500 mt-2">
              Create users, assign roles and manage access.
            </p>
          </div>

          <div className="bg-blue-100 text-blue-700 px-5 py-3 rounded-2xl font-semibold flex items-center gap-2">
            <UsersIcon size={20} />
            Users: {users.length}
          </div>
        </div>

        <form
          onSubmit={createUser}
          className="bg-white rounded-3xl shadow-sm p-6 mt-8"
        >
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
            <Plus size={22} />
            Create New User
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Full Name"
              className="border rounded-xl px-4 py-3"
            />

            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              placeholder="Password"
              className="border rounded-xl px-4 py-3"
            />

            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="border rounded-xl px-4 py-3"
            >
              <option value="worker">Worker</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold">
              Create User
            </button>
          </div>
        </form>

        <div className="bg-white rounded-3xl shadow-sm p-6 mt-8">
          <h2 className="text-2xl font-bold mb-6">
            Users List
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-4 text-left">User</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Role</th>
                  <th className="p-4 text-left">Created</th>
                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <p className="font-semibold">{user.name}</p>
                    </td>

                    <td className="p-4">{user.email}</td>

                    <td className="p-4">
                      <select
                        value={user.role}
                        onChange={(e) => updateRole(user._id, e.target.value)}
                        className="border rounded-lg px-3 py-2"
                      >
                        <option value="worker">Worker</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>

                    <td className="p-4">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}

                {users.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-6 text-center text-gray-500"
                    >
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-yellow-50 text-yellow-800 rounded-2xl p-4 flex gap-3">
            <Shield size={22} />
            <p>
              Only Admin can access this page. Users cannot choose their own role
              during registration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;