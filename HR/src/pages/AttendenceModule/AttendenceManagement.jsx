import React, { useEffect, useState } from "react";
import { Search, MoreVertical, Eye, Edit, Trash2, Upload } from "lucide-react";
import { dummyAttendanceRecords } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { useToggle } from "../../context/Toggle";

const AttendanceManagement = () => {
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
          <button
            onClick={() => navigate("/allemployees")}
            className="bg-[#0E9EE7] px-6 py-3 rounded-lg cursor-pointer text-white text-base font-bold hover:bg-sky-600"
          >
            All Employees
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="px-[37px]">
        <div className="bg-[#E3E3E3]/15 rounded-lg p-[37px] space-y-3 overflow-x-auto">
          <table className="w-full min-w-[1024px] text-left text-[#09182B] text-[15px] border-separate border-spacing-y-[13px]">
            {/* Table Head */}
            <thead>
              <tr className="bg-[#EAEAEA] rounded-lg text-[16px] font-bold">
                <th className="px-5 py-6">Select</th>
                <th className="px-5 py-6">Date</th>
                <th className="px-5 py-6">Employee Name</th>
                <th className="px-5 py-6">Check In</th>
                <th className="px-5 py-6">Check Out</th>
                <th className="px-5 py-6">Break</th>
                <th className="px-5 py-6">IDLE Time</th>
                <th className="px-5 py-6">Work Hrs</th>
                <th className="px-5 py-6">Status</th>
                <th className="px-5 py-6">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {dummyAttendanceRecords.records.map((att, index) => (
                <tr
                  key={att.id}
                  className={`rounded-lg shadow-sm relative ${
                    index % 2 === 1 ? "bg-[#EAEAEA]/50" : "bg-white"
                  }`}
                >
                  <td className="px-[18px] py-[21px]">
                    <input type="checkbox" className="w-5 h-5" />
                  </td>
                  <td className="px-[18px] py-[21px]">{att.date}</td>
                  <td className="px-[18px] py-[21px] font-medium">
                    {att.name}
                  </td>
                  <td className="px-[18px] py-[21px]">{att.timeIn || "-"}</td>
                  <td className="px-[18px] py-[21px]">{att.timeOut || "-"}</td>
                  <td className="px-[18px] py-[21px]">
                    {att.breakTime || "-"}
                  </td>
                  <td className="px-[18px] py-[21px]">{att.idleTime || "-"}</td>
                  <td className="px-[18px] py-[21px]">
                    {att.workHours || "-"}
                  </td>
                  <td className="px-[18px] py-[21px]">
                    <span
                      className={`px-3 py-1 rounded-md text-sm text-white whitespace-nowrap inline-block text-center ${
                        att.status === "Late" ? "bg-[#EB0016]" : "bg-[#00B172]"
                      }`}
                    >
                      {att.status}
                    </span>
                  </td>
                  <td className="px-[18px] py-[21px] relative action-dropdown">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenActionMenu(
                          openActionMenu === att.id ? null : att.id
                        );
                      }}
                      className="p-2 rounded hover:bg-gray-200"
                    >
                      <MoreVertical size={18} />
                    </button>

                    {openActionMenu === att.id && (
                      <div className="absolute top-full right-0 mt-2 w-30 bg-white rounded-xl shadow-xl z-50">
                        <ul className="py-2 text-sm text-[#09182B] font-medium">
                          <li
                            onClick={() =>
                              navigate(`/view-attendance/${att.id}`)
                            }
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </li>
                          <li
                            onClick={() =>
                              navigate(`/edit-attendance/${att.id}`)
                            }
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
