import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyAttendanceRecords, dummyEmployees } from "../../assets/assets";
import { format } from "date-fns";
import { MoreVertical } from "lucide-react";

const EditAttendence = () => {
  const [employee, setEmployee] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [openActionMenu, setOpenActionMenu] = useState(null);
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
        <h1>Edit Attendance</h1>
      </div>

      {/* Top bar (employee info) */}
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
      </div>

      {/* Table */}
      <div className="pt-6">
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
                <div className=" ">
                  <button className="p-2 rounded  bg-[#0E9EE7] text-white h-[25px] flex items-center justify-center">
                    save
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EditAttendence;
