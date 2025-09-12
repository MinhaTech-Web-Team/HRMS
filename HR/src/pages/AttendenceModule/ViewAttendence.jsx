import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { dummyAttendanceRecords, dummyEmployees } from "../../assets/assets";
import {
  CalendarDays,
  Download,
  Edit,
  MoreVertical,
  Trash2,
  Upload,
} from "lucide-react"; // ✅ icons

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import StatCard from "../../components/Attendence/StatCard"; // StatCard component

const ViewAttendence = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [openActionMenu, setOpenActionMenu] = useState(null);

  // default range: today → today
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    const getEmployeesData = () => {
      const emp = dummyEmployees.find((e) => e.id === parseInt(id));

      if (emp) {
        setEmployee(emp);

        const records = dummyAttendanceRecords.records.filter(
          (att) => att.employeeId === emp.employeeId
        );
        setAttendance(records);
      }
    };

    getEmployeesData();
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
        <h1>Attendance</h1>
      </div>

      {/* Top bar (employee info + date range + export) */}
      <div className="pt-5 px-8 flex items-center justify-between">
        {/* Employee info */}
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

        {/* Date range + export */}
        <div className="flex items-center gap-3 relative">
          {/* Date Range Picker Button */}
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

          {/* Export Button */}
          <button
            onClick={() => navigate(`/export-attendance/${id}`)}
            className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-lg px-4 py-2 flex items-center gap-2"
          >
            <Download size={16} />
            Export
          </button>

          {showDatePicker && (
            <div className="absolute top-12 right-0 z-50 shadow-lg">
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDateRange([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
              />
            </div>
          )}
        </div>
      </div>

      <div className="pt-5 px-8 flex items-center gap-2">
        <StatCard
          title={"Absents"}
          value={dummyAttendanceRecords.summary.absents}
        />
        <StatCard
          title={"Leaves"}
          value={dummyAttendanceRecords.summary.leaves}
        />
        <StatCard
          title={"Late"}
          value={dummyAttendanceRecords.summary.lateHours}
        />
        <StatCard
          title={"Overtime Hours"}
          value={dummyAttendanceRecords.summary.overtimeHours}
        />
      </div>

      {/* Table */}
      <div className="pt-6 ">
        <div className="bg-[#E3E3E3]/15 rounded-lg p-[37px] space-y-3 overflow-visible">
          {/* Header Row */}
          <div className="grid grid-cols-10 gap-6 bg-[#EAEAEA] rounded-lg px-5 py-6 font-bold text-[#09182B] text-[16px]">
            <div>Select</div>
            <div>Date</div>
            <div>Comments</div>
            <div>Check In</div>
            <div>Check Out</div>
            <div>Break</div>
            <div>IDLE Time</div>
            <div>Work Hrs</div>
            <div>Status</div>
            <div>Action</div>
          </div>

          {/* Rows */}
          {attendance.map((att, index) => {
            const isLate = att.status === "Late";
            const statusLabel = isLate ? "Late" : "On Time";
            const statusColor = isLate ? "bg-red-600" : "bg-green-500";

            return (
              <div
                key={att.id}
                className={`grid grid-cols-10 gap-6 items-center rounded-lg px-[18px] py-[21px] shadow-sm text-[#09182B] text-[15px] relative ${
                  index % 2 === 1 ? "bg-[#EAEAEA]/50" : "bg-white"
                }`}
              >
                <div>
                  <input type="checkbox" className="w-5 h-5" />
                </div>
                <div>{format(new Date(att.date), "yy-MM-dd")}</div>
                <div>{att.comments || "----------"}</div>
                <div>{att.timeIn || "-"}</div>
                <div>{att.timeOut || "-"}</div>
                <div>{att.breakTime || "-"}</div>
                <div>{att.idleTime || "-"}</div>
                <div>{att.workHours || "-"}</div>
                <div>
                  <span
                    className={`px-3 py-1 rounded-md text-sm text-white ${statusColor}`}
                  >
                    {statusLabel}
                  </span>
                </div>

                {/* Action Menu */}
                <div className="relative">
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
                    <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-xl shadow-xl z-50">
                      <ul className="py-2 text-sm text-[#09182B] font-medium">
                        <li
                          onClick={() => navigate(`/edit-attendance/${att.id}`)}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </li>
                        <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </li>
                        <li
                          onClick={() => navigate(`/export-attendance/${id}`)}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          <Upload className="w-4 h-4" />
                          Export
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
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

export default ViewAttendence;
