import React, { useState, useRef } from "react";

const Documents = () => {
  const defaultImage = "/photo.png"; // Default preview image

  const [files, setFiles] = useState({
    appointment: null,
    salary: null,
    relieving: null,
    experience: null,
  });

  const fileRefs = {
    appointment: useRef(null),
    salary: useRef(null),
    relieving: useRef(null),
    experience: useRef(null),
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setFiles((prev) => ({ ...prev, [field]: imageUrl }));
    } else {
      setFiles((prev) => ({ ...prev, [field]: defaultImage }));
    }
  };

  const handleUploadClick = (field) => {
    fileRefs[field].current.click();
  };

  const labelClass = "text-black text-[16px] mb-2 font-semibold";

  const renderCard = (label, field) => (
    <div className="w-full flex flex-col">
      <label className={labelClass}>{label}</label>
      <div onClick={() => handleUploadClick(field)}>
        <img
          src={files[field] || defaultImage}
          alt={label}
          className="h-full w-auto object-contain"
        />
      </div>
      <input
        type="file"
        accept="image/*,application/pdf"
        ref={fileRefs[field]}
        onChange={(e) => handleFileChange(e, field)}
        style={{ display: "none" }}
      />
    </div>
  );

  return (
    <div className="px-6 py-10 flex flex-col gap-8">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderCard("Upload Appointment Letter", "appointment")}
        {renderCard("Upload Salary Slips", "salary")}
        {renderCard("Upload Reliving Letter", "relieving")}
        {renderCard("Upload Experience Letter", "experience")}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-10">
        <button className="px-6 py-2 rounded border border-gray-300 text-gray-600">
          Cancel
        </button>
        <button className="px-6 py-2 rounded bg-[#0E9EE7] text-white hover:bg-blue-600">
          Save
        </button>
      </div>
    </div>
  );
};

export default Documents;
