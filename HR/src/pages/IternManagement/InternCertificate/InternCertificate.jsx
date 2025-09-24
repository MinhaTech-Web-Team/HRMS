import React, { useState } from "react";
import { useToggle } from "../../../context/Toggle";
import {
  CalendarDays,
  Search,
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

const InternCertificate = () => {
  const { toggleSidebar } = useToggle();

  // State for date range picker toggle
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [openActionMenu, setOpenActionMenu] = useState(null);
  const navigate = useNavigate();

  // Dummy date range
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full border-b">
        <div className="px-4 py-6 flex items-center gap-3 font-semibold text-3xl tracking-tighter">
          <img onClick={toggleSidebar} src="/toggle.png" alt="toggle sidebar" />
          <h1 className="text-[#09182B]">Intern Certificate</h1>
        </div>
      </div>

      {/* Top Bar */}
      <div className="px-[39px] py-7 flex justify-between items-center">
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
          <button
            onClick={() => navigate("/intern-certificate/add")}
            className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-lg px-5 py-3 flex items-center gap-2"
          >
            <CgAdd size={22} />
            New Certificate
          </button>

          {/* Export Button */}
          <button className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-lg px-5 py-3 flex items-center gap-2">
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
                        <ul className="py-2 text-sm text-[#09182B] font-medium">
                          <li
                            onClick={() =>
                              navigate(`/intern-certificate/view/${att.id}`)
                            }
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </li>
                          <li
                            onClick={() =>
                              navigate(`/intern-certificate/edit/${att.id}`)
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

export default InternCertificate;
