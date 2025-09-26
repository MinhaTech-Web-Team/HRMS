// ✅ InternManagement.jsx
import React, { useState, useEffect } from "react";
import Cards from "../../components/Interns/Cards";
import {
  Calendar,
  Award,
  LineChart,
  DollarSign,
  Download,
  Edit,
  Trash2,
  MoreVertical,
} from "lucide-react";
import { CgAdd, CgProfile } from "react-icons/cg";
import { useToggle } from "../../context/Toggle";
import { dummyInterns } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import AddIntern from "../../components/Interns/AddIntern";
import Table from "./../../components/Table";
import Button from "../../components/Button";
import SearchBar from "../../components/SearchBar";

const InternManagement = () => {
  const navigate = useNavigate();
  const [openActionMenu, setOpenActionMenu] = useState(null);
  const { toggleSidebar } = useToggle();
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

  // ✅ Define table columns
  const columns = [
    "Select",
    "Start Date",
    "Intern Name",
    "Department",
    "Duration",
    "Type",
    "Action",
  ];

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full border-b border-black/30">
        <div className="px-6 py-6 flex items-center gap-4 font-semibold text-2xl tracking-tight">
          <img
            onClick={toggleSidebar}
            src="/toggle.png"
            alt="menu"
            className="cursor-pointer"
          />
          <h1 className="text-[#09182B]">Intern Management</h1>
        </div>
      </div>

      {/* Top Cards */}
      <div className="flex items-center gap-[37px] px-[39px] pt-[26px]">
        <Cards
          icon={<Calendar size={32} />}
          title="Interns Attendance"
          onClick={() => navigate("/intern-attendence")}
        />
        <Cards
          icon={<CgProfile size={32} />}
          title="Interns Profile"
          onClick={() => navigate("/intern-profile")}
        />
        <Cards
          icon={<Award size={32} />}
          title="Interns Certificate"
          onClick={() => navigate("/intern-certificate")}
        />
        <Cards
          icon={<LineChart size={32} />}
          title="Interns Performance"
          onClick={() => navigate("/intern-performance-review")}
        />
      </div>

      {/* Toolbar */}
      <div className="px-[39px] pt-[26px] flex items-center justify-between">
        {/* Left */}
        <button className="flex items-center gap-2 text-[16px] font-semibold text-[#0E9EE7] border-b-2 border-[#0E9EE7] pb-1">
          <DollarSign size={20} />
          Interns Details
        </button>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <SearchBar />

          {/* Buttons */}
          <Button
            icon={CgAdd}
            label={"New Intern"}
            onClick={() => setOpenAddModal(true)}
          />
          <Button icon={Download} label={"Export"} />
        </div>
      </div>

      {/* ✅ Table */}
      <div className="px-[39px] pt-[26px]">
        <Table
          columns={columns}
          data={dummyInterns}
          renderRow={(att) => [
            <input type="checkbox" className="w-4 h-4" />,
            att.startDate,
            att.internName,
            <span className="font-medium">{att.department}</span>,
            att.duration,
            att.type,
            <div className="relative action-dropdown">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenActionMenu(openActionMenu === att.id ? null : att.id);
                }}
                className="p-1.5 rounded hover:bg-gray-200"
              >
                <MoreVertical size={18} />
              </button>

              {openActionMenu === att.id && (
                <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-lg shadow-lg z-50">
                  <ul className="py-1 text-sm text-[#09182B] font-medium">
                    <li
                      onClick={() => navigate(`/edit-intern/${att.id}`)}
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

      {/* Add Intern Modal */}
      {openAddModal && (
        <div className="inset-0 z-50 w-full h-full flex justify-center items-center mx-auto">
          <AddIntern setOpenAddModal={setOpenAddModal} />
        </div>
      )}

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

export default InternManagement;
