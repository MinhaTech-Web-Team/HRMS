import React, { useEffect, useState } from "react";
import {
  Search,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Upload,
  Download,
} from "lucide-react";
import { dummyAttendanceRecords } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { useToggle } from "../../context/Toggle";
import { dummyLeaves } from "./../../assets/assets";
import Button from "../../components/Button";
import SearchBar from "../../components/SearchBar";

const LeaveManagement = () => {
  ``;
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

  const columns = [
    "Select",
    "Employee Name",
    "Employee ID",
    "Department",
    "Designation",
    "Type",
    "Status",
    "Action",
  ];

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full border-b">
        <div className="px-4 py-6 flex items-center gap-3 font-semibold text-2xl tracking-tighter">
          <img onClick={toggleSidebar} src="/toggle.png" alt="" />
          <h1 className="text-[#09182B]">Leave Management</h1>
        </div>
      </div>

      {/* Top Bar */}
      <div className="px-[39px] pt-[26px] flex justify-between items-center">
        {/* All Employees Button */}

        <Button
          label={"All Employees"}
          onClick={() => navigate("/leaves-allemployees")}
        />

        <div className="flex items-center gap-2">
          {/* Search Box */}
          <SearchBar />
          <Button label={"Export"} icon={Download} />
        </div>
      </div>

      {/* Table */}
      <div className="px-[39px] pt-[26px]">
        <div className="bg-[#E3E3E3]/15 rounded-lg p-[37px] space-y-3 overflow-x-auto">
          <table className="w-full min-w-[1024px] text-left text-[#09182B] text-[15px] border-separate border-spacing-y-[13px]">
            {/* Table Head */}
            <thead>
              <tr className="bg-[#EAEAEA] rounded-lg text-[16px] font-bold">
                <th className="px-5 py-6">Select</th>
                <th className="px-5 py-6">Date</th>
                <th className="px-5 py-6">Employee Name</th>
                <th className="px-5 py-6">Department</th>
                <th className="px-5 py-6">Leave Type</th>
                <th className="px-5 py-6">Reason</th>
                <th className="px-5 py-6">Application</th>
                <th className="px-5 py-6">Status</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {dummyLeaves.map((att, index) => (
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
                  <td className="px-[18px] py-[21px]">
                    {att.department || "-"}
                  </td>
                  <td className="px-[18px] py-[21px]">
                    {att.leaveType || "-"}
                  </td>
                  <td className="px-[18px] py-[21px]">{att.reason || "-"}</td>

                  <td
                    onClick={() => navigate("/leave-application")}
                    className="px-[18px] py-[21px]"
                  >
                    <span className="text-[#0E9EE7]  border-b-2 cursor-pointer ">
                      Read
                    </span>
                  </td>
                  <td className="px-[18px] py-[21px]">
                    <span
                      className={`px-3 py-1 rounded-md text-sm text-white whitespace-nowrap inline-block text-center ${
                        att.status === "Waiting"
                          ? "bg-[#0E9EE7]"
                          : "bg-[#00B172]"
                      }`}
                    >
                      {att.status}
                    </span>
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

export default LeaveManagement;

//  id: 1,
// date: "2025-09-10 to 2025-09-12",
// employeeId: "EMP001",
// name: "Namra Sajjad",
// department: "HR",
// leaveType: "Casual Leave",
// reason: "Personal commitments",
// application: "I am writing to request a casual leave from 10th to 12th September due to personal commitments.",
// status: "Approved"
