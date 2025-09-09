import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  CalendarDays,
  ClipboardList,
  BarChart3,
  Megaphone,
  UserPlus,
  DollarSign,
  FileSpreadsheet,
  LogOut, // ✅ use LogOut instead of DoorClosed for exact same icon
} from "lucide-react";
import { useToggle } from "../context/Toggle";

const Sidebar = () => {
  const menuItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/" },
    {
      label: "Employee Management",
      icon: <Users size={20} />,
      path: "/employees",
    },
    {
      label: "Attendance Management",
      icon: <CalendarCheck size={20} />,
      path: "/attendance",
    },
    {
      label: "Leaves Management",
      icon: <CalendarDays size={20} />,
      path: "/leaves",
    },
    {
      label: "Project Assign",
      icon: <ClipboardList size={20} />,
      path: "/projects",
    },
    {
      label: "Performance Review",
      icon: <BarChart3 size={20} />,
      path: "/performance",
    },
    {
      label: "Announcement Board",
      icon: <Megaphone size={20} />,
      path: "/announcements",
    },
    {
      label: "Interns Management",
      icon: <UserPlus size={20} />,
      path: "/interns",
    },
    {
      label: "Payroll Management",
      icon: <DollarSign size={20} />,
      path: "/payroll",
    },
    {
      label: "Company Expense Management",
      icon: <FileSpreadsheet size={20} />,
      path: "/expenses",
    },
  ];

  const { isSidebarOpen } = useToggle();

  if (!isSidebarOpen) return null;
  return (
    <div className="w-[270px] min-h-screen bg-[#0B1B2B] flex flex-col p-4 text-white">
      {/* Logo */}
      <div className="flex">
        <img src="/MinhaTech.png" alt="Logo" className="w-[170px] -mb-6" />
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-1">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200  ${
                isActive
                  ? "bg-[#0E9EE7] text-white"
                  : "text-gray-300 hover:bg-[#1a2b3c]"
              }`
            }
          >
            {item.icon}
            <span className="text-sm font-medium font-sans">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* HR Profile */}
      <div className=" p-3 h-full  flex items-end gap-4">
        <img src="/HR.jpeg" alt="hr" className="w-10 h-10 rounded-xl" />
        <div>
          <h1 className="font-bold text-[16px]">Namra</h1>
          <p className="font-light text-xs">HR Manager</p>
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-2">
        <button className="mt-6 w-52 h-11 bg-[#0E9EE7] text-white rounded-lg flex items-center gap-2 font-semibold hover:bg-sky-600 transition p-3">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
