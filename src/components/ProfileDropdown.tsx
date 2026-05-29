import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleProfile = () => {
    setOpen(false);
    navigate("/settings");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const closeDropdown = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", closeDropdown);

    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="bg-white shadow-sm rounded-2xl px-4 py-3 flex items-center gap-3 hover:shadow-md transition"
      >
        <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg">
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>

        <div className="text-left hidden md:block">
          <h3 className="font-semibold text-gray-800">
            {user?.name || "User"}
          </h3>
          <p className="text-gray-500 text-sm">
            {user?.role || "Admin"}
          </p>
        </div>

        <ChevronDown size={18} />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl overflow-hidden z-50">
          <button
            onClick={handleProfile}
            className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50"
          >
            <User size={18} />
            My Profile
          </button>

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-5 py-4 text-red-600 hover:bg-red-50"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;