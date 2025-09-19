import React, { useEffect, useState } from "react";
import { Search, Download } from "lucide-react";
import { dummyPayrollData } from "../../assets/assets"; // replace with your actual path
import { useNavigate } from "react-router-dom";
import { useToggle } from "../../context/Toggle";

const PayRollManagement = () => {
  const { toggleSidebar } = useToggle();
  const navigate = useNavigate();
  const [openActionMenu, setOpenActionMenu] = useState(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".action-dropdown")) {
        setOpenActionMenu(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full border-b">
        <div className="px-4 py-6 flex items-center gap-3 font-semibold text-3xl tracking-tighter">
          <img onClick={toggleSidebar} src="/toggle.png" alt="" />
          <h1 className="text-[#09182B]">Payroll Management</h1>
        </div>
      </div>

      {/* Top Bar */}
      <div className="px-[39px] py-7 flex justify-between items-center">
        <button
          onClick={() => navigate("/payroll-allemployees")}
          className="bg-[#0E9EE7] px-6 py-3 rounded-lg cursor-pointer text-white text-base font-bold hover:bg-sky-600"
        >
          All Employees
        </button>

        <div className="flex items-center gap-2">
          <div className="w-64 px-4 py-3 bg-neutral-200/30 rounded-[5px] inline-flex justify-start items-center gap-2.5">
            <Search size={20} className="text-zinc-900 shrink-0 block" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 bg-transparent outline-none text-zinc-900/50 text-base placeholder:text-zinc-900/50"
            />
          </div>

          <button className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-lg px-5 py-3 flex items-center gap-2">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="px-[37px]">
        <div className="bg-[#E3E3E3]/15 rounded-lg p-[37px] space-y-3 overflow-x-auto">
          <table className="w-full min-w-[1024px] text-left text-[#09182B] text-[15px] border-separate border-spacing-y-[13px]">
            {/* Table Head */}
            <thead>
              <tr className="bg-[#EAEAEA] rounded-lg text-[16px] font-bold">
                <th className="px-5 py-6">Select</th>
                <th className="px-5 py-6">Employee Name</th>
                <th className="px-5 py-6">Employee ID</th>
                <th className="px-5 py-6">Department</th>
                <th className="px-5 py-6">Fixed Salary</th>
                <th className="px-5 py-6">Deduction</th>
                <th className="px-5 py-6">Bonus</th>
                <th className="px-5 py-6">Total</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {dummyPayrollData.map((employee, index) => {
                const latestRecord = [...employee.records].sort(
                  (a, b) => new Date(b.date) - new Date(a.date)
                )[0];

                return (
                  <tr
                    key={employee.employeeId}
                    className={`rounded-lg shadow-sm relative ${
                      index % 2 === 1 ? "bg-[#EAEAEA]/50" : "bg-white"
                    }`}
                  >
                    <td className="px-[18px] py-[21px]">
                      <input type="checkbox" className="w-5 h-5" />
                    </td>
                    <td className="px-[18px] py-[21px] font-medium">
                      {employee.name}
                    </td>
                    <td className="px-[18px] py-[21px]">
                      {employee.employeeId}
                    </td>
                    <td className="px-[18px] py-[21px]">
                      {employee.designation}
                    </td>
                    <td className="px-[18px] py-[21px]">
                      {latestRecord.basicSalary}
                    </td>
                    <td className="px-[18px] py-[21px]">
                      {latestRecord.deductions}
                    </td>
                    <td className="px-[18px] py-[21px]">
                      {latestRecord.bonus}
                    </td>
                    <td className="px-[18px] py-[21px] font-semibold">
                      {latestRecord.total}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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

export default PayRollManagement;
