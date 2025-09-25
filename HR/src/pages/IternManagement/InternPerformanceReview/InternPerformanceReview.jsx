import React, { useState } from "react";
import { Download, CalendarDays } from "lucide-react";
import { dummyInternPerformanceReviews } from "../../../assets/assets"; // make sure you have interns dummy data here
import { useNavigate } from "react-router-dom";

import { format } from "date-fns";
import Table from "../../../components/Table";
import SearchBar from "../../../components/SearchBar";
import Button from "../../../components/Button";
import { useToggle } from "../../../context/Toggle";

const InternPerformanceReview = () => {
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

  const handleStatusClick = (review) => {
    if (review.status === "View Feedback") {
      navigate(`/intern-performance-review/feedback/view/${review.id}`, {
        state: { review },
      });
    } else if (review.status === "Add Feedback") {
      navigate(`/intern-performance-review/feedback/${review.id}`, {
        state: { review },
      });
    }
  };

  // Define columns
  const columns = [
    "Select",
    "Intern Name",
    "Intern ID",
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
          <img onClick={toggleSidebar} src="/toggle.png" alt="" />
          <h1 className="text-[#09182B]">Intern Performance Review</h1>
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
          {/* Search Box */}
          <SearchBar />

          <Button label={"Export"} icon={Download} />
        </div>
      </div>

      {/* Table */}
      <div className="px-[39px] pt-[26px]">
        <Table
          columns={columns}
          data={dummyInternPerformanceReviews}
          renderRow={(review, index) => (
            <>
              <input type="checkbox" className="w-5 h-5" />
              <div className="font-medium">{review.name}</div>
              <div className="font-medium">{review.internId}</div>
              <div>{review.department || "-"}</div>
              <div>{review.workingDays || "-"}</div>
              <div>{review.projects || "-"}</div>
              <div>{review.leaves || "-"}</div>
              <button
                onClick={() => handleStatusClick(review)}
                className={`py-1 rounded-md text-sm text-white whitespace-nowrap inline-block text-center cursor-pointer ${
                  review.status === "Add Feedback"
                    ? "bg-[#0E9EE7] hover:bg-sky-600"
                    : "bg-[#00B172] hover:bg-green-600"
                }`}
              >
                {review.status}
              </button>
            </>
          )}
        />
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
    </div>
  );
};

export default InternPerformanceReview;
