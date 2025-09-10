import React, { useState } from "react";
import { Filter, MoreVertical, PlusCircle, Search } from "lucide-react";
import { dummyEmployees } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { BiExport } from "react-icons/bi";
import FilterModal from "../components/employee/FilterModal";
import { useToggle } from "../context/Toggle";

const EmployeeManagement = () => {
  const [OpenFilter, setOpenFilter] = useState(false);
  const { toggleSidebar } = useToggle();

  const navigate = useNavigate();
  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      <div className="w-full border-b">
        <div className="px-4 py-6 flex items-center gap-3 font-semibold text-3xl tracking-tighter">
          <img onClick={toggleSidebar} src="/toggle.png" alt="" />
          <h1 className="">Employee Management</h1>
        </div>
      </div>

      <div className="px-[39px] py-7 flex justify-between items-center">
        {/* button */}
        <div
          onClick={() => navigate("/addemployee")}
          className="py-3 px-7 bg-sky-500 rounded-lg inline-flex justify-center items-center gap-2.5"
        >
          <div className="w-6 h-6 relative overflow-hidden">
            <PlusCircle className="text-white" />
          </div>
          <div className="justify-start text-white text-base font-bold leading-normal">
            New Employees
          </div>
        </div>

        {/* search */}
        <div className="flex items-center gap-2">
          <div className="w-64 px-4 py-3 bg-neutral-200/30 rounded-[5px] inline-flex flex-col justify-center items-start gap-2.5">
            <div className="self-stretch inline-flex justify-start items-center gap-2.5">
              <Search size={20} className="text-zinc-900 shrink-0 block" />
              <input
                type="text"
                placeholder="Search"
                className="flex-1 bg-transparent outline-none text-zinc-900/50 text-base font-normal leading-normal placeholder:text-zinc-900/50"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 relative">
            <button
              onClick={() => setOpenFilter(!OpenFilter)}
              className="flex items-center border border-[#0E9EE7] text-[#0E9EE7] rounded-md px-4 py-2 hover:bg-blue-50"
            >
              <Filter className="h-5 w-5 mr-2" />
              <span>Filter</span>
            </button>
            {OpenFilter && <FilterModal />}
          </div>

          <button className="flex items-center bg-[#0E9EE7] text-white rounded-md px-4 py-2 hover:bg-blue-600">
            <BiExport className="h-5 w-5 mr-2" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="px-[37px]">
        <div className="bg-[#E3E3E3]/15 rounded-lg p-[37px] space-y-3">
          {/* Header */}
          <div className="grid grid-cols-8 gap-9 bg-[#EAEAEA] rounded-lg px-5 py-6 font-bold text-[#09182B] whitespace-nowrap text-[16px]">
            <div>Select</div>
            <div className="">Employee Name</div>
            <div>Employee ID</div>
            <div>Department</div>
            <div>Designation</div>
            <div>Type</div>
            <div>Status</div>
            <div>Action</div>
          </div>

          {/* Employee Rows */}
          {dummyEmployees.map((emp, index) => (
            <div
              key={emp.id}
              className={`grid grid-cols-8 gap-9 items-center rounded-lg px-[18px] py-[21px] shadow-sm hover:bg-gray-100 text-[#09182B] text-[15px] ${
                index % 2 === 1 ? "bg-[#EAEAEA]/50" : "bg-white"
              }`}
            >
              <div>
                <input type="checkbox" />
              </div>

              {/* Employee name only */}
              <div className="whitespace-nowrap font-medium">{emp.name}</div>

              <div>{emp.employeeId}</div>
              <div>{emp.department}</div>
              <div>{emp.designation}</div>
              <div>{emp.type}</div>
              <div>
                <span className="bg-[#00B172] text-white px-3 py-1 rounded-md text-sm">
                  {emp.status}
                </span>
              </div>
              <div>
                <button className="p-2 rounded hover:bg-gray-200">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement;
