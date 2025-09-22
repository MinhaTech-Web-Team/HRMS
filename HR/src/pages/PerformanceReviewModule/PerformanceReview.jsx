import React, { useState } from "react";
import { Search, Download, CalendarDays } from "lucide-react";
import { dummyPerformanceReviews } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { useToggle } from "../../context/Toggle";
import { format } from "date-fns";

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

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full border-b">
        <div className="px-4 py-6 flex items-center gap-3 font-semibold text-3xl tracking-tighter">
          <img onClick={toggleSidebar} src="/toggle.png" alt="" />
          <h1 className="text-[#09182B]">Performance Review</h1>
        </div>
      </div>

      {/* Top Bar */}
      <div className="px-[39px] py-7 flex justify-between items-center">
        {/* All Employees Button */}
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
          <div className="w-64 px-4 py-3 bg-neutral-200/30 rounded-[5px] inline-flex justify-start items-center gap-2.5">
            <Search size={20} className="text-zinc-900 shrink-0 block" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 bg-transparent outline-none text-zinc-900/50 text-base placeholder:text-zinc-900/50"
            />
          </div>

          <button className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-lg px-5 py-3 flex items-center gap-2">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="px-[37px]">
        <div className="bg-[#E3E3E3]/15 rounded-lg p-[37px] space-y-3 overflow-x-auto">
          <table className="w-full min-w-[1024px] text-left text-[#09182B] text-[15px] border-separate border-spacing-y-[13px]">
            {/* Table Head */}
            <thead>
              <tr className="bg-[#EAEAEA] rounded-lg text-[16px] font-bold">
                <th className="px-5 py-6">Select</th>
                <th className="px-5 py-6">Employee Name</th>
                <th className="px-5 py-6">Employee ID</th>
                <th className="px-5 py-6">Department</th>
                <th className="px-5 py-6">Working Days</th>
                <th className="px-5 py-6">Projects</th>
                <th className="px-5 py-6">Leaves</th>
                <th className="px-5 py-6">Status</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {dummyPerformanceReviews.map((att, index) => (
                <tr
                  key={att.id}
                  className={`rounded-lg shadow-sm relative ${
                    index % 2 === 1 ? "bg-[#EAEAEA]/50" : "bg-white"
                  }`}
                >
                  <td className="px-[18px] py-[21px]">
                    <input type="checkbox" className="w-5 h-5" />
                  </td>
                  <td className="px-[18px] py-[21px] font-medium">
                    {att.name}
                  </td>
                  <td className="px-[18px] py-[21px] font-medium">
                    {att.employeeId}
                  </td>
                  <td className="px-[18px] py-[21px]">
                    {att.department || "-"}
                  </td>
                  <td className="px-[18px] py-[21px]">
                    {att.workingDays || "-"}
                  </td>
                  <td className="px-[18px] py-[21px]">{att.projects || "-"}</td>
                  <td className="px-[18px] py-[21px]">{att.leaves || "-"}</td>

                  <td className="px-[18px] py-[21px]">
                    <button
                      onClick={() => handleStatusClick(att)}
                      className={`px-3 py-1 rounded-md text-sm text-white whitespace-nowrap inline-block text-center cursor-pointer ${
                        att.status === "Add Feedback"
                          ? "bg-[#0E9EE7] hover:bg-sky-600"
                          : "bg-[#00B172] hover:bg-green-600"
                      }`}
                    >
                      {att.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

export default PerformanceReview;

// import React from "react";
// import { Search, Download } from "lucide-react";
// import { dummyPerformanceReviews } from "../../assets/assets";
// import { useNavigate } from "react-router-dom";
// import { useToggle } from "../../context/Toggle";

// const PerformanceReview = () => {
//   const { toggleSidebar } = useToggle();
//   const navigate = useNavigate();

//   const handleStatusClick = (att) => {
//     if (att.status === "View Feedback") {
//       navigate("/view-feedback", { state: { review: att } });
//     } else if (att.status === "Add Feedback") {
//       navigate("/add-feedback", { state: { review: att } });
//     }
//   };

//   return (
//     <div className="bg-white w-full min-h-screen flex flex-col">
//       {/* Header */}
//       <div className="w-full border-b">
//         <div className="px-4 sm:px-6 py-4 sm:py-6 flex items-center gap-3 font-semibold text-xl sm:text-3xl tracking-tighter">
//           <img
//             onClick={toggleSidebar}
//             src="/toggle.png"
//             alt="Toggle sidebar"
//             className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer"
//           />
//           <h1 className="text-[#09182B]">Leave Management</h1>
//         </div>
//       </div>

//       {/* Top Bar */}
//       <div className="px-4 sm:px-[39px] py-4 sm:py-7 flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-start sm:items-center">
//         {/* All Employees Button */}
//         <button
//           onClick={() => navigate("/leaves-allemployees")}
//           className="bg-[#0E9EE7] px-4 sm:px-6 py-2 sm:py-3 rounded-lg cursor-pointer text-white text-sm sm:text-base font-bold hover:bg-sky-600 w-full sm:w-auto text-center"
//         >
//           All Employees
//         </button>

//         <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
//           {/* Search Box */}
//           <div className="w-full sm:w-64 px-3 sm:px-4 py-2 sm:py-3 bg-neutral-200/30 rounded-[5px] inline-flex justify-start items-center gap-2.5">
//             <Search size={18} className="text-zinc-900 shrink-0 block" />
//             <input
//               type="text"
//               placeholder="Search"
//               className="flex-1 bg-transparent outline-none text-zinc-900/50 text-sm sm:text-base placeholder:text-zinc-900/50 w-full"
//             />
//           </div>

//           <button className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-lg px-4 sm:px-5 py-2 sm:py-3 flex items-center justify-center gap-2 w-full sm:w-auto">
//             <Download size={16} />
//             Export
//           </button>
//         </div>
//       </div>

//       {/* Table Container */}
//       <div className="px-2 sm:px-[37px] pb-4 sm:pb-0 flex-1">
//         <div className="bg-[#E3E3E3]/15 rounded-lg p-4 sm:p-[37px] space-y-3 overflow-x-auto">
//           {/* Scrollable Table */}
//           <div className="min-w-[1024px]">
//             <table className="w-full text-left text-[#09182B] text-sm sm:text-[15px] border-separate border-spacing-y-2 sm:border-spacing-y-[13px]">
//               {/* Table Head */}
//               <thead>
//                 <tr className="bg-[#EAEAEA] rounded-lg text-sm sm:text-[16px] font-bold">
//                   <th className="px-3 sm:px-5 py-3 sm:py-6">Select</th>
//                   <th className="px-3 sm:px-5 py-3 sm:py-6">Employee Name</th>
//                   <th className="px-3 sm:px-5 py-3 sm:py-6">Employee ID</th>
//                   <th className="px-3 sm:px-5 py-3 sm:py-6">Department</th>
//                   <th className="px-3 sm:px-5 py-3 sm:py-6">Working Days</th>
//                   <th className="px-3 sm:px-5 py-3 sm:py-6">Projects</th>
//                   <th className="px-3 sm:px-5 py-3 sm:py-6">Leaves</th>
//                   <th className="px-3 sm:px-5 py-3 sm:py-6">Status</th>
//                 </tr>
//               </thead>

//               {/* Table Body */}
//               <tbody>
//                 {dummyPerformanceReviews.map((att, index) => (
//                   <tr
//                     key={att.id}
//                     className={`rounded-lg shadow-sm relative ${
//                       index % 2 === 1 ? "bg-[#EAEAEA]/50" : "bg-white"
//                     }`}
//                   >
//                     <td className="px-3 sm:px-[18px] py-3 sm:py-[21px]">
//                       <input
//                         type="checkbox"
//                         className="w-4 h-4 sm:w-5 sm:h-5"
//                       />
//                     </td>
//                     <td className="px-3 sm:px-[18px] py-3 sm:py-[21px] font-medium">
//                       {att.name}
//                     </td>
//                     <td className="px-3 sm:px-[18px] py-3 sm:py-[21px] font-medium">
//                       {att.employeeId}
//                     </td>
//                     <td className="px-3 sm:px-[18px] py-3 sm:py-[21px]">
//                       {att.department || "-"}
//                     </td>
//                     <td className="px-3 sm:px-[18px] py-3 sm:py-[21px]">
//                       {att.workingDays || "-"}
//                     </td>
//                     <td className="px-3 sm:px-[18px] py-3 sm:py-[21px]">
//                       {att.projects || "-"}
//                     </td>
//                     <td className="px-3 sm:px-[18px] py-3 sm:py-[21px]">
//                       {att.leaves || "-"}
//                     </td>

//                     <td className="px-3 sm:px-[18px] py-3 sm:py-[21px]">
//                       <button
//                         onClick={() => handleStatusClick(att)}
//                         className={`px-2 sm:px-3 py-1 sm:py-1 rounded-md text-xs sm:text-sm text-white whitespace-nowrap inline-block text-center cursor-pointer w-full sm:w-auto ${
//                           att.status === "Add Feedback"
//                             ? "bg-[#0E9EE7] hover:bg-sky-600"
//                             : "bg-[#00B172] hover:bg-green-600"
//                         }`}
//                       >
//                         {att.status}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-end items-center gap-2 px-4 sm:px-[37px] py-4 sm:py-6">
//         <button className="px-3 sm:px-4 py-1 sm:py-2 rounded-md border border-gray-300 hover:bg-gray-100 text-sm sm:text-base">
//           1
//         </button>
//         <button className="px-3 sm:px-4 py-1 sm:py-2 rounded-md border border-gray-300 hover:bg-gray-100 text-sm sm:text-base">
//           2
//         </button>
//         <button className="px-3 sm:px-4 py-1 sm:py-2 rounded-md border border-gray-300 hover:bg-gray-100 text-sm sm:text-base">
//           3
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PerformanceReview;
