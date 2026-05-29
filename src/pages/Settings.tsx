import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    localStorage.setItem("settings", JSON.stringify(formData));
    alert("Settings saved successfully!");
  };

  const handlePassword = () => {
    const password = prompt("Enter new password");

    if (password && password.length >= 6) {
      alert("Password changed successfully!");
    } else {
      alert("Password must be at least 6 characters");
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
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6 flex justify-between items-center">
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

        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-3xl font-bold mb-8">
            Security
          </h2>

          <div className="flex gap-4">
            <button
              onClick={handlePassword}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
            >
              Change Password
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;