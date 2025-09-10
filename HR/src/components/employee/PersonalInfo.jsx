import React, { useRef, useState } from "react";

const PersonalInfo = () => {
  const [selectedPhoto, setSelectedPhoto] = useState("/Profile Photo.png");
  const fileInputRef = useRef(null);

  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedPhoto(imageUrl);
    }
  };

  const inputClass =
    "px-[30px] py-[10px] w-full h-[56px] bg-white border border-[#E3E3E34D] rounded-[12px] text-sm outline-none";

  const labelClass = "text-black text-[16px] mb-1 text-semibold  ";
  return (
    <div>
      {/* Form Content */}
      <div className="px-1 py-10 flex flex-col gap-5">
        {/* Photo */}
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={handlePhotoClick}
        >
          <img
            src={selectedPhoto}
            alt="Profile"
            className="w-24 h-24 object-cover "
          />
          <h1 className="font-semibold text-[16px]">Choose Photo</h1>
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handlePhotoChange}
          style={{ display: "none" }}
        />

        {/* Inputs */}
        <div className="flex flex-col gap-6 mt-4">
          {/* Row 1 */}
          <div className="flex gap-6">
            <div className="w-full">
              <label className={labelClass}>First Name</label>
              <input
                className={inputClass}
                type="text"
                placeholder="First Name"
              />
            </div>
            <div className="w-full">
              <label className={labelClass}>Last Name</label>
              <input
                className={inputClass}
                type="text"
                placeholder="Last Name"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex gap-6">
            <div className="w-full">
              <label className={labelClass}>Mobile Number</label>
              <input
                className={inputClass}
                type="text"
                placeholder="Mobile Number"
              />
            </div>
            <div className="w-full">
              <label className={labelClass}>Email Address</label>
              <input
                className={inputClass}
                type="email"
                placeholder="Email Address"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex gap-6">
            <div className="w-full">
              <label className={labelClass}>Date of Birth</label>
              <input className={inputClass} type="date" />
            </div>
            <div className="w-full">
              <label className={labelClass}>Marital Status</label>
              <select className={inputClass}>
                <option value="">Select</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
              </select>
            </div>
          </div>

          {/* Row 4 */}
          <div className="flex gap-6">
            <div className="w-full">
              <label className={labelClass}>Gender</label>
              <select className={inputClass}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="w-full">
              <label className={labelClass}>Nationality</label>
              <input
                className={inputClass}
                type="text"
                placeholder="Nationality"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className={labelClass}>Address</label>
            <input className={inputClass} type="text" placeholder="Address" />
          </div>

          {/* Row 5 */}
          <div className="flex gap-6">
            <div className="w-full">
              <label className={labelClass}>City</label>
              <select className={inputClass}>
                <option value="">Select</option>
                <option value="newyork">New York</option>
                <option value="losangeles">Los Angeles</option>
                <option value="chicago">Chicago</option>
              </select>
            </div>
            <div className="w-full">
              <label className={labelClass}>Bank Name</label>
              <input
                className={inputClass}
                type="text"
                placeholder="Bank Name"
              />
            </div>
            <div className="w-full">
              <label className={labelClass}>Account Number</label>
              <input
                className={inputClass}
                type="text"
                placeholder="Account Number"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-10">
          <button className="px-6 py-2 rounded border border-gray-300 text-gray-600">
            Cancel
          </button>
          <button className="px-6 py-2 rounded bg-[#0E9EE7] text-white hover:bg-blue-600">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
