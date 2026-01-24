import React from "react";
import nodataicon from "@/assets/smiley.png";

interface NoDataProps {
  message?: string;
}
const NoData: React.FC<NoDataProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 p-6">
      <div className="mb-4 flex justify-center">
        <img src={nodataicon} alt="No Data" className="h-16 w-16 opacity-50" />
      </div>
      <p className="text-center text-gray-500">
        {message || "No data available."}
      </p>
    </div>
  );
};

export default NoData;
