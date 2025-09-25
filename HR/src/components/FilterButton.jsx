// src/components/FilterButton.jsx
import React from "react";
import { Filter } from "lucide-react";

const FilterButton = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium w-full sm:w-auto justify-center transition
        border border-[#0E9EE7] text-[#0E9EE7] hover:bg-blue-50
        ${isOpen ? "bg-blue-50" : "bg-transparent"}`}
    >
      <Filter size={16} />
      <span>Filter</span>
    </button>
  );
};

export default FilterButton;
