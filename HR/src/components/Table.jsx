// src/components/common/Table.jsx
import React from "react";

const Table = ({ columns, data, renderRow }) => {
  return (
    <div className="overflow-x-auto">
      <div className="bg-[#E3E3E3]/15 rounded-lg p-[37px] space-y-3">
        {/* Header */}
        <div
          className={`grid gap-6 bg-[#EAEAEA] rounded-lg px-5 py-6 font-bold text-[#09182B] text-[15px] md:text-[16px]`}
          style={{
            gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
          }}
        >
          {columns.map((col, i) => (
            <div key={i}>{col}</div>
          ))}
        </div>

        {/* Rows */}
        {data.map((row, index) => (
          <div
            key={row.id || index}
            className={`grid gap-6 items-center rounded-lg px-[18px] py-[21px] shadow-sm hover:bg-gray-100 text-[#09182B] text-[14px] md:text-[15px] ${
              index % 2 === 1 ? "bg-[#EAEAEA]/50" : "bg-white"
            }`}
            style={{
              gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
            }}
          >
            {renderRow(row, index)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
