import {
  LayoutDashboard,
  Users,
  CreditCard,
  Settings,
} from "lucide-react";

const Sidebar = () => {

  return (

    <div className="w-72 bg-[#081028] text-white min-h-screen p-6 relative z-20">

      {/* LOGO */}
      <h1 className="text-5xl font-extrabold mb-12 tracking-wide">
        FairFundz
      </h1>

      {/* MENU */}
      <div className="space-y-6">

        <div className="flex items-center gap-3 text-lg hover:text-blue-400 cursor-pointer transition">

          <LayoutDashboard size={24} />

          <span>Dashboard</span>

        </div>

        <div className="flex items-center gap-3 text-lg hover:text-blue-400 cursor-pointer transition">

          <Users size={24} />

          <span>Workers</span>

        </div>

        <div className="flex items-center gap-3 text-lg hover:text-blue-400 cursor-pointer transition">

          <CreditCard size={24} />

          <span>Payments</span>

        </div>

        <div className="flex items-center gap-3 text-lg hover:text-blue-400 cursor-pointer transition">

          <Settings size={24} />

          <span>Settings</span>

        </div>

      </div>

    </div>
  );
};

export default Sidebar;