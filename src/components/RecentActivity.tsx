const RecentActivity = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">

      <h2 className="text-2xl font-semibold mb-6">
        Recent Activity
      </h2>

      <div className="space-y-4">

        <div className="border-b pb-3">
          Worker Rahul added
        </div>

        <div className="border-b pb-3">
          Payment of ₹15,000 completed
        </div>

        <div className="border-b pb-3">
          New business registered
        </div>

      </div>

    </div>
  );
};

export default RecentActivity;