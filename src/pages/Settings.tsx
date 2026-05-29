import { useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();

  const savedSettings = JSON.parse(
    localStorage.getItem("settings") || "null"
  );

  const [formData, setFormData] = useState(
    savedSettings || {
      fullName: "Dhruv Tandel",
      email: "dhruvtandel8866@gmail.com",
      phone: "+91 8866108068",
      businessName: "FairFundz",
    }
  );

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    localStorage.setItem("settings", JSON.stringify(formData));
    alert("Settings saved successfully!");
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !passwordForm.oldPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {
      alert("Please fill all password fields");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      alert("New password must be at least 6 characters");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    try {
      await API.put("/auth/change-password", {
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword,
      });

      alert("Password changed successfully");

      setPasswordForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to change password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-[#f4f7fe]">
      <Navbar />

      <div className="ml-[220px] w-[calc(100%-220px)] p-6">
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h1 className="text-4xl font-bold">Settings</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 mb-6">
          <h2 className="text-3xl font-bold mb-8">
            Profile Settings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Business Name
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
          >
            Save Changes
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Change Password</h2>
            <p className="text-gray-500 mt-2">
              Keep your account secure by updating your password regularly.
            </p>
          </div>

          <div className="border px-5 py-3 rounded-2xl font-semibold flex gap-2 items-center">
            <ShieldCheck size={20} />
            Security Settings
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <form
            onSubmit={handleChangePassword}
            className="lg:col-span-2 bg-white rounded-2xl shadow-md p-8"
          >
            <h2 className="text-2xl font-bold mb-6">
              Update Your Password
            </h2>

            <input
              type="password"
              name="oldPassword"
              value={passwordForm.oldPassword}
              onChange={handlePasswordChange}
              placeholder="Enter old password"
              className="w-full border rounded-2xl px-5 py-4 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              name="newPassword"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              placeholder="Enter new password"
              className="w-full border rounded-2xl px-5 py-4 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              name="confirmPassword"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Confirm new password"
              className="w-full border rounded-2xl px-5 py-4 mb-5 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg">
              Change Password
            </button>
          </form>

          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-4">
              Password Tips
            </h2>

            <div className="space-y-5">
              <div>
                <h3 className="font-bold">Use a strong password</h3>
                <p className="text-gray-500 mt-1">
                  Include uppercase, lowercase, numbers, and symbols.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Do not reuse old passwords
                </h3>
                <p className="text-gray-500 mt-1">
                  Choose a fresh password that you do not use elsewhere.
                </p>
              </div>

              <div>
                <h3 className="font-bold">Keep it private</h3>
                <p className="text-gray-500 mt-1">
                  Never share your password with anyone.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-3xl font-bold mb-8">
            Security
          </h2>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;