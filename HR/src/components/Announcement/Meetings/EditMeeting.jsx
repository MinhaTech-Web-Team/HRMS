import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { meetings } from "../../../assets/assets";

const EditMeeting = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const meeting = meetings.find((m) => m.id === parseInt(id));
    if (meeting) {
      setData(meeting);
    }
  }, [id]);

  if (!data) {
    return (
      <div className="flex flex-col">
        <div className="border-b border-gray-200 px-4 py-6 flex items-center gap-3 text-2xl font-semibold">
          <img
            src="/notifi.png"
            alt="back"
            onClick={() => navigate("/announcements")}
            className="cursor-pointer"
          />
          <h1>Edit Meeting</h1>
        </div>
        <div className="text-center py-6 text-gray-500">No meeting found.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 px-4 py-6 flex items-center gap-3 text-2xl font-semibold">
        <img
          src="/notifi.png"
          alt="back"
          onClick={() => navigate("/announcements")}
          className="cursor-pointer"
        />
        <h1>Edit Meeting</h1>
      </div>

      {/* Table */}
      <div className="p-6">
        <div className="bg-[#E3E3E3]/15 rounded-lg p-[37px] overflow-x-auto">
          <table className="w-full min-w-[1024px] text-left text-[#09182B] text-[15px] border-separate border-spacing-y-[13px]">
            <thead>
              <tr className="bg-[#EAEAEA] rounded-lg text-[16px] font-bold">
                <th className="px-5 py-6">Date</th>
                <th className="px-5 py-6">Day</th>
                <th className="px-5 py-6">Meeting Purpose</th>
                <th className="px-5 py-6">Time</th>

                <th className="px-5 py-6">Employee name</th>
                <th className="px-5 py-6">Description</th>
                <th className="px-5 py-6">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="rounded-lg shadow-sm relative bg-white">
                <td className="px-[18px] py-[21px]">{data.date}</td>
                <td className="px-[18px] py-[21px]">{data.day}</td>
                <td className="px-[18px] py-[21px] font-medium">
                  {data.title}
                </td>
                <td className="px-[18px] py-[21px]">{data.time}</td>

                <td className="px-[18px] py-[21px]">
                  {data.employees.join(", ")}
                </td>
                <td className="px-[18px] py-[21px]">{data.description}</td>
                <td className="px-[18px] py-[21px]">
                  <button className="bg-[#0E9EE7] text-white px-5 py-1 rounded-lg">
                    Save
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EditMeeting;
