import React from "react";

const SummaryShimmer: React.FC = () => {
  return (
    <div className="grid animate-pulse grid-cols-1 gap-4 md:grid-cols-3">
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="relative h-3 w-20 overflow-hidden rounded bg-gray-200">
          <div className="animate-shimmer absolute inset-0 -translate-x-full bg-linear-to-r from-gray-200 via-gray-300 to-gray-200" />
        </div>
        <div className="relative mt-2 h-7 w-32 overflow-hidden rounded bg-gray-200">
          <div className="animate-shimmer absolute inset-0 -translate-x-full bg-linear-to-r from-gray-200 via-gray-300 to-gray-200" />
        </div>
      </div>

      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="relative h-3 w-24 overflow-hidden rounded bg-gray-200">
          <div className="animate-shimmer absolute inset-0 -translate-x-full bg-linear-to-r from-gray-200 via-gray-300 to-gray-200" />
        </div>
        <div className="relative mt-2 h-6 w-40 overflow-hidden rounded bg-gray-200">
          <div className="animate-shimmer absolute inset-0 -translate-x-full bg-linear-to-r from-gray-200 via-gray-300 to-gray-200" />
        </div>
      </div>

      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="relative h-3 w-20 overflow-hidden rounded bg-gray-200">
          <div className="animate-shimmer absolute inset-0 -translate-x-full bg-linear-to-r from-gray-200 via-gray-300 to-gray-200" />
        </div>
        <div className="relative mt-3 h-20 overflow-hidden rounded-xl bg-gray-200">
          <div className="animate-shimmer absolute inset-0 -translate-x-full bg-linear-to-r from-gray-200 via-gray-300 to-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default SummaryShimmer;
