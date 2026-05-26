import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen overflow-x-hidden">
      <Navbar />

      <div className="ml-[220px] w-[calc(100%-220px)] p-6">
        {/* Top Header */}
        <div className="bg-white rounded-2xl shadow p-5 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>

          <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold">
            D
          </div>
        </div>

        {/* Welcome */}
        <div className="mt-8">
          <h2 className="text-5xl font-bold text-gray-800">
            Welcome Dhruv Tandel
          </h2>

          <p className="text-lg text-gray-500 mt-3">
            Manage workers and wage payments efficiently.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg">
              View Workers
            </button>

            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-lg">
              Add Payment
            </button>

            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl text-lg">
              Generate Report
            </button>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
            <div className="bg-blue-500 text-white p-6 rounded-3xl shadow-lg">
              <h3 className="text-2xl">Total Workers</h3>
              <p className="text-5xl font-bold mt-4">128</p>
            </div>

            <div className="bg-green-500 text-white p-6 rounded-3xl shadow-lg">
              <h3 className="text-2xl">Total Businesses</h3>
              <p className="text-5xl font-bold mt-4">24</p>
            </div>

            <div className="bg-purple-500 text-white p-6 rounded-3xl shadow-lg">
              <h3 className="text-2xl">Monthly Payments</h3>
              <p className="text-5xl font-bold mt-4">₹4.5L</p>
            </div>

            <div className="bg-red-500 text-white p-6 rounded-3xl shadow-lg">
              <h3 className="text-2xl">Pending Payments</h3>
              <p className="text-5xl font-bold mt-4">12</p>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
            {/* Analytics */}
            <div className="xl:col-span-2 bg-white rounded-3xl shadow p-6 min-h-[350px]">
              <h2 className="text-3xl font-bold mb-6">
                Payment Analytics
              </h2>

              <div className="h-[250px] flex items-center justify-center text-gray-400 text-lg">
                Chart Area
              </div>
            </div>

            {/* Activity */}
            <div className="bg-white rounded-3xl shadow p-6">
              <h2 className="text-3xl font-bold mb-6">
                Recent Activity
              </h2>

              <div className="space-y-5 text-lg">
                <p>Worker Rahul added</p>
                <hr />

                <p>Payment of ₹15,000 completed</p>
                <hr />

                <p>New business registered</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;