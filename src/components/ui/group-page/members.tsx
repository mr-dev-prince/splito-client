import { Bell } from "lucide-react";
import React from "react";

const Members: React.FC = () => {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <p className="mb-3 text-sm font-semibold text-gray-800">Members</p>
      {["Rahul", "Amit", "You"].map((m) => (
        <div key={m} className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-200" />
            <p className="text-sm text-gray-700">{m}</p>
          </div>
          <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100">
            <Bell size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Members;
