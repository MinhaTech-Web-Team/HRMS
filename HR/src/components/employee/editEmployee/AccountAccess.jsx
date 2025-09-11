import React from "react";

const AccountAccess = ({ data, setData, onSubmit }) => {
  const inputClass =
    "px-[20px] py-[12px] w-full h-[48px] bg-white border border-gray-200 rounded-md text-sm outline-none text-gray-700";
  const labelClass = "text-black text-[14px] font-medium mb-1";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="px-6 py-10 flex flex-col gap-6">
      {/* Row: Email and ID */}
      <div className="flex gap-6">
        <div className="w-full">
          <label className={labelClass}>Email</label>
          <input
            type="email"
            className={inputClass}
            name="email"
            value={data.email || ""}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
        <div className="w-full">
          <label className={labelClass}>ID</label>
          <input
            type="text"
            className={inputClass}
            name="employeeId"
            value={data.employeeId || ""}
            onChange={handleChange}
            placeholder="Employee ID"
          />
        </div>
      </div>

      {/* Password */}
      <div className="w-full">
        <label className={labelClass}>Password</label>
        <input
          type="password"
          name="password"
          className={inputClass}
          placeholder="Enter Password"
          value={data.password || ""}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-end gap-4 mt-10">
        <button className="px-6 py-2 rounded border border-gray-300 text-gray-600">
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className="px-6 py-2 rounded bg-[#0E9EE7] text-white hover:bg-blue-600"
        >
          Save & Submit
        </button>
      </div>
    </div>
  );
};

export default AccountAccess;
