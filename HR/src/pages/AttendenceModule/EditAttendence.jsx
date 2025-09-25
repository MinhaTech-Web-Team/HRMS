// src/pages/Attendance/EditAttendence.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyAttendanceRecords, dummyEmployees } from "../../assets/assets";
import { format } from "date-fns";
import Table from "../../components/Table";

const EditAttendence = () => {
  const [employee, setEmployee] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

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

  // ✅ Render each row
  const renderRow = (att) => {
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
        <div>
          <button className="px-3 py-1 rounded bg-[#0E9EE7] text-white text-sm">
            Save
          </button>
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
        <h1>Edit Attendance</h1>
      </div>

      {/* Employee Info */}
      <div className="px-[39px] pt-[26px] flex items-center">
        <img
          src={employee?.image || "/default-avatar.png"}
          className="w-[60px] h-[60px] rounded-full object-cover"
          alt={employee?.name}
        />
        <div className="flex flex-col ml-3">
          <h2 className="font-medium text-lg">{employee?.name}</h2>
          <p className="text-sm text-gray-500">{employee?.designation}</p>
        </div>
      </div>

      {/* ✅ Table */}
      <div className="px-[39px] pt-[26px]">
        <Table columns={columns} data={attendance} renderRow={renderRow} />
      </div>
    </div>
  );
};

export default EditAttendence;
