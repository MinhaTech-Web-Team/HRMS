import React, { useEffect, useState } from "react";
import { MoreVertical, Eye, Edit, Trash2, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToggle } from "../../../context/Toggle";
import SearchBar from "../../../components/SearchBar";
import Button from "../../../components/Button";
import Table from "../../../components/Table";
import { dummyInternAttendanceRecords } from "../../../assets/assets";

const InternAttendanceManagement = () => {
  const { toggleSidebar } = useToggle();
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

  // Render each row
  const renderRow = (att) => [
    // Select
    <input type="checkbox" className="w-5 h-5" />,

    // Date
    att.date,

    // Name
    <div className="font-medium">{att.name}</div>,

    // Times
    att.timeIn || "-",
    att.timeOut || "-",
    att.breakTime || "-",
    att.idleTime || "-",
    att.workHours || "-",

    // Status
    <span
      className={`px-3 py-1 rounded-md text-sm text-white whitespace-nowrap inline-block text-center ${
        att.status === "Late" ? "bg-[#EB0016]" : "bg-[#00B172]"
      }`}
    >
      {att.status}
    </span>,

    // Action Menu
    <div className="relative action-dropdown">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpenActionMenu(openActionMenu === att.id ? null : att.id);
        }}
        className="p-2 rounded hover:bg-gray-200"
      >
        <MoreVertical size={18} />
      </button>

      {openActionMenu === att.id && (
        <div className="absolute top-full right-0 mt-2 w-30 bg-white rounded-xl shadow-xl z-50">
          <ul className="py-2 text-sm text-[#09182B] font-medium">
            <li
              onClick={() => navigate(`/intern-attendence/view/${att.id}`)}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              View
            </li>
            <li
              onClick={() => navigate(`/intern-attendence/edit/${att.id}`)}
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
    </div>,
  ];

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full border-b border-black/30">
        <div className="px-4 py-6 flex items-center gap-3 font-semibold text-2xl tracking-tighter">
          <img onClick={toggleSidebar} src="/toggle.png" alt="" />
          <h1 className="text-[#09182B]">Attendance Management</h1>
        </div>
      </div>

      {/* Top Bar */}
      <div className="px-[39px] pt-[26px] flex justify-between items-center">
        <h1 className="text-2xl text-[#09182B] font-semibold">Interns List</h1>

        <div className="flex items-center gap-2">
          {/* Search Box */}
          <SearchBar />

          {/* All Interns Button */}
          <Button
            label="All Interns"
            onClick={() => navigate("/intern-attendence/allinterns")}
          />
        </div>
      </div>

      {/* Table */}
      <div className="px-[39px] pt-[26px]">
        <Table
          columns={columns}
          data={dummyInternAttendanceRecords.records}
          renderRow={renderRow}
        />
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 px-[37px] py-6">
        <button className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100">
          1
        </button>
        <button className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100">
          2
        </button>
        <button className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100">
          3
        </button>
      </div>
    </div>
  );
};

export default InternAttendanceManagement;
