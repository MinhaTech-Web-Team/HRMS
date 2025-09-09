import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useToggle } from "../context/Toggle";

const data = [
  { name: "Pending", value: 1, color: "#D9D9D9" }, // gray-300
  { name: "Approved", value: 8, color: "#5ABAEB" }, // light blue
  { name: "Rejected", value: 1, color: "#00B172" }, // green
];

const COLORS = data.map((entry) => entry.color);

export default function EmployeeApplications() {
  const { isSidebarOpen } = useToggle();

  return (
    <div
      className={` ${
        !isSidebarOpen ? "w-[484px]" : "w-[414px]"
      } h-[384px] bg-white border border-gray-200 rounded-2xl p-6 shadow-sm font-sans`}
    >
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-900 mb-1">
        Employee Applications
      </h2>

      {/* Total */}
      <p className="text-sm text-gray-900 font-semibold mb-4">
        10 Total applications
      </p>

      {/* Legend */}
      <div className="flex gap-10 ">
        <div className="mt-4 space-y-2 text-sm text-gray-700">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <span
                className="w-2 h-4 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
              <span>
                {item.value} {item.name}
              </span>
            </div>
          ))}
        </div>
        {/* Chart */}

        <ResponsiveContainer width={200} height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={92}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
