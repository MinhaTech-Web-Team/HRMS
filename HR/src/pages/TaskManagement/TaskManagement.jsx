import React, { useState } from "react";
import { useToggle } from "../../context/Toggle";
import { useNavigate } from "react-router-dom";
import { Download, Search } from "lucide-react";
import { CgDesignmodo } from "react-icons/cg";
import { FaLaptopCode } from "react-icons/fa";
import { MdDesignServices } from "react-icons/md";
import Designer from "../../components/TaskManager/Designer";
import Developer from "../../components/TaskManager/Developer";

const TaskManagement = () => {
  const { toggleSidebar } = useToggle();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("designer");

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full border-b">
        <div className="px-4 py-6 flex items-center gap-3 font-semibold text-3xl tracking-tighter">
          <img onClick={toggleSidebar} src="/toggle.png" alt="" />
          <h1 className="text-[#09182B]">Task Management</h1>
        </div>
      </div>

      {/* Top Bar with Tabs + Search + Export */}
      <div className="px-6 py-4 flex justify-between items-center ">
        {/* Tabs */}
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab("designer")}
            className={`flex items-center gap-2 text-[16px] font-semibold ${
              activeTab === "designer"
                ? "text-[#0E9EE7] border-b-3 border-[#0E9EE7]"
                : "text-gray-500 hover:text-[#0E9EE7]"
            }`}
          >
            <MdDesignServices size={22} />
            Designer
          </button>
          <button
            onClick={() => setActiveTab("developer")}
            className={`flex items-center gap-2 text-[16px] font-semibold ${
              activeTab === "developer"
                ? "text-[#0E9EE7] border-b-3 border-[#0E9EE7]"
                : "text-gray-500 hover:text-[#0E9EE7]"
            }`}
          >
            <FaLaptopCode size={22} />
            Developer
          </button>
        </div>

        {/* Search + Export */}
        <div className="flex items-center gap-2">
          {/* Search Box */}
          <div className="w-64 px-4 py-3 bg-neutral-200/30 rounded-[5px] inline-flex justify-start items-center gap-2.5">
            <Search size={20} className="text-zinc-900 shrink-0 block" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 bg-transparent outline-none text-zinc-900/50 text-base placeholder:text-zinc-900/50"
            />
          </div>

          {/* Export Button */}
          <button className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-lg px-5 py-3 flex items-center gap-2">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === "designer" ? <Designer /> : <Developer />}
      </div>
    </div>
  );
};

export default TaskManagement;
