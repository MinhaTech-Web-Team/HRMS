import { useToggle } from "../../context/Toggle";

const projects = [
  {
    id: "01",
    name: "Home Decore Range",
    popularity: 80,
    status: "Pending",
    statusColor: "bg-slate-900",
    barColor: "bg-slate-900",
  },
  {
    id: "02",
    name: "Disney Princess Dress",
    popularity: 100,
    status: "Completed",
    statusColor: "bg-emerald-500",
    barColor: "bg-emerald-500",
  },
  {
    id: "04",
    name: "Bathroom Essentials",
    popularity: 50,
    status: "In Progress",
    statusColor: "bg-sky-500",
    barColor: "bg-sky-500",
  },
  {
    id: "05",
    name: "Bathroom Essentials",
    popularity: 50,
    status: "In Progress",
    statusColor: "bg-sky-500",
    barColor: "bg-sky-500",
  },
  {
    id: "06",
    name: "Bathroom Essentials",
    popularity: 50,
    status: "In Progress",
    statusColor: "bg-sky-500",
    barColor: "bg-sky-500",
  },
  {
    id: "07",
    name: "Bathroom Essentials",
    popularity: 50,
    status: "In Progress",
    statusColor: "bg-sky-500",
    barColor: "bg-sky-500",
  },
];

export default function ProjectListCard() {
  const { isSidebarOpen } = useToggle();
  return (
    <div
      className={`${
        !isSidebarOpen ? "w-[631px]" : "w-[539px]"
      } h-[320px] bg-white rounded-[10px] border border-gray-200 px-4 py-3 font-sans shadow-sm flex flex-col`}
    >
      {/* Header */}
      <h2 className="text-base font-semibold text-slate-900 mb-2">Project</h2>

      {/* Table Header */}
      <div className="grid grid-cols-4 text-sm font-medium text-zinc-500 px-2 mb-1">
        <div className="w-10">#</div>
        <div>Name</div>
        <div>Popularity</div>
        <div>Complete</div>
      </div>

      <div className="border-t border-gray-100 mb-1" />

      {/* Scrollable Table Body (fills available height) */}
      <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
        {projects.map((project) => (
          <div
            key={project.id}
            className="grid grid-cols-4 items-center text-sm text-slate-900 px-2 py-2 gap-3"
          >
            {/* ID */}
            <div className="w-10 font-medium">{project.id}</div>

            {/* Name */}
            <div className="text-[10px] font-medium">{project.name}</div>

            {/* Popularity Bar */}
            <div className="flex items-center">
              <div className="w-40 h-[6px] bg-gray-200 rounded-full relative overflow-hidden">
                <div
                  className={`h-full ${project.barColor} rounded-full`}
                  style={{ width: `${project.popularity}%` }}
                ></div>
              </div>
            </div>

            {/* Status */}
            <div>
              <span
                className={`text-white text-[10px] font-semibold px-3 py-1 rounded ${project.statusColor}`}
              >
                {project.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
