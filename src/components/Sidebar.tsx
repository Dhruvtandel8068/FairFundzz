import {
  LayoutDashboard,
  Users,
  CreditCard,
  Settings,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";

const Sidebar = () => {

  const { user } = useAuth();

  return (

    <div className="w-72 bg-[#081028] text-white min-h-screen p-6 relative z-20">

      {/* LOGO */}
      <h1 className="text-5xl font-extrabold mb-12 tracking-wide">
        FairFundz
      </h1>

      {/* MENU */}
      <div className="space-y-6">

        {/* DASHBOARD */}
        <Link
          to="/dashboard"
          className="flex items-center gap-3 text-lg hover:text-blue-400 transition"
        >

          <LayoutDashboard size={24} />

          <span>Dashboard</span>

        </Link>

        {/* WORKERS */}
        {(user?.role === "admin" ||
          user?.role === "manager") && (

          <Link
            to="/workers"
            className="flex items-center gap-3 text-lg hover:text-blue-400 transition"
          >

            <Users size={24} />

            <span>Workers</span>

          </Link>

        )}

        {/* PAYMENTS */}
        {user?.role === "admin" && (

          <Link
            to="/payments"
            className="flex items-center gap-3 text-lg hover:text-blue-400 transition"
          >

            <CreditCard size={24} />

            <span>Payments</span>

          </Link>

        )}

        {/* SETTINGS */}
        <Link
          to="/settings"
          className="flex items-center gap-3 text-lg hover:text-blue-400 transition"
        >

          <Settings size={24} />

          <span>Settings</span>

        </Link>

      </div>

    </div>
  );
};

export default Sidebar;