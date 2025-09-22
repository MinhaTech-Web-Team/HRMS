import React from "react";
import { useToggle } from "../../context/Toggle";
import { useNavigate } from "react-router-dom";
import { Download, Search } from "lucide-react";

const TaskManagement = () => {
  const { toggleSidebar } = useToggle();
  const navigate = useNavigate();
  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full border-b">
        <div className="px-4 py-6 flex items-center gap-3 font-semibold text-3xl tracking-tighter">
          <img onClick={toggleSidebar} src="/toggle.png" alt="" />
          <h1 className="text-[#09182B]">Performance Review</h1>
        </div>
      </div>
      {/* Top Bar */}
      // the developer designer come here
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

        <button className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-lg px-5 py-3 flex items-center gap-2">
          <Download size={16} />
          Export
        </button>
      </div>
    </div>
  );
};

export default TaskManagement;
