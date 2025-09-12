import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyAttendanceRecords, dummyEmployees } from "../../assets/assets"; // Adjust path

const ExportAttendence = () => {
  const { id } = useParams();
  const employee = dummyEmployees.find((emp) => emp.id === Number(id));

  const name = employee.name;

  const attendance = dummyAttendanceRecords.records.filter(
    (record) => record.employeeId === employee?.employeeId
  );

  const navigate = useNavigate();

  useEffect(() => {
    console.log(name);
  }, []);

  return (
    <div>
      <div className="border-b border-gray-200 px-4 py-6 flex items-center gap-3 text-2xl font-semibold">
        <img
          src="/notifi.png"
          alt="back"
          onClick={() => navigate("/attendance")}
          className="cursor-pointer"
        />
        <h1>{name} Attendance</h1>
      </div>
      <div className="pt-6">
        <div className="bg-[#E3E3E3]/15 rounded-lg p-[37px] space-y-3 overflow-visible">
          {/* Header */}
          <div className="grid grid-cols-10 gap-6 bg-[#EAEAEA] rounded-lg px-5 py-6 font-bold text-[#09182B] text-[16px]">
            <div>Date</div>
            <div>Check In</div>
            <div>Check Out</div>
            <div>Break</div>
            <div>IDLE Time</div>
            <div>Work Hrs</div>
            <div>Late Time</div>
            <div>Bonus</div>
            <div>Deduction</div>
            <div>Status</div>
          </div>

          {/* Data Rows */}
          {attendance.length > 0 ? (
            attendance.map((att, index) => (
              <div
                key={att.id}
                className={`grid grid-cols-10 gap-6 items-center rounded-lg px-[18px] py-[21px] shadow-sm text-[#09182B] text-[15px] ${
                  index % 2 === 1 ? "bg-[#EAEAEA]/50" : "bg-white"
                }`}
              >
                <div>{att.date || "-"}</div>
                <div>{att.timeIn || "-"}</div>
                <div>{att.timeOut || "-"}</div>
                <div>{att.breakTime || "-"}</div>
                <div>{att.idleTime || "-"}</div>
                <div>{att.workHours || "-"}</div>
                <div>-</div> {/* Late Time placeholder */}
                <div>-</div> {/* Bonus placeholder */}
                <div>-</div> {/* Deduction placeholder */}
                <div>{att.status || "-"}</div>
              </div>
            ))
          ) : (
            <div className="text-center col-span-10 py-6 text-gray-500">
              No attendance records found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExportAttendence;
