import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical, Edit, Trash2 } from "lucide-react";
import { events } from "../../../assets/assets"; // <-- import your events

const Event = () => {
  const navigate = useNavigate();
  const [openActionMenu, setOpenActionMenu] = useState(null);

  return (
    <>
      {/* Table */}
      <div className="w-full">
        <div className="bg-[#E3E3E3]/15 rounded-lg p-[20px] space-y-3 overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <table className="w-full min-w-[1000px] text-left text-[#09182B] text-[15px] border-separate border-spacing-y-[13px]">
              {/* Table Head */}
              <thead>
                <tr className="bg-[#EAEAEA] rounded-lg text-[16px] font-bold">
                  <th className="px-5 py-6">Select</th>
                  <th className="px-5 py-6">Date</th>
                  <th className="px-5 py-6">Day</th>
                  <th className="px-5 py-6">Event</th>
                  <th className="px-5 py-6">Description</th>
                  <th className="px-5 py-6">Action</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {events.map((event, index) => (
                  <tr
                    key={event.id}
                    className={`rounded-lg shadow-sm relative ${
                      index % 2 === 1 ? "bg-[#EAEAEA]/50" : "bg-white"
                    }`}
                  >
                    <td className="px-[18px] py-[21px]">
                      <input type="checkbox" className="w-5 h-5" />
                    </td>
                    <td className="px-[18px] py-[21px]">{event.date}</td>
                    <td className="px-[18px] py-[21px]">{event.day}</td>
                    <td className="px-[18px] py-[21px] font-medium">
                      {event.name}
                    </td>

                    <td className="px-[18px] py-[21px]">{event.description}</td>

                    {/* Action Menu */}
                    <td className="px-[18px] py-[21px] relative action-dropdown">
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
                        <div className="absolute top-full right-0 mt-2 w-30 bg-white rounded-xl shadow-xl z-50">
                          <ul className="py-2 text-sm text-[#09182B] font-medium">
                            <li
                              onClick={() =>
                                navigate(`/edit-event/${event.id}`)
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
    </>
  );
};

export default Event;
