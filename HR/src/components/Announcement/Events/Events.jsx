// src/pages/Events/Event.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical, Edit, Trash2 } from "lucide-react";
import { events } from "../../../assets/assets";
import Table from "../../../components/Table";

const Event = () => {
  const navigate = useNavigate();
  const [openActionMenu, setOpenActionMenu] = useState(null);

  const columns = ["Select", "Date", "Day", "Event", "Description", "Action"];

  return (
    <div>
      {/* Table */}
      <div className="px-[39px] pt-[26px]">
        <Table
          columns={columns}
          data={events}
          renderRow={(event) => [
            <input type="checkbox" className="w-5 h-5" />,
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
                className="p-2 rounded hover:bg-gray-200"
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

export default Event;
