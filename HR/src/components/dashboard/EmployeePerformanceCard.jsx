import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FiCalendar } from "react-icons/fi";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useToggle } from "../../context/Toggle";

// Sample data
const data = [
  { month: "Oct 2021", high: 6, low: 4 },
  { month: "Nov 2021", high: 8, low: 6 },
  { month: "Dec 2021", high: 5, low: 4 },
  { month: "Jan 2022", high: 9, low: 7 },
  { month: "Feb 2022", high: 8, low: 8 },
  { month: "Mar 2022", high: 7, low: 6 },
];

// Custom tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 shadow-md px-3 py-2 rounded text-xs">
        <p className="text-emerald-600 font-medium">
          {payload[0].value} Employee
        </p>
        <p className="text-sky-500 font-medium">{payload[1].value} Employee</p>
      </div>
    );
  }
  return null;
};

// Custom date input component
const CustomDateInput = ({ value, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center text-[10px] text-gray-600 border border-gray-300 rounded px-2 py-[2px] space-x-1 focus:outline-none"
  >
    <FiCalendar className="w-3 h-3" />
    <span>{value}</span>
  </button>
);

export default function EmployeePerformanceChart() {
  const [startDate, setStartDate] = useState(new Date("2024-06-16"));
  const [endDate, setEndDate] = useState(new Date("2024-07-01"));
  const { isSidebarOpen } = useToggle();
  return (
    <div className="flex-1 min-w-[320px] h-[320px] bg-white rounded-[20px] border border-gray-200 p-5 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-bold text-gray-800">
          Employee Performance
        </h2>
      </div>

      {/* Legend and Date Picker in one row */}
      <div className="flex justify-between items-center mb-2">
        {/* Legend */}
        <div className="flex space-x-6 text-[10px] font-medium text-gray-500">
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            <span>High Performance</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
            <span>Low Performance</span>
          </div>
        </div>

        {/* Date Picker */}
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
          customInput={<CustomDateInput />}
        />
      </div>

      {/* Chart */}
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              stroke="#f3f4f6"
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 9, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 9, fill: "#6b7280" }}
              domain={[0, 12]}
              axisLine={false}
              tickLine={false}
              ticks={[0, 2, 4, 6, 8, 10, 12]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="high"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ r: 3, fill: "#10B981", strokeWidth: 0 }}
              activeDot={{ r: 4, fill: "#10B981" }}
            />
            <Line
              type="monotone"
              dataKey="low"
              stroke="#0EA5E9"
              strokeWidth={2}
              dot={{ r: 3, fill: "#0EA5E9", strokeWidth: 0 }}
              activeDot={{ r: 4, fill: "#0EA5E9" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
