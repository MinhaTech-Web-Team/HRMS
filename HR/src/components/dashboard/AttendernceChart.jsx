import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area,
} from "recharts";
import { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { FaRegCalendarAlt } from "react-icons/fa"; // for calendar icon
import { useToggle } from "../../context/Toggle";

const data = [
  { month: "Jan", onTime: 30, late: 15, absent: 8 },
  { month: "Feb", onTime: 34, late: 12, absent: 20 },
  { month: "Mar", onTime: 38, late: 10, absent: 30 },
  { month: "Apr", onTime: 32, late: 25, absent: 35 },
  { month: "May", onTime: 28, late: 30, absent: 45 },
  { month: "Jun", onTime: 45, late: 18, absent: 32 },
  { month: "Jul", onTime: 50, late: 15, absent: 30 },
  { month: "Aug", onTime: 46, late: 10, absent: 31 },
  { month: "Sep", onTime: 43, late: 5, absent: 33 },
  { month: "Oct", onTime: 80, late: 20, absent: 50 },
  { month: "Nov", onTime: 60, late: 15, absent: 45 },
  { month: "Dec", onTime: 50, late: 10, absent: 40 },
];

// Custom input component for react-datepicker
const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
  <button
    onClick={onClick}
    ref={ref}
    className="flex items-center gap-2 px-4 py-2 border border-blue-400 text-gray-500 rounded-md bg-white hover:cursor-pointer text-sm shadow-sm"
  >
    {value}
    <FaRegCalendarAlt className="text-gray-500" />
  </button>
));

export default function AttendanceChart() {
  const [startDate, setStartDate] = useState(new Date("2024-06-16"));
  const [endDate, setEndDate] = useState(new Date("2024-07-01"));

  const formatRange = (start, end) => {
    if (!start || !end) return "";
    return `${format(start, "MMM dd")} - ${format(end, "MMM dd")}`;
  };
  const { isSidebarOpen } = useToggle();
  return (
    <div className="flex-1 min-w-[300px] h-[384px] bg-white border border-gray-200 rounded-2xl p-6 shadow-sm font-sans">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Attendance</h2>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Custom Legend */}
          <div className="flex gap-4 text-sm font-medium">
            <span className="flex items-center gap-2 text-gray-700">
              <span className="w-3 h-3 rounded-full bg-[#248cd8]"></span> On
              Time
            </span>
            <span className="flex items-center gap-2 text-gray-700">
              <span className="w-3 h-3 rounded-full bg-[#00b172]"></span> Late
            </span>
            <span className="flex items-center gap-2 text-gray-700">
              <span className="w-3 h-3 rounded-full bg-[#09182b]"></span>{" "}
              Absents
            </span>
          </div>

          {/* Date Range Picker */}
          <DatePicker
            selected={startDate}
            onChange={(dates) => {
              const [start, end] = dates;
              setStartDate(start);
              setEndDate(end);
            }}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            customInput={
              <CustomDateInput value={formatRange(startDate, endDate)} />
            }
          />
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 0, right: 20, bottom: 0, left: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e5e7eb"
          />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
            ticks={[0, 20, 40, 60, 80, 100]}
          />
          <Tooltip
            formatter={(value) => [`${value}%`, ""]}
            labelStyle={{ fontWeight: "bold", color: "#000" }}
            contentStyle={{
              borderRadius: "8px",
              fontSize: "14px",
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          />

          {/* Area fills */}
          <Area
            type="monotone"
            dataKey="onTime"
            stroke={false}
            fill="rgba(36, 140, 216, 0.1)"
            activeDot={false}
          />
          <Area
            type="monotone"
            dataKey="late"
            stroke={false}
            fill="rgba(0, 177, 114, 0.1)"
            activeDot={false}
          />
          <Area
            type="monotone"
            dataKey="absent"
            stroke={false}
            fill="rgba(9, 24, 43, 0.1)"
            activeDot={false}
          />

          {/* Lines */}
          <Line
            type="monotone"
            dataKey="onTime"
            stroke="#248cd8"
            strokeWidth={2}
            dot={{ r: 4, stroke: "#fff", strokeWidth: 2, fill: "#248cd8" }}
          />
          <Line
            type="monotone"
            dataKey="late"
            stroke="#00b172"
            strokeWidth={2}
            dot={{ r: 4, stroke: "#fff", strokeWidth: 2, fill: "#00b172" }}
          />
          <Line
            type="monotone"
            dataKey="absent"
            stroke="#09182b"
            strokeWidth={2}
            dot={{ r: 4, stroke: "#fff", strokeWidth: 2, fill: "#09182b" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
