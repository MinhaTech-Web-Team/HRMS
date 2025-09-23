import React, { useState } from "react";
import { useToggle } from "../../context/Toggle";
import { useNavigate } from "react-router-dom";
import { Download, Search } from "lucide-react";
import { MdEvent, MdHolidayVillage, MdMeetingRoom } from "react-icons/md";
import Holiday from "../../components/Announcement/Holidays/Holiday";
import { CgAdd } from "react-icons/cg";
import AddHoliday from "../../components/Announcement/Holidays/AddHoliday";
import Meeting from "../../components/Announcement/Meetings/Meeting";
import AddMeeting from "../../components/Announcement/Meetings/AddMeeting";
import Event from "../../components/Announcement/Events/Events";
import AddEvent from "../../components/Announcement/Events/AddEvent";

const Announcements = () => {
  const { toggleSidebar } = useToggle();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Holidays");
  const [holidayModalOpen, setHolidayModalOpen] = useState(false);
  const [meetingModalOpen, setMeetingModalOpen] = useState(false);
  const [eventModalOpen, setEventModalOpen] = useState(false);

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full border-b">
        <div className="px-4 py-6 flex items-center gap-3 font-semibold text-3xl tracking-tighter">
          <img onClick={toggleSidebar} src="/toggle.png" alt="toggle" />
          <h1 className="text-[#09182B]">Announcement Board</h1>
        </div>
      </div>

      {/* Top Bar with Tabs + Search + Export */}
      <div className="px-6 py-4 flex justify-between items-center ">
        {/* Tabs */}
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab("Holidays")}
            className={`flex items-center gap-2 text-[16px] font-semibold ${
              activeTab === "Holidays"
                ? "text-[#0E9EE7] border-b-[3px] border-[#0E9EE7]"
                : "text-gray-500 hover:text-[#0E9EE7]"
            }`}
          >
            <MdHolidayVillage size={22} />
            Holidays
          </button>

          <button
            onClick={() => setActiveTab("Meetings")}
            className={`flex items-center gap-2 text-[16px] font-semibold ${
              activeTab === "Meetings"
                ? "text-[#0E9EE7] border-b-[3px] border-[#0E9EE7]"
                : "text-gray-500 hover:text-[#0E9EE7]"
            }`}
          >
            <MdMeetingRoom size={22} />
            Meetings
          </button>

          <button
            onClick={() => setActiveTab("Events")}
            className={`flex items-center gap-2 text-[16px] font-semibold ${
              activeTab === "Events"
                ? "text-[#0E9EE7] border-b-[3px] border-[#0E9EE7]"
                : "text-gray-500 hover:text-[#0E9EE7]"
            }`}
          >
            <MdEvent size={22} />
            Events
          </button>
        </div>

        {/* Search + Export */}
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

          {activeTab === "Holidays" && (
            <button
              onClick={() => setHolidayModalOpen(true)}
              className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-lg px-5 py-3 flex items-center gap-2"
            >
              <CgAdd size={22} />
              New Holiday
            </button>
          )}
          {activeTab === "Meetings" && (
            <button
              onClick={() => setMeetingModalOpen(true)}
              className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-lg px-5 py-3 flex items-center gap-2"
            >
              <CgAdd size={22} />
              New Meeting
            </button>
          )}
          {activeTab === "Events" && (
            <button
              onClick={() => setEventModalOpen(true)}
              className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-lg px-5 py-3 flex items-center gap-2"
            >
              <CgAdd size={22} />
              New Event
            </button>
          )}
        </div>
      </div>
      <div className="inset-0 z-50 w-full h-full flex justify-center items-center mx-auto  ">
        {holidayModalOpen && (
          <AddHoliday setHolidayModalOpen={setHolidayModalOpen} />
        )}
        {meetingModalOpen && (
          <AddMeeting setMeetingModalOpen={setMeetingModalOpen} />
        )}
        {eventModalOpen && <AddEvent setEventModalOpen={setEventModalOpen} />}
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === "Holidays" && <Holiday />}
        {activeTab === "Meetings" && <Meeting />}
        {activeTab === "Events" && <Event />}
      </div>
    </div>
  );
};

export default Announcements;
