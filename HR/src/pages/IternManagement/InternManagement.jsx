import React, { useState } from "react";
import Cards from "../../components/Interns/Cards";
import {
  Calendar,
  Award,
  LineChart,
  DollarSign,
  Search,
  Download,
  Edit,
  Trash2,
  MoreVertical,
} from "lucide-react";
import { CgAdd, CgProfile } from "react-icons/cg";
import { useToggle } from "../../context/Toggle";
import { dummyInterns, holidays } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import AddIntern from "../../components/Interns/AddIntern";

const InternManagement = () => {
  const navigate = useNavigate();
  const [openActionMenu, setOpenActionMenu] = useState(null);
  const { toggleSidebar } = useToggle();
  const [openAddModal, setOpenAddModal] = useState(false);

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full border-b">
        <div className="px-6 py-6 flex items-center gap-4 font-semibold text-3xl tracking-tight">
          <img
            onClick={toggleSidebar}
            src="/toggle.png"
            alt="menu"
            className="cursor-pointer"
          />
          <h1 className="text-[#09182B]">Intern Management</h1>
        </div>
      </div>

      {/* Top Cards */}
      <div className="flex items-center gap-[37px] px-[34px] pt-[25px]">
        <Cards
          icon={<Calendar size={32} />}
          title="Interns Attendance"
          onClick={() => navigate("/interns/attendance")}
        />
        <Cards
          icon={<CgProfile size={32} />}
          title="Interns Profile"
          onClick={() => navigate("/intern-profile")}
        />
        <Cards
          icon={<Award size={32} />}
          title="Interns Certificate"
          onClick={() => navigate("/intern-certificate")}
        />
        <Cards
          icon={<LineChart size={32} />}
          title="Interns Performance"
          onClick={() => navigate("/interns/performance")}
        />
      </div>

      {/* Toolbar */}
      <div className="px-[34px] pt-[32px] flex items-center justify-between">
        {/* Left */}
        <button className="flex items-center gap-2 text-[16px] font-semibold text-[#0E9EE7] border-b-2 border-[#0E9EE7] pb-1">
          <DollarSign size={20} />
          Interns Details
        </button>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="w-full sm:w-64 px-4 py-2 bg-neutral-200/30 rounded-md">
            <div className="flex items-center gap-2">
              <Search size={18} className="text-zinc-900" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-sm text-zinc-900/70 placeholder:text-zinc-900/50 w-full"
              />
            </div>
          </div>

          {/* Buttons */}
          <button
            onClick={() => setOpenAddModal(true)}
            className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-lg px-4 py-2 flex items-center gap-2"
          >
            <CgAdd size={20} />
            New Intern
          </button>
          <button className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-lg px-4 py-2 flex items-center gap-2">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="px-[34px] pt-[28px]">
        <div className="bg-[#E3E3E3]/15 rounded-lg p-[37px] space-y-3 overflow-x-auto">
          <table className="w-full min-w-[1024px] text-left text-[#09182B] text-[15px] border-separate border-spacing-y-[13px]">
            {/* Table Head */}
            <thead>
              <tr className="bg-[#EAEAEA] text-[15px] font-bold">
                <th className="px-5 py-6">Select</th>
                <th className="px-5 py-6">Start Date</th>
                <th className="px-5 py-6">Intern Name</th>
                <th className="px-5 py-6">Department</th>
                <th className="px-5 py-6">Duration</th>
                <th className="px-5 py-6">Type</th>
                <th className="px-5 py-6">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {dummyInterns.map((att, index) => (
                <tr
                  key={att.id}
                  className={`rounded-lg shadow-sm ${
                    index % 2 === 1 ? "bg-[#EAEAEA]/50" : "bg-white"
                  }`}
                >
                  <td className="px-5 py-6">
                    <input type="checkbox" className="w-4 h-4" />
                  </td>
                  <td className="px-5 py-6">{att.startDate}</td>
                  <td className="px-5 py-6">{att.internName}</td>
                  <td className="px-5 py-6 font-medium">{att.department}</td>
                  <td className="px-5 py-6 font-medium">{att.type}</td>
                  <td className="px-5 py-6">{att.duration}</td>

                  {/* Action Dropdown */}
                  <td className="px-5 py-4 relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenActionMenu(
                          openActionMenu === att.id ? null : att.id
                        );
                      }}
                      className="p-1.5 rounded hover:bg-gray-200"
                    >
                      <MoreVertical size={18} />
                    </button>

                    {openActionMenu === att.id && (
                      <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-lg shadow-lg z-50">
                        <ul className="py-1 text-sm text-[#09182B] font-medium">
                          <li
                            onClick={() => navigate(`/edit-intern/${att.id}`)}
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </li>
                          <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {openAddModal && (
        <div className="inset-0 z-50 w-full h-full flex justify-center items-center mx-auto  ">
          <AddIntern setOpenAddModal={setOpenAddModal} />
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 px-[34px] py-6">
        <button className="px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-100 text-sm">
          1
        </button>
        <button className="px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-100 text-sm">
          2
        </button>
        <button className="px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-100 text-sm">
          3
        </button>
      </div>
    </div>
  );
};

export default InternManagement;
