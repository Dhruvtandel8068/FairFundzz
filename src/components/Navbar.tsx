import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Settings,
} from "lucide-react";

const Navbar = () => {
  const location = useLocation();

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
      name: "Settings",
      path: "/settings",
      icon: <Settings size={22} />,
    },
  ];

  return (
    <div className="w-[220px] min-h-screen bg-[#020B33] text-white fixed left-0 top-0">
      <div className="p-6 text-4xl font-bold">
        FairFundz
      </div>

      <div className="mt-8 flex flex-col gap-2 px-4">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-4 px-4 py-4 rounded-xl text-xl transition-all duration-200
            ${
              location.pathname === item.path
                ? "bg-blue-600"
                : "hover:bg-blue-500/20"
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;