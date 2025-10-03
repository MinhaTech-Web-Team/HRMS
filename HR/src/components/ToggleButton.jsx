// src/components/ToggleButton.jsx
// import React from "react";

// const ToggleButton = ({ checked, onChange, label }) => {
//   return (
//     <label className="inline-flex items-center cursor-pointer">
//       {/* Hidden checkbox */}
//       <input
//         type="checkbox"
//         checked={checked}
//         onChange={onChange}
//         className="sr-only peer"
//       />

//       {/* Track (bar) */}
//       <div
//         className={`relative w-[56px] h-[25px] rounded-full transition-colors duration-300
//           ${checked ? "bg-[#1e3a8a]" : "bg-[#1e293b]"}
//         `}
//       >
//         {/* Circle (knob) */}
//         <div
//           className={`absolute top-1/2 left-0 -translate-y-1/2 w-[30px] h-[30px] rounded-full shadow-md transition-all duration-300
//             ${
//               checked
//                 ? "translate-x-[26px] bg-[#2563eb]"
//                 : "translate-x-0 bg-[#2563eb]"
//             }
//           `}
//         ></div>
//       </div>

//       {/* Optional label */}
//       {label && (
//         <span className="ml-3 text-sm font-medium text-white">{label}</span>
//       )}
//     </label>
//   );
// };

// export default ToggleButton;

// src/components/ToggleButton.jsx
import React from "react";

const ToggleButton = ({ checked, onChange, label }) => {
  return (
    <label className="inline-flex items-center cursor-pointer select-none">
      {/* Hidden checkbox */}
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />

      {/* Track (bar) */}
      <div
        className={`relative w-[56px] h-[25px] rounded-full transition-colors duration-300 
          ${checked ? "bg-[#0E9EE7]" : "bg-white border-3 border-[#0E9EE7]"}
        `}
      >
        {/* Circle (knob) */}
        <div
          className={`absolute top-1/2 ${
            checked ? "left-0" : "left-[-4px]"
          } -translate-y-1/2 w-[30px] h-[30px] rounded-full shadow-md transition-all duration-300
            ${
              checked
                ? "translate-x-[26px] bg-white border-2 border-[#0E9EE7]"
                : "translate-x-0 bg-[#0E9EE7]"
            }
          `}
        ></div>
      </div>

      {/* Optional label */}
      {label && (
        <span className="ml-3 text-sm font-medium text-gray-200">{label}</span>
      )}
    </label>
  );
};

export default ToggleButton;
