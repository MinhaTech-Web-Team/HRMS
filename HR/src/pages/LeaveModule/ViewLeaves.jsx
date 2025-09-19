import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { dummyLeaves, dummyEmployees } from "../../assets/assets";
import { CalendarDays, Download } from "lucide-react";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const ViewLeaves = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [leaves, setLeaves] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    const emp = dummyEmployees.find((e) => e.id === parseInt(id));

    if (emp) {
      setEmployee(emp);
      const records = dummyLeaves.filter(
        (leave) => leave.employeeId === emp.employeeId
      );
      setLeaves(records);
    }
  }, [id]);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 px-4 py-6 flex items-center gap-3 text-2xl font-semibold">
        <img
          src="/notifi.png"
          alt="back"
          onClick={() => navigate("/attendance")}
          className="cursor-pointer"
        />
        <h1>Leave Management</h1>
      </div>

      {/* Top bar */}
      <div className="pt-5 px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={employee?.image || "/default-avatar.png"}
            className="w-[60px] h-[60px] rounded-full object-cover"
            alt={employee?.name}
          />
          <div className="flex flex-col">
            <h2 className="font-medium text-lg">{employee?.name}</h2>
            <p className="text-sm text-gray-500">{employee?.designation}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 relative">
          <button
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex items-center gap-2"
            onClick={() => setShowDatePicker((prev) => !prev)}
          >
            {`${format(dateRange[0].startDate, "MMM dd")} - ${format(
              dateRange[0].endDate,
              "MMM dd"
            )}`}
            <CalendarDays size={16} />
          </button>

          <button
            onClick={() => navigate(`/export-leaves/${id}`)}
            className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-lg px-4 py-2 flex items-center gap-2"
          >
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="px-[37px] pt-6">
        <div className="bg-[#E3E3E3]/15 rounded-lg p-[37px] space-y-3 overflow-x-auto">
          <table className="w-full min-w-[1024px] text-left text-[#09182B] text-[15px] border-separate border-spacing-y-[13px]">
            <thead>
              <tr className="bg-[#EAEAEA] rounded-lg text-[16px] font-bold">
                <th className="px-5 py-6">Select</th>
                <th className="px-5 py-6">Date</th>
                <th className="px-5 py-6">Leave Type</th>
                <th className="px-5 py-6">Reason</th>
                <th className="px-5 py-6">Application</th>
                <th className="px-5 py-6">Status</th>
              </tr>
            </thead>

            <tbody>
              {leaves.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No leave records found for this employee.
                  </td>
                </tr>
              ) : (
                leaves.map((leave, index) => (
                  <tr
                    key={leave.id}
                    className={`rounded-lg shadow-sm relative ${
                      index % 2 === 1 ? "bg-[#EAEAEA]/50" : "bg-white"
                    }`}
                  >
                    <td className="px-[18px] py-[21px]">
                      <input type="checkbox" className="w-5 h-5" />
                    </td>
                    <td className="px-[18px] py-[21px]">{leave.date}</td>
                    <td className="px-[18px] py-[21px]">
                      {leave.leaveType || "-"}
                    </td>
                    <td className="px-[18px] py-[21px]">
                      {leave.reason || "-"}
                    </td>
                    <td
                      onClick={() => navigate("/leave-application")}
                      className="px-[18px] py-[21px] cursor-pointer"
                    >
                      <span className="text-[#0E9EE7] border-b-2">Read</span>
                    </td>
                    <td className="px-[18px] py-[21px]">
                      <span
                        className={`px-3 py-1 rounded-md text-sm text-white whitespace-nowrap inline-block text-center ${
                          leave.status === "Waiting"
                            ? "bg-[#0E9EE7]"
                            : "bg-[#00B172]"
                        }`}
                      >
                        {leave.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 px-[37px] py-6">
        {[1, 2, 3].map((page) => (
          <button
            key={page}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ViewLeaves;
