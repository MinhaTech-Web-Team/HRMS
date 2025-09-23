import React, { useEffect, useState } from "react";
import { MdHolidayVillage } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { holidays } from "../../../assets/assets";
import { MoreVertical, Edit, Trash2 } from "lucide-react";

const EditHoliday = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null); // ✅ fixed destructuring
  const [openActionMenu, setOpenActionMenu] = useState(null);

  useEffect(() => {
    const holiday = holidays.find((h) => h.id === parseInt(id));
    if (holiday) {
      setData(holiday);
    }
  }, [id]);

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
        <h1>Edit Holiday</h1>
      </div>

      <div className="p-6 flex justify-between items-center">
        <button className="flex items-center gap-2 text-[16px] font-semibold text-[#0E9EE7] border-b-3 border-[#0E9EE7] p-2">
          <MdHolidayVillage size={22} />
          Holidays
        </button>
      </div>

      <div className="">
        <div className="bg-[#E3E3E3]/15 rounded-lg p-[37px] space-y-3 overflow-x-auto">
          <table className="w-full min-w-[1024px] text-left text-[#09182B] text-[15px] border-separate border-spacing-y-[13px]">
            {/* Table Head */}
            <thead>
              <tr className="bg-[#EAEAEA] rounded-lg text-[16px] font-bold">
                <th className="px-5 py-6">Date</th>
                <th className="px-5 py-6">Day</th>
                <th className="px-5 py-6">Holiday Name</th>
                <th className="px-5 py-6">Description</th>
                <th className="px-5 py-6">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {data ? (
                <tr
                  key={data.id}
                  className="rounded-lg shadow-sm relative bg-white"
                >
                  <td className="px-[18px] py-[21px]">{data.date}</td>
                  <td className="px-[18px] py-[21px]">{data.day}</td>
                  <td className="px-[18px] py-[21px] font-medium">
                    {data.name}
                  </td>
                  <td className="px-[18px] py-[21px]">{data.description}</td>

                  <td className="px-[18px] py-[21px]">
                    <button className="bg-[#0E9EE7] text-white px-5 py-1 rounded-lg ">
                      Save
                    </button>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-500">
                    No holiday found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EditHoliday;
