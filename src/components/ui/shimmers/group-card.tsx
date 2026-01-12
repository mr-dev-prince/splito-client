import React from "react";

const GroupCardShimmer: React.FC = () => {
  return (
    <div className="relative h-fit w-56 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
      <div className="flex animate-pulse flex-col gap-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className="h-11 w-11 rounded-xl bg-gray-200" />

          {/* Text */}
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 rounded bg-gray-200" />
            <div className="h-3 w-1/2 rounded bg-gray-200" />
          </div>
        </div>

        {/* Balance box */}
        <div className="space-y-2 rounded-xl bg-gray-50 px-3 py-2">
          <div className="h-3 w-1/3 rounded bg-gray-200" />
          <div className="h-7 w-1/2 rounded bg-gray-200" />
        </div>

        {/* Button */}
        <div className="mt-auto h-9 w-full rounded-xl bg-gray-200" />
      </div>
    </div>
  );
};

export default GroupCardShimmer;
