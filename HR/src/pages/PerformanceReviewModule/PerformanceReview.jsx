// src/pages/Performance/PerformanceReview.jsx
import React, { useState } from "react";
import { Download, CalendarDays } from "lucide-react";
import { dummyPerformanceReviews } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { useToggle } from "../../context/Toggle";
import { format } from "date-fns";
import Table from "../../components/Table";
import SearchBar from "../../components/SearchBar";
import Button from "../../components/Button";

const PerformanceReview = () => {
  const { toggleSidebar } = useToggle();
  const navigate = useNavigate();

  const [showDatePicker, setShowDatePicker] = useState(false);

  // default range: today → today
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleStatusClick = (att) => {
    if (att.status === "View Feedback") {
      navigate(`/view-feedback/${att.id}`, { state: { review: att } });
    } else if (att.status === "Add Feedback") {
      navigate(`/add-feedback/${att.id}`, { state: { review: att } });
    }
  };

  const columns = [
    "Select",
    "Employee Name",
    "Employee ID",
    "Department",
    "Working Days",
    "Projects",
    "Leaves",
    "Status",
  ];

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full border-b border-black/30">
        <div className="px-4 py-6 flex items-center gap-3 font-semibold text-2xl tracking-tighter">
          <img onClick={toggleSidebar} src="/toggle.png" alt="Toggle Sidebar" />
          <h1 className="text-[#09182B]">Performance Review</h1>
        </div>
      </div>

      {/* Top Bar */}
      <div className="px-[39px] pt-[26px] flex justify-between items-center">
        {/* Date Button */}
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
          <SearchBar />
          <Button label={"Export"} icon={Download} />
        </div>
      </div>

      {/* Table */}
      <div className="px-[39px] pt-[26px]">
        <Table
          columns={columns}
          data={dummyPerformanceReviews}
          renderRow={(att) => [
            <input type="checkbox" className="w-5 h-5" />,
            <span className="font-medium">{att.name}</span>,
            <span className="font-medium">{att.employeeId}</span>,
            att.department || "-",
            att.workingDays || "-",
            att.projects || "-",
            att.leaves || "-",
            <button
              onClick={() => handleStatusClick(att)}
              className={`px-3 py-1 rounded-md text-sm text-white whitespace-nowrap inline-block text-center cursor-pointer ${
                att.status === "Add Feedback"
                  ? "bg-[#0E9EE7] hover:bg-sky-600"
                  : "bg-[#00B172] hover:bg-green-600"
              }`}
            >
              {att.status}
            </button>,
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

export default PerformanceReview;
