import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { dummyPayrollData } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { useToggle } from "../../context/Toggle";
import Table from "../../components/Table";
import SearchBar from "../../components/SearchBar";
import Button from "../../components/Button";

const PayRollManagement = () => {
  const { toggleSidebar } = useToggle();
  const navigate = useNavigate();

  // Table columns (no Action column now)
  const columns = [
    "Select",
    "Employee Name",
    "Employee ID",
    "Department",
    "Fixed Salary",
    "Deduction",
    "Bonus",
    "Total",
  ];

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full border-b border-black/30">
        <div className="px-4 py-6 flex items-center gap-3 font-semibold text-2xl tracking-tighter">
          <img onClick={toggleSidebar} src="/toggle.png" alt="Toggle Sidebar" />
          <h1 className="text-[#09182B]">Payroll Management</h1>
        </div>
      </div>

      {/* Top Bar */}
      <div className="px-[39px] pt-[26px] flex justify-between items-center">
        <h1 className="text-2xl text-[#09182B] font-semibold">
          Employee Payroll
        </h1>

        <div className="flex items-center gap-2">
          {/* Search Box */}
          <SearchBar />

          {/* All Employees Button */}
          <Button
            label="All Employees"
            onClick={() => navigate("/payroll-allemployees")}
          />

          {/* Export Button */}
          <Button icon={Download} label={"Export"} />
        </div>
      </div>

      {/* Table */}
      <div className="px-[39px] pt-[26px]">
        <Table
          columns={columns}
          data={dummyPayrollData}
          renderRow={(employee) => {
            const latestRecord = [...employee.records].sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            )[0];

            return [
              <input type="checkbox" className="w-5 h-5" />,
              <span className="font-medium">{employee.name}</span>,
              employee.employeeId,
              employee.designation,
              latestRecord.basicSalary,
              latestRecord.deductions,
              latestRecord.bonus,
              <span className="font-semibold">{latestRecord.total}</span>,
            ];
          }}
        />
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
