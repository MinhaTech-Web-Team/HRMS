import React, { useState, useEffect } from "react";
import {
  Filter,
  MoreVertical,
  PlusCircle,
  Search,
  Eye,
  Edit,
  Trash2,
  Upload,
} from "lucide-react";
import { dummyEmployees } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { BiExport } from "react-icons/bi";
import FilterModal from "../../components/employee/FilterModal";
import { useToggle } from "../../context/Toggle";

const EmployeeManagement = () => {
  const [OpenFilter, setOpenFilter] = useState(false);
  const [openActionMenu, setOpenActionMenu] = useState(null); // Track which action menu is open
  const { toggleSidebar } = useToggle();
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".action-dropdown")) {
        setOpenActionMenu(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full border-b">
        <div className="px-4 py-6 flex items-center gap-3 font-semibold text-2xl md:text-3xl tracking-tighter">
          <img
            onClick={toggleSidebar}
            src="/toggle.png"
            alt="Toggle Sidebar"
            className="w-6 h-6 cursor-pointer"
          />
          <h1>Employee Management</h1>
        </div>
      </div>

      {/* Top Bar */}
      <div className="px-4 md:px-[39px] py-5 flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        {/* Add New Employee Button */}
        <div
          onClick={() => navigate("/addemployee")}
          className="py-3 px-7 bg-sky-500 rounded-lg inline-flex justify-center items-center gap-2.5 cursor-pointer w-full md:w-auto"
        >
          <PlusCircle className="text-white w-6 h-6" />
          <span className="text-white text-base font-bold">New Employees</span>
        </div>

        {/* Search & Filter & Export */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="w-full sm:w-64 px-4 py-3 bg-neutral-200/30 rounded-[5px]">
            <div className="flex items-center gap-2.5">
              <Search size={20} className="text-zinc-900" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-zinc-900/50 text-base placeholder:text-zinc-900/50 w-full"
              />
            </div>
          </div>

          {/* Filter */}
          <div className="relative">
            <button
              onClick={() => setOpenFilter(!OpenFilter)}
              className="flex items-center border border-[#0E9EE7] text-[#0E9EE7] rounded-md px-4 py-2 hover:bg-blue-50 w-full sm:w-auto justify-center"
            >
              <Filter className="h-5 w-5 mr-2" />
              <span>Filter</span>
            </button>
            {OpenFilter && <FilterModal />}
          </div>

          {/* Export */}
          <button className="flex items-center bg-[#0E9EE7] text-white rounded-md px-4 py-2 hover:bg-blue-600 w-full sm:w-auto justify-center">
            <BiExport className="h-5 w-5 mr-2" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="px-2 md:px-[37px] overflow-x-auto">
        <div className="bg-[#E3E3E3]/15 rounded-lg p-4 md:p-[37px] space-y-3 min-w-[900px]">
          {/* Table Header */}
          <div className="grid grid-cols-8 gap-6 bg-[#EAEAEA] rounded-lg px-5 py-6 font-bold text-[#09182B] text-[15px] md:text-[16px]">
            <div>Select</div>
            <div>Employee Name</div>
            <div>Employee ID</div>
            <div>Department</div>
            <div>Designation</div>
            <div>Type</div>
            <div>Status</div>
            <div>Action</div>
          </div>

          {/* Table Rows */}
          {dummyEmployees.map((emp, index) => (
            <div
              key={emp.id}
              className={`grid grid-cols-8 gap-6 items-center rounded-lg px-[18px] py-[21px] shadow-sm hover:bg-gray-100 text-[#09182B] text-[14px] md:text-[15px] ${
                index % 2 === 1 ? "bg-[#EAEAEA]/50" : "bg-white"
              }`}
            >
              <div>
                <input type="checkbox" />
              </div>
              <div className="font-medium whitespace-nowrap">{emp.name}</div>
              <div>{emp.employeeId}</div>
              <div>{emp.department}</div>
              <div>{emp.designation}</div>
              <div>{emp.type}</div>
              <div>
                <span className="bg-[#00B172] text-white px-3 py-1 rounded-md text-xs md:text-sm">
                  {emp.status}
                </span>
              </div>

              {/* Action Button + Dropdown */}
              <div className="relative action-dropdown">
                <button
                  onClick={() =>
                    setOpenActionMenu((prev) =>
                      prev === emp.id ? null : emp.id
                    )
                  }
                  className="p-2 rounded hover:bg-gray-200"
                >
                  <MoreVertical size={18} />
                </button>

                {openActionMenu === emp.id && (
                  <div className="absolute top-full right-0 mt-2 w-40 md:w-44 bg-white rounded-xl shadow-xl z-50">
                    <ul className="py-2 text-sm text-[#09182B] font-medium">
                      <li
                        onClick={() => navigate(`/viewemployee/${emp.id}`)}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </li>
                      <li
                        onClick={() => navigate(`/editemployee/${emp.id}`)}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </li>
                      <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </li>
                      <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <Upload className="w-4 h-4" />
                        Export
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement;
