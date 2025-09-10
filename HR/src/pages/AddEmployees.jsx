import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import PersonalInfo from "../components/employee/PersonalInfo";
import ProfessionalInfo from "../components/employee/ProfessionalInfo";
import Documents from "../components/employee/Documents";
import AccountAccess from "../components/employee/AccountAccess";

// Icons from Lucide
import { User, Briefcase, FileText, Lock } from "lucide-react";

const AddEmployee = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const navigate = useNavigate();

  const tabs = [
    {
      key: "personal",
      label: "Personal Information",
      icon: <User className="w-4 h-4" />,
    },
    {
      key: "professional",
      label: "Professional Information",
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      key: "documents",
      label: "Documents",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      key: "account",
      label: "Account Access",
      icon: <Lock className="w-4 h-4" />,
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="w-full border-b border-gray-200">
        <div className="flex items-center gap-3 font-semibold text-3xl tracking-tighter px-4 py-6">
          <img
            onClick={() => navigate("/employees")}
            src="/notifi.png"
            alt="Back"
            className="cursor-pointer"
          />
          <h1>Employee Management</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-[34px]">
        <div className="px-4 bg-[#E3E3E3]/15 shadow-md rounded-lg mt-6 pb-10">
          {/* Tab Buttons */}
          <div className="flex gap-6 mt-6 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 font-medium px-1 pb-3 pt-3 -mb-[1px] transition-colors ${
                  activeTab === tab.key
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "personal" && <PersonalInfo />}
          {activeTab === "professional" && <ProfessionalInfo />}
          {activeTab === "documents" && <Documents />}
          {activeTab === "account" && <AccountAccess />}
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
