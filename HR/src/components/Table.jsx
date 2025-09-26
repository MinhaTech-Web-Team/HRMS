// // src/components/common/Table.jsx
// import React from "react";

// const Table = ({ columns, data, renderRow }) => {
//   return (
//     <div className="bg-[#E3E3E3]/15 rounded-lg p-[37px] space-y-3 overflow-x-auto">
//       <table className="w-full  text-left text-[#09182B] text-[15px] border-separate border-spacing-y-[13px]">
//         {/* Header */}
//         <thead>
//           <tr className="bg-[#EAEAEA] rounded-lg text-[16px] font-bold">
//             {columns.map((col, i) => (
//               <th key={i} className="px-5 py-6 whitespace-nowrap">
//                 {col}
//               </th>
//             ))}
//           </tr>
//         </thead>

//         {/* Rows */}
//         <tbody>
//           {data.map((row, index) => (
//             <tr
//               key={row.id || index}
//               className={`rounded-lg shadow-sm whitespace-nowrap ${
//                 index % 2 === 1 ? "bg-[#EAEAEA]/50" : "bg-white"
//               }`}
//             >
//               {renderRow(row, index).map((cell, i) => (
//                 <td key={i} className="px-[19px] py-[22px] ">
//                   {cell}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;

// src/components/common/Table.jsx
import React from "react";

const Table = ({ columns, data, renderRow }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
      <table className="w-full text-sm text-left rtl:text-right text-gray-700 ">
        {/* Header */}
        <thead className="text-xs uppercase bg-white border-b border-gray-200">
          <tr>
            {columns.map((col, i) => (
              <th key={i} scope="col" className="px-6 py-3 font-semibold">
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
              className="bg-white border-b border-gray-200"
            >
              {renderRow(row, index).map((cell, i) => (
                <td key={i} className="px-6 py-4">
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
