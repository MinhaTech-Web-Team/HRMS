// src/pages/Events/Event.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical, Edit, Trash2 } from "lucide-react";
import { events } from "../../../assets/assets";
import Table from "../../../components/Table";
import Pagination from "../../Pagination";

const Event = () => {
  const navigate = useNavigate();
  const [openActionMenu, setOpenActionMenu] = useState(null);

  const columns = ["Select", "Date", "Day", "Event", "Description", "Action"];

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const totalPages = Math.ceil(events.length / rowsPerPage);
  const paginatedData = events.slice(
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
          renderRow={(event) => [
            <input type="checkbox" className="w-4 h-4" />,
            event.date,
            event.day,
            <span className="font-medium">{event.name}</span>,
            event.description || "-",
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenActionMenu(
                    openActionMenu === event.id ? null : event.id
                  );
                }}
                className=" rounded hover:bg-gray-200"
              >
                <MoreVertical size={18} />
              </button>

              {openActionMenu === event.id && (
                <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-xl shadow-xl z-50">
                  <ul className="py-2 text-sm text-[#09182B] font-medium">
                    <li
                      onClick={() => navigate(`/edit-event/${event.id}`)}
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

export default Event;
