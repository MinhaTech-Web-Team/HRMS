import React from "react";

const AccountAccess = () => {
  const inputClass =
    "px-[20px] py-[12px] w-full h-[48px] bg-white border border-gray-200 rounded-md text-sm outline-none text-gray-700";
  const labelClass = "text-black text-[14px] font-medium mb-1";

  return (
    <div className="px-6 py-10 flex flex-col gap-6">
      {/* Row: Email and ID */}
      <div className="flex gap-6">
        <div className="w-full">
          <label className={labelClass}>Email</label>
          <input
            type="email"
            className={inputClass}
            value="muznadesigner@gmail.com"
            readOnly
          />
        </div>
        <div className="w-full">
          <label className={labelClass}>ID</label>
          <input type="text" className={inputClass} value="6347163" readOnly />
        </div>
      </div>

      {/* Password */}
      <div className="w-full">
        <label className={labelClass}>Password</label>
        <input
          type="password"
          className={inputClass}
          placeholder="Enter Password"
          defaultValue="123456"
        />
      </div>
      <div className="flex justify-end gap-4 mt-10">
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

export default AccountAccess;
