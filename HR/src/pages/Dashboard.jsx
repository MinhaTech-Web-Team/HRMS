import React from "react";
import {
  Search,
  Bell,
  Users,
  DollarSign,
  ClipboardList,
  ArrowUp,
  ArrowDown,
  PenSquare,
} from "lucide-react";

// import DashboardCards from "../components/DashboardCards";
// import AttendanceChart from "../components/AttendernceChart";
// import EmployeeApplications from "../components/EmployeeApplications";
// import ProjectListCard from "../components/ProjectListCard";
// import EmployeePerformanceChart from "../components/EmployeePerformanceCard";
import { useToggle } from "../context/Toggle";
import DashboardCards from "./../components/dashboard/DashboardCards";
import AttendanceChart from "../components/dashboard/AttendernceChart";
import EmployeeApplications from "./../components/dashboard/EmployeeApplications";
import ProjectListCard from "./../components/dashboard/ProjectListCard";
import EmployeePerformanceChart from "./../components/dashboard/EmployeePerformanceCard";
import { useNavigate } from "react-router-dom";
import ToggleButton from "../components/ToggleButton";
import SearchBar from "../components/SearchBar";

const Dashboard = () => {
  const { toggleSidebar, isSidebarOpen } = useToggle();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6 flex flex-col gap-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <ToggleButton
            checked={isSidebarOpen}
            onChange={toggleSidebar}
            label=""
          />
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold text-gray-800">Hello Namra</h1>
            <p className="text-gray-500 text-sm">Good Morning</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <SearchBar />
          <div className="bg-gray-100 h-9 w-9 flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
            <Bell
              onClick={() => navigate("/notifications")}
              className="text-gray-500"
              size={22}
            />
          </div>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <DashboardCards
          title="Total Employee"
          value="560"
          percentage="12%"
          percentageColor="bg-emerald-500"
          icon={<Users size={22} className="text-blue-500" />}
          arrowIcon={<ArrowUp size={10} className="text-white" />}
        />
        <DashboardCards
          title="Total Expense"
          value="1050"
          percentage="5%"
          percentageColor="bg-emerald-500"
          icon={<DollarSign size={22} className="text-blue-500" />}
          arrowIcon={<ArrowDown size={10} className="text-white" />}
        />
        <DashboardCards
          title="Today Attendance"
          value="470"
          percentage="8%"
          percentageColor="bg-emerald-500"
          icon={<ClipboardList size={22} className="text-blue-500" />}
          arrowIcon={<ArrowUp size={10} className="text-white" />}
        />
        <DashboardCards
          title="Total Projects"
          value="250"
          percentage="12%"
          percentageColor="bg-emerald-500"
          icon={<PenSquare size={22} className="text-blue-500" />}
          arrowIcon={<ArrowUp size={10} className="text-white" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="">
          <AttendanceChart />
        </div>
        <div className="">
          <EmployeeApplications />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="">
          <ProjectListCard />
        </div>
        <div className="">
          <EmployeePerformanceChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
