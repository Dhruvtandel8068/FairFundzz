import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Settings,
  FileText,
} from "lucide-react";

const Navbar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={22} />,
    },
    {
      name: "Workers",
      path: "/workers",
      icon: <Users size={22} />,
    },
    {
      name: "Payments",
      path: "/payments",
      icon: <CreditCard size={22} />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <FileText size={22} />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings size={22} />,
    },
  ];

  return (
    <div className="w-[220px] min-h-screen bg-[#020B33] text-white fixed left-0 top-0 z-50">
      <div className="p-6 text-4xl font-bold">
        FairFundz
      </div>

      <div className="mt-8 flex flex-col gap-2 px-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-4 rounded-xl text-xl transition-all duration-200 ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-blue-500/20"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Navbar;