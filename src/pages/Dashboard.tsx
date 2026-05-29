import Navbar from "../components/Navbar";

import {
  Users,
  Building2,
  CreditCard,
  AlertCircle,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem("user") || "{}"
    );

  return (

    <div className="flex bg-[#f4f7fe] min-h-screen overflow-x-hidden">

      {/* SIDEBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <div className="ml-[220px] w-[calc(100%-220px)] p-6">

        {/* TOP HEADER */}

        <div className="bg-white rounded-3xl shadow-sm p-6 flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold text-[#111827]">

              Dashboard

            </h1>

            <p className="text-gray-500 mt-2">

              Welcome back 👋

            </p>

          </div>

          {/* USER PROFILE */}

          <div className="w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold">

            {user?.name?.charAt(0)}

          </div>

        </div>

        {/* WELCOME */}

        <div className="mt-8">

          <h2 className="text-5xl font-bold text-gray-800">

            Welcome {user?.name}

          </h2>

          <p className="text-lg text-gray-500 mt-3">

            Manage workers and wage payments efficiently.

          </p>

          {/* ACTION BUTTONS */}

          <div className="flex flex-wrap gap-4 mt-6">

            {/* VIEW WORKERS */}

            <button
              onClick={() =>
                navigate("/workers")
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl text-lg font-semibold shadow-lg transition"
            >

              View Workers

            </button>

            {/* ADD PAYMENT */}

            <button
              onClick={() =>
                navigate("/payments")
              }
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl text-lg font-semibold shadow-lg transition"
            >

              Add Payment

            </button>

            {/* REPORTS */}

            <button
              onClick={() =>
                navigate("/reports")
              }
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl text-lg font-semibold shadow-lg transition"
            >

              Generate Report

            </button>

          </div>

          {/* CARDS */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

            {/* WORKERS */}

            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-3xl shadow-lg">

              <div className="flex justify-between items-center">

                <div>

                  <h3 className="text-2xl">
                    Total Workers
                  </h3>

                  <p className="text-5xl font-bold mt-4">
                    128
                  </p>

                </div>

                <Users size={50} />

              </div>

            </div>

            {/* BUSINESS */}

            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-3xl shadow-lg">

              <div className="flex justify-between items-center">

                <div>

                  <h3 className="text-2xl">
                    Businesses
                  </h3>

                  <p className="text-5xl font-bold mt-4">
                    24
                  </p>

                </div>

                <Building2 size={50} />

              </div>

            </div>

            {/* PAYMENTS */}

            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-3xl shadow-lg">

              <div className="flex justify-between items-center">

                <div>

                  <h3 className="text-2xl">
                    Monthly Payments
                  </h3>

                  <p className="text-5xl font-bold mt-4">
                    ₹4.5L
                  </p>

                </div>

                <CreditCard size={50} />

              </div>

            </div>

            {/* PENDING */}

            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-3xl shadow-lg">

              <div className="flex justify-between items-center">

                <div>

                  <h3 className="text-2xl">
                    Pending Payments
                  </h3>

                  <p className="text-5xl font-bold mt-4">
                    12
                  </p>

                </div>

                <AlertCircle size={50} />

              </div>

            </div>

          </div>

          {/* BOTTOM SECTION */}

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

            {/* ANALYTICS */}

            <div className="xl:col-span-2 bg-white rounded-3xl shadow p-6 min-h-[350px]">

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-3xl font-bold">

                  Payment Analytics

                </h2>

                <select className="border px-4 py-2 rounded-xl">

                  <option>
                    This Year
                  </option>

                  <option>
                    Last Year
                  </option>

                </select>

              </div>

              <div className="h-[250px] flex items-center justify-center text-gray-400 text-lg border-2 border-dashed rounded-2xl">

                Analytics Chart Coming Soon

              </div>

            </div>

            {/* ACTIVITY */}

            <div className="bg-white rounded-3xl shadow p-6">

              <h2 className="text-3xl font-bold mb-6">

                Recent Activity

              </h2>

              <div className="space-y-5 text-lg">

                <div className="border-b pb-4">

                  Worker Rahul added

                </div>

                <div className="border-b pb-4">

                  Payment of ₹15,000 completed

                </div>

                <div className="border-b pb-4">

                  New business registered

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;