import React, { useState } from "react";

const ProfessionalInfo = () => {
  const [employeeType, setEmployeeType] = useState("Remote");
  const [workingDays, setWorkingDays] = useState("6 Days");
  const [joiningDate, setJoiningDate] = useState("2025-04-15");

  const inputClass =
    "px-[30px] py-[10px] w-full h-[56px] bg-white border border-[#E3E3E34D] rounded-[12px] text-sm outline-none";

  const labelClass = "text-black text-[16px] mb-1 text-semibold";

  return (
    <div className="px-1 py-10 flex flex-col gap-5">
      {/* Inputs */}
      <div className="flex flex-col gap-6 mt-4">
        {/* Row 1 */}
        <div className="flex gap-6">
          <div className="w-full">
            <label className={labelClass}>Employee ID</label>
            <input
              className={inputClass}
              type="text"
              value="5318164"
              readOnly
            />
          </div>
          <div className="w-full">
            <label className={labelClass}>Username</label>
            <input
              className={inputClass}
              type="text"
              value="Muzna Ahmad"
              readOnly
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex gap-6">
          <div className="w-full">
            <label className={labelClass}>Select Employee Type</label>
            <select
              className={inputClass}
              value={employeeType}
              onChange={(e) => setEmployeeType(e.target.value)}
            >
              <option value="Remote">Remote</option>
              <option value="Onsite">Onsite</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div className="w-full">
            <label className={labelClass}>Email Address</label>
            <input
              className={inputClass}
              type="email"
              value="muznadesigner@gmail.com"
              readOnly
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="flex gap-6">
          <div className="w-full">
            <label className={labelClass}>Enter Department</label>
            <input
              className={inputClass}
              type="text"
              value="Designer"
              readOnly
            />
          </div>
          <div className="w-full">
            <label className={labelClass}>Enter Designation</label>
            <input
              className={inputClass}
              type="text"
              value="UI/UX Designer"
              readOnly
            />
          </div>
        </div>

        {/* Row 4 */}
        <div className="flex gap-6">
          <div className="w-full">
            <label className={labelClass}>Total Working Days</label>
            <select
              className={inputClass}
              value={workingDays}
              onChange={(e) => setWorkingDays(e.target.value)}
            >
              <option value="5 Days">5 Days</option>
              <option value="6 Days">6 Days</option>
              <option value="7 Days">7 Days</option>
            </select>
          </div>
          <div className="w-full">
            <label className={labelClass}>Select Joining Date</label>
            <input
              className={inputClass}
              type="date"
              value={joiningDate}
              onChange={(e) => setJoiningDate(e.target.value)}
            />
          </div>
        </div>

        {/* Fixed Salary */}
        <div className="w-full">
          <label className={labelClass}>Fixed Salary</label>
          <input className={inputClass} type="text" value="50000" readOnly />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-10">
        <button className="px-6 py-2 rounded border border-gray-300 text-gray-600">
          Cancel
        </button>
        <button className="px-6 py-2 rounded bg-[#0E9EE7] text-white hover:bg-blue-600">
          Save
        </button>
      </div>
    </div>
  );
};

export default ProfessionalInfo;
