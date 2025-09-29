// src/components/common/Table.jsx
import React from "react";

const Table = ({ columns, data, renderRow }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white whitespace-nowrap">
      <table className="w-full text-sm text-left rtl:text-right text-black">
        {/* Header */}
        <thead className="uppercase bg-gray-200 border-b border-gray-400">
          <tr className="h-14">
            {columns.map((col, i) => (
              <th
                key={i}
                scope="col"
                className="px-6 py-3 font-semibold text-sm"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {data.map((row, index) => (
            <tr
              key={row.id || index}
              className="h-14 bg-white border-b border-gray-300"
            >
              {renderRow(row, index).map((cell, i) => (
                <td key={i} className="px-6 py-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
