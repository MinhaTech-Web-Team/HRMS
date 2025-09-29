// src/pages/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import SidebarCollapsed from "../components/SidebarCollapsed";
import { useToggle } from "../context/Toggle";

const Layout = () => {
  const { isSidebarOpen } = useToggle();

  return (
    <div className="flex ">
      {/* Sidebar */}
      {isSidebarOpen ? <Sidebar /> : <SidebarCollapsed />}

      {/* Main Content */}
      <div
        className={`flex-1 h-screen overflow-y-scroll    ${
          isSidebarOpen ? "ml-0" : "ml-0"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
