import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import {
  CalendarDays,
  Download,
  Edit,
  MoreVertical,
  Trash2,
  Upload,
} from "lucide-react";
import { dummyAttendanceRecords, dummyEmployees } from "../../assets/assets";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import StatCard from "../../components/Attendence/StatCard";

import Table from "./../../components/Table";
import Button from "../../components/Button";

const ViewAttendence = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [openActionMenu, setOpenActionMenu] = useState(null);

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

  // ✅ Define table columns
  const columns = [
    "Select",
    "Date",
    "Comments",
    "Check In",
    "Check Out",
    "Break",
    "IDLE Time",
    "Work Hrs",
    "Status",
    "Action",
  ];

  // ✅ Define renderRow function
  const renderRow = (att, index) => {
    const isLate = att.status === "Late";
    const statusLabel = isLate ? "Late" : "On Time";
    const statusColor = isLate ? "bg-red-600" : "bg-green-500";

    return (
      <>
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
              setOpenActionMenu(openActionMenu === att.id ? null : att.id);
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
      </>
    );
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="border-b border-black/30 px-4 py-6 flex items-center gap-3 text-2xl font-semibold">
        <img
          src="/notifi.png"
          alt="back"
          onClick={() => navigate("/attendance")}
          className="cursor-pointer"
        />
        <h1>Attendance</h1>
      </div>

      {/* Top bar */}
      <div className="px-[39px] pt-[26px] flex items-center justify-between">
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
          <Button
            label={"Export"}
            icon={Upload}
            onClick={() => navigate(`/export-attendance/${id}`)}
          />

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

      {/* Stats */}
      <div className="px-[39px] pt-[26px] flex items-center gap-2">
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

      {/* ✅ Table using reusable component */}
      <div className="px-[39px] pt-[26px]">
        <Table columns={columns} data={attendance} renderRow={renderRow} />
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
