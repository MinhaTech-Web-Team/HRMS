import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import { CgAdd } from "react-icons/cg";
import FilterButton from "../../../components/FilterButton";
import {
  Download,
  Edit,
  Eye,
  MoreVertical,
  Trash2,
  Upload,
} from "lucide-react";
import { dummyInterns } from "../../../assets/assets";
import Table from "../../../components/Table";

const InternsProfile = () => {
  // Table columns
  const columns = [
    "Select",
    "Start Date",
    "Intern Name",
    "Department",
    "Duration",
    "Type",
    "Status",
    "Action",
  ];

  const navigate = useNavigate();
  const [openActionMenu, setOpenActionMenu] = useState(null);
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="border-b border-black/30 px-4 py-6 flex items-center gap-3 text-2xl font-semibold">
        <img
          src="/notifi.png"
          alt="back"
          onClick={() => navigate("/interns")}
          className="cursor-pointer"
        />
        <h1>Intern Management</h1>
      </div>
      {/* Top bar */}
      <div className="px-[39px] pt-[26px] flex items-center justify-between">
        <Button
          label={"New Intern"}
          icon={CgAdd}
          onClick={() => navigate("/intern-profile/add")}
        />
        <div className="flex items-center gap-3">
          <FilterButton />
          <Button label={"Export"} icon={Download} />
        </div>
      </div>
      {/* Table */}
      <div className="px-[39px] pt-[26px]">
        <Table
          columns={columns}
          data={dummyInterns}
          renderRow={(att, index) => (
            <>
              <div>
                <input type="checkbox" className="w-4 h-4" />
              </div>
              <div>{att.startDate}</div>
              <div>{att.internName}</div>
              <div className="font-medium">{att.department}</div>
              <div className="font-medium">{att.duration}</div>
              <div>{att.type}</div>
              <div>
                <button className="bg-[#00B172] px-2 text-white rounded-sm text-[15px] font-medium">
                  Intern
                </button>
              </div>

              {/* Action Dropdown */}
              <div className="relative">
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
                          navigate(`/intern-profile/view/${att.id}`)
                        }
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </li>
                      <li
                        onClick={() =>
                          navigate(`/intern-profile/edit/${att.id}`)
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
              </div>
            </>
          )}
        />
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

export default InternsProfile;
