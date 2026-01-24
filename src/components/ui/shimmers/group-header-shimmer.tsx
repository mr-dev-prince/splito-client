import React from "react";

const GroupHeaderShimmer: React.FC = () => {
  return (
    <div className="mb-6 flex animate-pulse flex-col gap-4 rounded-xl bg-white p-4 shadow-md sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-2">
        <div className="relative h-6 w-48 overflow-hidden rounded bg-gray-200">
          <div className="animate-shimmer absolute inset-0 -translate-x-full bg-linear-to-r from-gray-200 via-gray-300 to-gray-200" />
        </div>
        <div className="relative h-3 w-32 overflow-hidden rounded bg-gray-200">
          <div className="animate-shimmer absolute inset-0 -translate-x-full bg-linear-to-r from-gray-200 via-gray-300 to-gray-200" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="relative h-10 w-10 overflow-hidden rounded-xl bg-gray-200"
          >
            <div className="animate-shimmer absolute inset-0 -translate-x-full bg-linear-to-r from-gray-200 via-gray-300 to-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupHeaderShimmer;
