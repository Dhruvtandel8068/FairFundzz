import { NavLink } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import { FolderOpen } from "lucide-react";
import { WalletCards } from "lucide-react";
import { UserCog } from "lucide-react";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Settings,
  FileText,
  CalendarCheck,
  Bell,
  ReceiptText,
} from "lucide-react";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user?.role || "worker";

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={22} />,
      roles: ["admin", "manager", "worker"],
    },
    {
      name: "Workers",
      path: "/workers",
      icon: <Users size={22} />,
      roles: ["admin", "manager"],
    },
    {
      name: "Attendance",
      path: "/attendance",
      icon: <CalendarCheck size={22} />,
      roles: ["admin", "manager"],
    },
    {
      name: "Payments",
      path: "/payments",
      icon: <CreditCard size={22} />,
      roles: ["admin", "manager"],
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <FileText size={22} />,
      roles: ["admin"],
    },
    {
      name: "Payslips",
      path: "/payslips",
      icon: <ReceiptText size={22} />,
      roles: ["admin", "manager", "worker"],
    },
    {
      name: "Notifications",
      path: "/notifications",
      icon: <Bell size={22} />,
      roles: ["admin", "manager", "worker"],
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings size={22} />,
      roles: ["admin", "manager", "worker"],
    },
    {
      name: "Leaves",
      path: "/leaves",
      icon: <CalendarDays size={17} />,
      roles: ["admin", "manager", "worker"],
    },
    {
      name: "Documents",
      path: "/documents",
      icon: <FolderOpen size={22} />,
      roles: ["admin", "manager", "worker"],
    },
    {
      name: "Payroll",
      path: "/payroll",
      icon: <WalletCards size={22} />,
      roles: ["admin", "manager"],
    },
    {
      name: "Users",
      path: "/users",
      icon: <UserCog size={22} />,
      roles: ["admin"],
    },
  ];

  const visibleItems = menuItems.filter((item) =>
    item.roles.includes(role)
  );

  return (
    <div className="w-[220px] min-h-screen bg-[#020B33] text-white fixed left-0 top-0 z-50">
      <div className="p-6 text-4xl font-bold">
        FairFundz
      </div>

      <div className="px-6 text-sm text-blue-200">
        Role: {role.toUpperCase()}
      </div>

      <div className="mt-8 flex flex-col gap-2 px-4">
        {visibleItems.map((item) => (
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