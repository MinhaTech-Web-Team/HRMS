// src/pages/Attendance/ViewInternAttendence.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { CalendarDays, Edit, Trash2, Upload, Eye } from "lucide-react";

import {
  dummyInternAttendanceRecords,
  dummyInterns,
} from "../../../assets/assets";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import StatCard from "../../../components/Attendence/StatCard";
import Table from "../../../components/Table";
import Button from "../../../components/Button";
import Pagination from "../../../components/Pagination";
import ActionMenu from "../../../components/ActionMenu"; // ✅ Import reusable menu

const ViewInternAttendence = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [intern, setIntern] = useState(null);
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
    const getInternData = () => {
      const int = dummyInterns.find((i) => i.id === parseInt(id));

      if (int) {
        setIntern(int);

        const records = dummyInternAttendanceRecords.records.filter(
          (att) => att.internId === int.professionalInfo.employeeId
        );
        setAttendance(records);
      }
    };

    getInternData();
  }, [id]);

  // ✅ Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const totalPages = Math.ceil(attendance.length / rowsPerPage);
  const paginatedData = attendance.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // ✅ Table columns
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

  // ✅ Define ActionMenu items
  const internActions = [
    {
      title: "View",
      icon: Eye,
      onClick: (att) => navigate(`/intern-attendance/view/${att.id}`),
    },
    {
      title: "Edit",
      icon: Edit,
      onClick: (att) => navigate(`/edit-intern-attendance/${att.id}`),
    },
    {
      title: "Delete",
      icon: Trash2,
      onClick: (att) => console.log("Delete", att.id),
    },
    {
      title: "Export",
      icon: Upload,
      onClick: (att) => navigate(`/export-intern-attendance/${id}`),
    },
  ];

  // ✅ Render Row
  const renderRow = (att) => {
    const isLate = att.status === "Late";
    const isAbsent = att.status === "Absent";
    const statusLabel = isAbsent ? "Absent" : isLate ? "Late" : "On Time";
    const statusColor = isAbsent
      ? "bg-gray-500"
      : isLate
      ? "bg-red-600"
      : "bg-green-500";

    return [
      <input key={`select-${att.id}`} type="checkbox" className="w-4 h-4" />,
      format(new Date(att.date), "yy-MM-dd"),
      att.comments || "----------",
      att.timeIn || "-",
      att.timeOut || "-",
      att.breakTime || "-",
      att.idleTime || "-",
      att.workHours || "-",
      <span
        key={`status-${att.id}`}
        className={`px-3 py-1 rounded-md text-sm text-white ${statusColor}`}
      >
        {statusLabel}
      </span>,
      // ✅ Use reusable ActionMenu instead of manual dropdown
      <ActionMenu
        key={`actions-${att.id}`}
        emp={att}
        openActionMenu={openActionMenu}
        setOpenActionMenu={setOpenActionMenu}
        actions={internActions}
      />,
    ];
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="border-b border-black/30 px-4 py-6 flex items-center gap-3 text-2xl font-semibold">
        <img
          src="/notifi.png"
          alt="back"
          onClick={() => navigate("/intern-attendence")}
          className="cursor-pointer"
        />
        <h1>Intern Attendance</h1>
      </div>

      {/* Top bar */}
      <div className="px-[39px] pt-[26px] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={intern?.image || "/default-avatar.png"}
            className="w-[60px] h-[60px] rounded-full object-cover"
            alt={intern?.internName}
          />
          <div className="flex flex-col">
            <h2 className="font-medium text-lg">{intern?.internName}</h2>
            <p className="text-sm text-gray-500">{intern?.designation}</p>
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
            onClick={() => navigate(`/export-intern-attendance/${id}`)}
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
          value={dummyInternAttendanceRecords.summary.absents}
        />
        <StatCard
          title={"Leaves"}
          value={dummyInternAttendanceRecords.summary.leaves}
        />
        <StatCard
          title={"Late"}
          value={dummyInternAttendanceRecords.summary.lateHours}
        />
        <StatCard
          title={"Overtime Hours"}
          value={dummyInternAttendanceRecords.summary.overtimeHours}
        />
      </div>

      {/* Table */}
      <div className="px-[39px] pt-[26px]">
        <Table columns={columns} data={paginatedData} renderRow={renderRow} />
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

export default ViewInternAttendence;
