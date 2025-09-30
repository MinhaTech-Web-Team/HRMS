// src/pages/Interns/InternCertificate.jsx
import React, { useState } from "react";
import { useToggle } from "../../../context/Toggle";
import {
  CalendarDays,
  Download,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Upload,
} from "lucide-react";
import { format } from "date-fns";
import { CgAdd } from "react-icons/cg";
import { dummyInterns } from "../../../assets/assets";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/Button";
import Table from "../../../components/Table";
import Pagination from "../../../components/Pagination";
import ToggleButton from "../../../components/ToggleButton";

const InternCertificate = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [openActionMenu, setOpenActionMenu] = useState(null);
  const { toggleSidebar, isSidebarOpen } = useToggle();
  const navigate = useNavigate();

  // Dummy date range
  const [dateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // Table columns
  const columns = [
    "Select",
    "Start Date",
    "Intern Name",
    "Department",
    "Duration",
    "Type",
    "Action",
  ];

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const totalPages = Math.ceil(dummyInterns.length / rowsPerPage);
  const paginatedData = dummyInterns.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // ✅ RenderRow returns array of cells
  const renderRow = (att) => {
    return [
      <input type="checkbox" className="w-4 h-4" />,
      att.startDate,
      att.internName,
      <span className="font-medium">{att.department}</span>,
      <span className="font-medium">{att.duration}</span>,
      att.type,
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpenActionMenu(openActionMenu === att.id ? null : att.id);
          }}
          className=" rounded hover:bg-gray-200"
        >
          <MoreVertical size={18} />
        </button>

        {openActionMenu === att.id && (
          <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-lg shadow-lg z-50">
            <ul className="py-2 text-sm text-[#09182B] font-medium">
              <li
                onClick={() => navigate(`/intern-certificate/view/${att.id}`)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                View
              </li>
              <li
                onClick={() => navigate(`/intern-certificate/edit/${att.id}`)}
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
      </div>,
    ];
  };

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full border-b border-black/30">
        <div className="px-4 py-6 flex items-center gap-3 font-semibold text-2xl tracking-tighter">
          <ToggleButton
            checked={isSidebarOpen}
            onChange={toggleSidebar}
            label=""
          />
          <h1 className="text-[#09182B]">Intern Certificate</h1>
        </div>
      </div>

      {/* Top Bar */}
      <div className="px-[39px] pt-[26px] flex justify-between items-center">
        {/* Date Range Button */}
        <button
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex items-center gap-2"
          onClick={() => setShowDatePicker((prev) => !prev)}
        >
          {`${format(dateRange[0].startDate, "MMM dd")} - ${format(
            dateRange[0].endDate,
            "MMM dd"
          )}`}
          <CalendarDays size={16} />
        </button>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => navigate("/intern-certificate/add")}
            icon={CgAdd}
            label="New Certificate"
          />

          <Button label={"Export"} icon={Download} />
        </div>
      </div>

      {/* Table */}
      <div className="px-[39px] pt-[26px]">
        <Table columns={columns} data={paginatedData} renderRow={renderRow} />
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 px-[34px] py-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default InternCertificate;
