// src/pages/Meetings/Meeting.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical, Edit, Trash2 } from "lucide-react";
import { meetings } from "../../../assets/assets";
import Table from "../../../components/Table";
import Pagination from "../../Pagination";

const Meeting = () => {
  const navigate = useNavigate();
  const [openActionMenu, setOpenActionMenu] = useState(null);

  const columns = [
    "Select",
    "Date",
    "Day",
    "Meeting Purpose",
    "Time",
    "Department",
    "Employee Names",
    "Description",
    "Action",
  ];

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const totalPages = Math.ceil(meetings.length / rowsPerPage);
  const paginatedData = meetings.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  return (
    <div>
      {/* Table */}
      <div className="px-[39px] pt-[26px]">
        <Table
          columns={columns}
          data={paginatedData}
          renderRow={(meeting) => [
            <input type="checkbox" className="w-4 h-4" />,
            meeting.date,
            meeting.day,
            <span className="font-medium">{meeting.title}</span>,
            meeting.time,
            meeting.department,
            meeting.employees.join(", "),
            meeting.description || "-",
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenActionMenu(
                    openActionMenu === meeting.id ? null : meeting.id
                  );
                }}
                className="p-2 rounded hover:bg-gray-200"
              >
                <MoreVertical size={18} />
              </button>

              {openActionMenu === meeting.id && (
                <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-xl shadow-xl z-50">
                  <ul className="py-2 text-sm text-[#09182B] font-medium">
                    <li
                      onClick={() => navigate(`/edit-meeting/${meeting.id}`)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <Edit className="w-4 h-4" /> Edit
                    </li>
                    <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <Trash2 className="w-4 h-4" /> Delete
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Meeting;
