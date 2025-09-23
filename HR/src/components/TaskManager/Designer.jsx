import React, { useState } from "react";
import { dummyTasks, dummyEmployees } from "../../assets/assets";
import { Flag } from "lucide-react";

const Designer = () => {
  const handleStatusClick = (task) => {
    console.log("Clicked task:", task);
  };

  // Helper: Get employee details by IDs
  const getEmployeesByIds = (ids) => {
    return ids.map((id) => dummyEmployees.find((emp) => emp.employeeId === id));
  };

  // Modal control state
  const [selectedDescription, setSelectedDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (description) => {
    setSelectedDescription(description);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDescription("");
  };

  return (
    <div>
      {/* Table */}
      <div className="bg-[#E3E3E3]/15 rounded-lg p-[37px] space-y-3 overflow-x-auto">
        <table className="w-full min-w-[1024px] text-left text-[#09182B] text-[15px] border-separate border-spacing-y-[13px]">
          <thead>
            <tr className="bg-[#EAEAEA] rounded-lg text-[16px] font-bold">
              <th className="px-5 py-6">Select</th>
              <th className="px-5 py-6">Task Title</th>
              <th className="px-5 py-6">Description</th>
              <th className="px-5 py-6">Deadline</th>
              <th className="px-5 py-6">Priority</th>
              <th className="px-5 py-6">Assigned To</th>
              <th className="px-5 py-6">Status</th>
            </tr>
          </thead>
          <tbody>
            {dummyTasks.map((task, index) => (
              <tr
                key={task.id}
                className={`rounded-lg shadow-sm relative ${
                  index % 2 === 1 ? "bg-[#EAEAEA]/50" : "bg-white"
                }`}
              >
                <td className="px-[18px] py-[21px]">
                  <input type="checkbox" className="w-5 h-5" />
                </td>
                <td className="px-[18px] py-[21px] font-medium">
                  {task.title}
                </td>

                {/* Description with (more) */}
                <td className="px-[18px] py-[21px] max-w-[300px]">
                  <p className="truncate">This App packs Your...</p>
                  <span
                    onClick={() => openModal(task.description)}
                    className="text-[#0E9EE7] cursor-pointer"
                  >
                    (more)
                  </span>
                </td>

                <td className="px-[18px] py-[21px]">{task.deadline}</td>

                <td className="px-[18px] py-[21px] whitespace-nowrap">
                  <div className="flex items-center gap-2 min-w-[120px]">
                    <Flag
                      size={18}
                      className={
                        task.priority === "High"
                          ? "text-[#F45B69]"
                          : "text-[#0E9EE7]"
                      }
                      fill={task.priority === "High" ? "red" : "blue"}
                    />
                    {task.priority}
                  </div>
                </td>

                <td className="px-[18px] py-[21px] whitespace-nowrap">
                  <div className="flex -space-x-2 min-w-[120px]">
                    {getEmployeesByIds(task.assignedTo).map(
                      (emp, idx) =>
                        emp && (
                          <img
                            key={idx}
                            src={emp.image}
                            alt={emp.name}
                            title={emp.name}
                            className="w-9 h-9 rounded-full border-2 border-white"
                          />
                        )
                    )}
                  </div>
                </td>

                <td className="px-[18px] py-[21px]">
                  <button
                    onClick={() => handleStatusClick(task)}
                    className={`px-3 py-1 rounded-md text-sm text-white whitespace-nowrap inline-block text-center cursor-pointer ${
                      task.status === "In Progress"
                        ? "bg-[#0E9EE7] hover:bg-sky-600"
                        : task.status === "Completed"
                        ? "bg-[#00B172] hover:bg-green-600"
                        : "bg-gray-500 hover:bg-gray-600"
                    }`}
                  >
                    {task.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-lg font-semibold mb-4">Description</h2>
            <p className="text-gray-700 mb-4">{selectedDescription}</p>
            <div className="text-right">
              <button
                onClick={closeModal}
                className="bg-[#0E9EE7] hover:bg-sky-600 text-white py-2 px-6 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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

export default Designer;
