import React, { useState, useEffect } from "react";
import {
  MoreVertical,
  PlusCircle,
  Eye,
  Edit,
  Trash2,
  Upload,
  Download,
} from "lucide-react";
import { BiExport } from "react-icons/bi";
import { dummyEmployees } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import FilterModal from "../../components/employee/FilterModal";
import { useToggle } from "../../context/Toggle";
import SearchBar from "../../components/SearchBar";
import Button from "../../components/Button";
import FilterButton from "../../components/FilterButton";
import Table from "./../../components/Table";
import ToggleButton from "../../components/ToggleButton";
import Pagination from "../../components/Pagination";

const EmployeeManagement = () => {
  const [OpenFilter, setOpenFilter] = useState(false);
  const [openActionMenu, setOpenActionMenu] = useState(null);
  const { toggleSidebar, isSidebarOpen } = useToggle();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".action-dropdown")) {
        setOpenActionMenu(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Filter employees
  const filteredEmployees = dummyEmployees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    "Select",
    "Employee Name",
    "Employee ID",
    "Department",
    "Designation",
    "Type",
    "Status",
    "Action",
  ];

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);
  const paginatedData = filteredEmployees.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full border-b border-black/30">
        <div className="px-4 py-6 flex items-center gap-3 font-semibold text-2xl  tracking-tighter">
          <ToggleButton
            checked={isSidebarOpen}
            onChange={toggleSidebar}
            label=""
          />
          <h1>Employee Management</h1>
        </div>
      </div>

      {/* Top Bar */}
      <div className="px-[39px] pt-[26px] flex justify-between items-center">
        <Button
          label="New Employees"
          icon={PlusCircle}
          onClick={() => navigate("/addemployee")}
        />

        <div className="flex items-center gap-2">
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="relative">
            <FilterButton
              isOpen={OpenFilter}
              onClick={() => setOpenFilter(!OpenFilter)}
            />
            {OpenFilter && <FilterModal />}
          </div>

          <Button label="Export" icon={Download} />
        </div>
      </div>

      <div className="px-[39px] pt-[26px]">
        <Table
          columns={columns}
          data={paginatedData}
          renderRow={(emp) => [
            <input type="checkbox" className="w-4 h-4" />,
            <span className="font-medium">{emp.name}</span>,
            emp.employeeId,
            emp.department,
            emp.designation,
            emp.type,
            <span className="bg-[#00B172] text-white px-3 py-1 rounded-md text-sm w-20 flex items-center justify-center">
              {emp.status}
            </span>,
            <div className="relative action-dropdown">
              <button
                onClick={() =>
                  setOpenActionMenu((prev) => (prev === emp.id ? null : emp.id))
                }
                className=" rounded hover:bg-gray-200"
              >
                <MoreVertical size={18} />
              </button>

              {openActionMenu === emp.id && (
                <div className="absolute top-full right-0 mt-2 w-40 md:w-44 bg-white rounded-xl shadow-xl z-50">
                  <ul className="py-2 text-sm text-[#09182B] font-medium">
                    <li
                      onClick={() => navigate(`/viewemployee/${emp.id}`)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <Eye className="w-4 h-4" /> View
                    </li>
                    <li
                      onClick={() => navigate(`/editemployee/${emp.id}`)}
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
      <div className="flex justify-end items-center gap-2 px-[37px] py-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default EmployeeManagement;
