import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Filter, MoreVertical, PlusCircle, Search } from "lucide-react";
import { Eye, Edit, Trash2, Upload } from "lucide-react";

import { BiExport } from "react-icons/bi";
import FilterModal from "../../components/CompanyExpense/FilterModal";
import { useToggle } from "../../context/Toggle";
import { dummyExpenses } from "../../assets/assets";

const CompanyExpense = () => {
  const navigate = useNavigate();
  const [openFilter, setOpenFilter] = useState(false);
  const { toggleSidebar } = useToggle();
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
        <div className="px-4 py-6 flex items-center gap-3 font-semibold text-2xl md:text-3xl tracking-tighter">
          <img
            onClick={toggleSidebar}
            src="/toggle.png"
            alt="Toggle Sidebar"
            className="w-6 h-6 cursor-pointer"
          />
          <h1>Company Expense</h1>
        </div>
      </div>

      {/* Top Bar */}
      <div className="px-4 md:px-[39px] py-5 flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        {/* Add New Employee Button */}
        <div
          onClick={() => navigate("/addemployee")}
          className="py-3 px-7 bg-sky-500 rounded-lg inline-flex justify-center items-center gap-2.5 cursor-pointer w-full md:w-auto"
        >
          <PlusCircle className="text-white w-6 h-6" />
          <span className="text-white text-base font-bold">New Expense</span>
        </div>

        {/* Search & Export */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="w-full sm:w-64 px-4 py-3 bg-neutral-200/30 rounded-[5px]">
            <div className="flex items-center gap-2.5">
              <Search size={20} className="text-zinc-900" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-zinc-900/50 text-base placeholder:text-zinc-900/50 w-full"
              />
            </div>
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setOpenFilter(true)}
            className="flex items-center border border-[#0E9EE7] text-[#0E9EE7] rounded-md px-4 py-2 hover:bg-blue-50 w-full sm:w-auto justify-center"
          >
            <Filter className="h-5 w-5 mr-2" />
            <span>Filter</span>
          </button>

          {/* Export */}
          <button className="flex items-center bg-[#0E9EE7] text-white rounded-md px-4 py-2 hover:bg-blue-600 w-full sm:w-auto justify-center">
            <BiExport className="h-5 w-5 mr-2" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Filter Modal */}
      {openFilter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            onClick={() => setOpenFilter(false)}
            className="absolute inset-0 bg-black/40"
          />
          {/* Modal */}
          <div className="relative z-10">
            <FilterModal setHolidayModalOpen={setOpenFilter} />
          </div>
        </div>
      )}
      <div className="px-[37px]">
        <div className="bg-[#E3E3E3]/15 rounded-lg p-[37px] space-y-3 overflow-x-auto">
          <table className="w-full min-w-[1024px] text-left text-[#09182B] text-[15px] border-separate border-spacing-y-[13px]">
            {/* Table Head */}
            <thead>
              <tr className="bg-[#EAEAEA] rounded-lg text-[16px] font-bold">
                <th className="px-5 py-6">Select</th>
                <th className="px-5 py-6">Date</th>
                <th className="px-5 py-6">Category</th>
                <th className="px-5 py-6">Name</th>
                <th className="px-5 py-6">Description</th>
                <th className="px-5 py-6">Taker</th>
                <th className="px-5 py-6">Rs.</th>
                <th className="px-5 py-6">Status</th>
                <th className="px-5 py-6">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {dummyExpenses.map((att, index) => (
                <tr
                  key={att.id}
                  className={`rounded-lg shadow-sm relative ${
                    index % 2 === 1 ? "bg-[#EAEAEA]/50" : "bg-white"
                  }`}
                >
                  <td className="px-[18px] py-[21px]">
                    <input type="checkbox" className="w-5 h-5" />
                  </td>
                  <td className="px-[18px] py-[21px]">{att.date}</td>
                  <td className="px-[18px] py-[21px]">{att.category}</td>
                  <td className="px-[18px] py-[21px] font-medium">
                    {att.name}
                  </td>
                  <td className="px-[18px] py-[21px]">{att.description}</td>
                  <td className="px-[18px] py-[21px]">{att.taker}</td>
                  <td className="px-[18px] py-[21px]">{att.amount}</td>
                  <td className="px-[18px] py-[21px]">
                    <span
                      className={`px-3 py-1 rounded-md text-sm text-white whitespace-nowrap inline-block text-center ${
                        att.status === "Pending"
                          ? "bg-[#09182B]"
                          : "bg-[#00B172]"
                      }`}
                    >
                      {att.status}
                    </span>
                  </td>
                  <td className="px-[18px] py-[21px] relative action-dropdown">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenActionMenu(
                          openActionMenu === att.id ? null : att.id
                        );
                      }}
                      className="p-2 rounded hover:bg-gray-200"
                    >
                      <MoreVertical size={18} />
                    </button>

                    {openActionMenu === att.id && (
                      <div className="absolute top-full right-0 mt-2 w-30 bg-white rounded-xl shadow-xl z-50">
                        <ul className="py-2 text-sm text-[#09182B] font-medium">
                          <li
                            onClick={() =>
                              navigate(`/view-attendance/${att.id}`)
                            }
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </li>
                          <li
                            onClick={() =>
                              navigate(`/edit-attendance/${att.id}`)
                            }
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </li>
                          <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </li>
                          <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            <Upload className="w-4 h-4" />
                            Export
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

export default CompanyExpense;
