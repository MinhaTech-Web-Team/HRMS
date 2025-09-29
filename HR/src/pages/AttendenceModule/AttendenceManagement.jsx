import React, { useEffect, useState } from "react";
import { MoreVertical, Eye, Edit, Trash2, Upload } from "lucide-react";
import { dummyAttendanceRecords } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { useToggle } from "../../context/Toggle";
import Table from "./../../components/Table";
import SearchBar from "../../components/SearchBar";
import Button from "../../components/Button";
import ToggleButton from "../../components/ToggleButton";
import Pagination from "../../components/Pagination";

const AttendanceManagement = () => {
  const { toggleSidebar, isSidebarOpen } = useToggle();
  const navigate = useNavigate();
  const [openActionMenu, setOpenActionMenu] = useState(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".action-dropdown")) {
        setOpenActionMenu(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const totalPages = Math.ceil(
    dummyAttendanceRecords.records.length / rowsPerPage
  );
  const paginatedData = dummyAttendanceRecords.records.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Table columns
  const columns = [
    "Select",
    "Date",
    "Employee Name",
    "Check In",
    "Check Out",
    "Break",
    "IDLE Time",
    "Work Hrs",
    "Status",
    "Action",
  ];

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full border-b border-black/30">
        <div className="px-4 py-6 flex items-center gap-3 font-semibold text-2xl tracking-tighter">
          <ToggleButton
            checked={isSidebarOpen}
            onChange={toggleSidebar}
            label=""
          />
          <h1 className="text-[#09182B]">Attendance Management</h1>
        </div>
      </div>

      {/* Top Bar */}
      <div className="px-[39px] pt-[26px] flex justify-between items-center">
        <h1 className="text-2xl text-[#09182B] font-semibold">Employee List</h1>

        <div className="flex items-center gap-2">
          {/* Search Box */}
          <SearchBar />

          {/* All Employees Button */}
          <Button
            label="All Employees"
            onClick={() => navigate("/allemployees")}
          />
        </div>
      </div>

      {/* Table */}
      <div className="px-[39px] pt-[26px]">
        <Table
          columns={columns}
          data={paginatedData}
          renderRow={(att) => [
            <input type="checkbox" className="w-4 h-4 " />,
            att.date,
            <span className="font-medium">{att.name}</span>,
            att.timeIn,
            att.timeOut,
            att.breakTime,
            att.idleTime,
            att.workHours,
            <span
              className={`px-3 py-1 rounded-md text-sm text-white whitespace-nowrap  text-center w-20 flex items-center justify-center ${
                att.status === "Late" ? "bg-[#EB0016]" : "bg-[#00B172]"
              }`}
            >
              {att.status}
            </span>,
            <div className="relative action-dropdown">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenActionMenu(openActionMenu === att.id ? null : att.id);
                }}
                className=" rounded hover:bg-gray-200"
              >
                <MoreVertical size={18} />
              </button>

              {openActionMenu === att.id && (
                <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-xl shadow-xl z-50">
                  <ul className="py-2 text-sm text-[#09182B] font-medium">
                    <li
                      onClick={() => navigate(`/view-attendance/${att.id}`)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <Eye className="w-4 h-4" /> View
                    </li>
                    <li
                      onClick={() => navigate(`/edit-attendance/${att.id}`)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <Edit className="w-4 h-4" /> Edit
                    </li>
                    <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <Trash2 className="w-4 h-4" /> Delete
                    </li>
                    <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <Upload className="w-4 h-4" /> Export
                    </li>
                  </ul>
                </div>
              )}
            </div>,
          ]}
        />
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 px-[37px] py-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default AttendanceManagement;
