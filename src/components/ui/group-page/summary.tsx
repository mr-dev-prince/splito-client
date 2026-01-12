import React from "react";

const Summary: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <p className="text-xs text-gray-500">Total spent</p>
        <p className="mt-1 text-2xl font-semibold text-gray-800">₹12,300</p>
      </div>
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <p className="text-xs text-gray-500">Your balance</p>
        <p className="mt-1 text-xl font-semibold text-green-600">
          ₹1,250 owed to you
        </p>
      </div>
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <p className="text-xs text-gray-500">Analytics</p>
        <div className="mt-3 h-20 rounded-xl bg-linear-to-r from-blue-100 to-blue-50" />
      </div>
    </div>
  );
};

export default Summary;
