import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Download,
  Filter,
  MoreVertical,
  PlusCircle,
  Search,
} from "lucide-react";
import { Eye, Edit, Trash2, Upload } from "lucide-react";
import { BiExport } from "react-icons/bi";

import FilterModal from "../../components/CompanyExpense/FilterModal";
import { useToggle } from "../../context/Toggle";
import { dummyExpenses } from "../../assets/assets";
import Table from "../../components/Table"; // ✅ using same Table component
import AddExpense from "../../components/CompanyExpense/AddExpense";
import Button from "../../components/Button";
import SearchBar from "../../components/SearchBar";
import FilterButton from "../../components/FilterButton";

const CompanyExpense = () => {
  const navigate = useNavigate();
  const [openFilter, setOpenFilter] = useState(false);
  const { toggleSidebar } = useToggle();
  const [openActionMenu, setOpenActionMenu] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".action-dropdown")) {
        setOpenActionMenu(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // ✅ Table columns (same structure as Attendance)
  const columns = [
    "Select",
    "Date",
    "Category",
    "Name",
    "Description",
    "Taker",
    "Rs.",
    "Status",
    "Action",
  ];

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full border-b border-black/30">
        <div className="px-4 py-6 flex items-center gap-3 font-semibold text-2xl  tracking-tighter">
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
      <div className="px-[39px] pt-[26px] flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        {/* Add New Employee Button */}

        <Button
          icon={PlusCircle}
          label="New Expenses"
          onClick={() => setOpenAddModal(true)}
        />

        {/* Search & Export */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          {/* Search */}
          <SearchBar />

          {/* Filter Button */}

          <FilterButton onClick={() => setOpenFilter(true)} />

          {/* Export */}
          <Button icon={Download} label="Export" />
        </div>
      </div>

      {/* Filter Modal */}
      {openFilter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            onClick={() => setOpenFilter(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div className="relative z-10">
            <FilterModal setHolidayModalOpen={setOpenFilter} />
          </div>
        </div>
      )}

      {/* Add Modal */}
      {openAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            onClick={() => setOpenAddModal(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div className="relative z-10">
            <AddExpense setOpenAddModal={setOpenAddModal} />
          </div>
        </div>
      )}

      {/* ✅ Reusable Table */}
      <div className="px-[37px] pt-[26px]">
        <Table
          columns={columns}
          data={dummyExpenses}
          renderRow={(att) => [
            <input type="checkbox" className="w-5 h-5" />,
            att.date,
            att.category,
            <span className="font-medium">{att.name}</span>,
            att.description,
            att.taker,
            att.amount,
            <span
              className={`px-3 py-1 rounded-md text-sm text-white whitespace-nowrap inline-block text-center ${
                att.status === "Pending" ? "bg-[#09182B]" : "bg-[#00B172]"
              }`}
            >
              {att.status}
            </span>,
            <div className="relative action-dropdown">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenActionMenu(openActionMenu === att.id ? null : att.id);
                }}
                className="p-2 rounded hover:bg-gray-200"
              >
                <MoreVertical size={18} />
              </button>

              {openActionMenu === att.id && (
                <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-xl shadow-xl z-50">
                  <ul className="py-2 text-sm text-[#09182B] font-medium">
                    <li
                      onClick={() => navigate(`/expenses-edit/${att.id}`)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <Edit className="w-4 h-4" /> Edit
                    </li>
                    <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <Trash2 className="w-4 h-4" /> Delete
                    </li>
                    <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <Upload className="w-4 h-4" /> Export
                    </li>
                  </ul>
                </div>
              )}
            </div>,
          ]}
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

export default CompanyExpense;
