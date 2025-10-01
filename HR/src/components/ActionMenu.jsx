// src/components/ActionMenu.jsx
import React, { useEffect, useRef } from "react";
import { MoreVertical } from "lucide-react";

const ActionMenu = ({ emp, openActionMenu, setOpenActionMenu, actions }) => {
  const menuRef = useRef(null);

  // ✅ Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenActionMenu(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [setOpenActionMenu]);

  return (
    <div ref={menuRef} className="relative inline-block">
      {/* Toggle Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpenActionMenu((prev) => (prev === emp.id ? null : emp.id));
        }}
        className="rounded hover:bg-gray-200 p-1"
      >
        <MoreVertical size={18} />
      </button>

      {/* Dropdown Menu */}
      {openActionMenu === emp.id && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-30 bg-white rounded-xl shadow-xl z-50">
          <ul className="py-2 text-sm text-[#09182B] font-medium">
            {actions.map((action, index) => (
              <li
                key={index}
                onClick={() => {
                  action.onClick(emp);
                  setOpenActionMenu(null);
                }}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <action.icon className="w-4 h-4" />
                {action.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
