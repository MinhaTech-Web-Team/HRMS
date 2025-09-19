import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyEmployees, dummyPayrollData } from "../../assets/assets";
import { Download, Handbag } from "lucide-react";
import { TfiEmail } from "react-icons/tfi"; // make sure react-icons is installed

const ViewPayroll = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [payrollRecords, setPayrollRecords] = useState([]);

  useEffect(() => {
    const emp = dummyEmployees.find((e) => e.id === parseInt(id));
    if (emp) {
      setEmployee(emp);
      const payrollData = dummyPayrollData.find(
        (p) => p.employeeId === emp.employeeId
      );
      setPayrollRecords(payrollData?.records || []);
    }
  }, [id]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 px-4 py-6 flex items-center gap-3 text-2xl font-semibold">
        <img
          src="/notifi.png"
          alt="back"
          onClick={() => navigate("/payroll")}
          className="cursor-pointer"
        />
        <h1>Payroll Details</h1>
      </div>

      {/* Top bar */}
      <div className="pt-5 px-8 w-full flex items-center justify-between">
        <div className="py-7 px-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={employee.image || "/default-avatar.png"}
              className="w-[101px] h-[101px] object-cover rounded-lg"
              alt="profile"
            />
            <div className="flex flex-col gap-2 text-[#09182B]">
              <h1 className="font-semibold text-xl">
                {employee.name}{" "}
                <span className="text-[#3FC28A] text-lg">(Active)</span>
              </h1>
              <h1 className="flex items-center gap-1 font-light text-[16px]">
                <Handbag size={20} />
                <span>{employee.designation}</span>
              </h1>
              <h1 className="flex items-center gap-1 font-light text-[16px]">
                <TfiEmail size={20} />
                <span>{employee.personalInfo?.email || "N/A"}</span>
              </h1>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 relative">
          <button
            onClick={() => navigate(`/export-payroll/${id}`)}
            className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-lg px-4 py-2 flex items-center gap-2"
          >
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="px-[37px] pt-6">
        <div className="bg-[#E3E3E3]/15 rounded-lg p-[37px] space-y-3 overflow-x-auto">
          <table className="w-full min-w-[1024px] text-left text-[#09182B] text-[15px] border-separate border-spacing-y-[13px]">
            <thead>
              <tr className="bg-[#EAEAEA] rounded-lg text-[16px] font-bold">
                <th className="px-5 py-6">Select</th>
                <th className="px-5 py-6">Date</th>
                <th className="px-5 py-6">Fixed Salary</th>
                <th className="px-5 py-6">Deductions</th>
                <th className="px-5 py-6">Bonus</th>
                <th className="px-5 py-6">Total</th>
              </tr>
            </thead>

            <tbody>
              {payrollRecords.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No payroll records found for this employee.
                  </td>
                </tr>
              ) : (
                payrollRecords.map((record, index) => (
                  <tr
                    key={`${employee.employeeId}-${record.date}`}
                    className={`rounded-lg shadow-sm relative ${
                      index % 2 === 1 ? "bg-[#EAEAEA]/50" : "bg-white"
                    }`}
                  >
                    <td className="px-[18px] py-[21px]">
                      <input type="checkbox" className="w-5 h-5" />
                    </td>
                    <td className="px-[18px] py-[21px]">{record.date}</td>
                    <td className="px-[18px] py-[21px]">
                      {record.basicSalary}
                    </td>
                    <td className="px-[18px] py-[21px]">{record.deductions}</td>
                    <td className="px-[18px] py-[21px]">{record.bonus}</td>
                    <td className="px-[18px] py-[21px]">{record.total}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 px-[37px] py-6">
        {[1, 2, 3].map((page) => (
          <button
            key={page}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ViewPayroll;
