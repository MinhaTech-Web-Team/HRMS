import React, { useState } from "react";
import { Search, MoreVertical } from "lucide-react";
import { dummyAttendanceRecords } from "../assets/assets"; // ✅ updated import
import { useNavigate } from "react-router-dom";
import { useToggle } from "../context/Toggle";

const AttendanceManagement = () => {
  const { toggleSidebar } = useToggle();
  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full border-b">
        <div className="px-4 py-6 flex items-center gap-3 font-semibold text-3xl tracking-tighter">
          <img onClick={toggleSidebar} src="/toggle.png" alt="" />
          <h1 className="text-[#09182B]">Attendance Management</h1>
        </div>
      </div>

      {/* Top Bar */}
      <div className="px-[39px] py-7 flex justify-between items-center">
        <h1 className="text-3xl text-[#09182B] font-semibold">Employee List</h1>

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

          {/* All Employees Button */}
          <button className="bg-[#0E9EE7] px-6 py-3 rounded-lg cursor-pointer text-white text-base font-bold hover:bg-sky-600">
            All Employees
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="px-[37px]">
        <div className="bg-[#E3E3E3]/15 rounded-lg p-[37px] space-y-3">
          {/* Header Row */}
          <div className="grid grid-cols-7 gap-6 bg-[#EAEAEA] rounded-lg px-5 py-6 font-bold text-[#09182B] text-[16px]">
            <div>Select</div>
            <div>Date</div>
            <div>Employee Name</div>
            <div>Check In</div>
            <div>Check Out</div>
            <div>Status</div>
            <div>Action</div>
          </div>

          {/* Rows from dummyAttendanceRecords */}
          {dummyAttendanceRecords.map((att, index) => (
            <div
              key={att.id}
              className={`grid grid-cols-7 gap-6 items-center rounded-lg px-[18px] py-[21px] shadow-sm text-[#09182B] text-[15px] ${
                index % 2 === 1 ? "bg-[#EAEAEA]/50" : "bg-white"
              }`}
            >
              <div>
                <input type="checkbox" className="w-5 h-5" />
              </div>
              <div>{att.date}</div>
              <div>
                <div className="font-medium">{att.name}</div>
                <div className="text-sm text-gray-500">
                  {att.designation} ({att.department})
                </div>
              </div>
              <div>{att.timeIn || "-"}</div>
              <div>{att.timeOut || "-"}</div>
              <div>
                <span
                  className={`px-3 py-1 rounded-md text-sm text-white ${
                    att.status === "Present"
                      ? "bg-[#00B172]"
                      : att.status === "Leave"
                      ? "bg-[#0E9EE7]"
                      : "bg-[#EB0016]"
                  }`}
                >
                  {att.status}
                </span>
              </div>
              <div>
                <button className="p-2 rounded hover:bg-gray-200">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
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

export default AttendanceManagement;
