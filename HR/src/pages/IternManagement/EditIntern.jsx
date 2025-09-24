import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyInterns } from "../../assets/assets";

const EditIntern = () => {
  const [intern, setIntern] = useState(null); // single intern
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const foundIntern = dummyInterns.find(
      (item) => String(item.id) === String(id)
    );
    setIntern(foundIntern);
  }, [id]);

  if (!intern) return <div className="p-6">Loading intern details...</div>;

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 px-4 py-6 flex items-center gap-3 text-2xl font-semibold">
        <img
          src="/notifi.png"
          alt="back"
          onClick={() => navigate("/interns")}
          className="cursor-pointer"
        />
        <h1>Edit Intern</h1>
      </div>

      {/* Selected Intern Info */}
      <div className="pt-[32px] px-[31px] flex items-center gap-2">
        <div>
          <img
            src={intern?.image}
            alt="img"
            className="rounded-full w-[69px] h-[69px]"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="font-semibold text-[20px]">{intern?.internName}</h1>
          <h1 className="font-light text-[15px]">{intern?.department}</h1>
        </div>
      </div>

      {/* Table */}
      <div className="px-[34px] pt-[28px]">
        <div className="bg-[#E3E3E3]/15 rounded-lg p-[37px] overflow-x-auto">
          <table className="w-full min-w-[1024px] text-left text-[#09182B] text-[15px] border-separate border-spacing-y-[13px]">
            {/* Table Head */}
            <thead>
              <tr className="bg-[#EAEAEA] text-[15px] font-bold">
                <th className="px-5 py-6">Start Date</th>
                <th className="px-5 py-6">Intern Name</th>
                <th className="px-5 py-6">Department</th>
                <th className="px-5 py-6">Duration</th>
                <th className="px-5 py-6">Type</th>
                <th className="px-5 py-6">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              <tr className="rounded-lg shadow-sm bg-white">
                <td className="px-5 py-6">{intern.startDate}</td>
                <td className="px-5 py-6">{intern.internName}</td>
                <td className="px-5 py-6 font-medium">{intern.department}</td>
                <td className="px-5 py-6 font-medium">{intern.duration}</td>
                <td className="px-5 py-6">{intern.type}</td>

                {/* Save Button instead of dropdown */}
                <td className="px-5 py-6">
                  <button className="bg-[#0E9EE7] text-white px-5 py-1 rounded-lg ">
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

export default EditIntern;
