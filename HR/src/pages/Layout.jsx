// src/pages/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import SidebarCollapsed from "../components/SidebarCollapsed";
import { useToggle } from "../context/Toggle";
import { Menu } from "lucide-react";

const Layout = () => {
  const { isSidebarOpen, toggleSidebar } = useToggle();

  return (
    <div className="flex">
      {/* Sidebar */}
      {isSidebarOpen ? <Sidebar /> : <SidebarCollapsed />}

      {/* Main Content */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
