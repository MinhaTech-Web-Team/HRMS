import { Search } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const notifications = [
  {
    id: 1,
    img: "/Ellipse 949.png",
    title: "Leave Request",
    message: "@Talha send sick leave",
    time: "Just Now",
  },
  {
    id: 2,
    img: "/Ellipse 950.png",
    title: "Leave Accepted",
    message: "@Admin accepted Talha leave",
    time: "11:16 AM",
  },
  {
    id: 3,
    img: "/Ellipse 952.png",
    title: "Check In Issue",
    message: "@Simrah shared a message regarding check in issue",
    time: "09:00 AM",
  },
  {
    id: 4,
    img: "/Ellipse 949.png",
    title: "Password Update successfully",
    message: "@Muzna Your password has been updated successfully",
    time: "Yesterday",
  },
  {
    id: 5,
    img: "/Ellipse 949.png",
    title: "Password Update successfully",
    message: "@Muzna Your password has been updated successfully",
    time: "Yesterday",
  },
];

const Notifications = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col ">
      <div className="flex items-center justify-between px-8 py-6 font-semibold text-3xl tracking-tighter border border-b border-black/30">
        <div className="flex items-center gap-2">
          <img
            className="cursor-pointer"
            onClick={() => navigate("/")}
            src="/notifi.png"
            alt=""
          />
          <h1>Notifications</h1>
        </div>

        <div className="w-64 px-4 py-3 bg-neutral-200/30 rounded-[5px] inline-flex flex-col justify-center items-start gap-2.5">
          <div className="self-stretch inline-flex justify-start items-center gap-2.5">
            <Search size={20} className="text-zinc-900 shrink-0 block" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 bg-transparent outline-none text-zinc-900/50 text-base font-normal leading-normal placeholder:text-zinc-900/50"
            />
          </div>
        </div>
      </div>

      <div className="py-7 px-14">
        <div className="rounded-xl border border-[#A2A1A8]/20 p-5">
          {notifications.map((item, index) => (
            <div key={item.id}>
              <div className="flex items-start justify-between py-3">
                {/* Left: image + text */}
                <div className="flex items-start gap-3">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-[17px] font-semibold text-gray-900 ">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#A2A1A8]">{item.message}</p>
                  </div>
                </div>

                {/* Right: time */}
                <span className="text-sm text-gray-400 whitespace-nowrap">
                  {item.time}
                </span>
              </div>

              {/* Divider (not after last item) */}
              {index < notifications.length - 1 && (
                <div className="border-b border-gray-200" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
