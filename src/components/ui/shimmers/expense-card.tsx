import React from "react";

const ExpenseCardShimmer: React.FC = () => {
  return (
    <div className="flex animate-pulse items-center justify-between rounded-xl bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-200">
          <div className="animate-shimmer absolute inset-0 -translate-x-full bg-linear-to-r from-gray-200 via-gray-300 to-gray-200" />
        </div>
        <div className="space-y-2">
          <div className="relative h-3 w-32 overflow-hidden rounded bg-gray-200">
            <div className="animate-shimmer absolute inset-0 -translate-x-full bg-linear-to-r from-gray-200 via-gray-300 to-gray-200" />
          </div>
          <div className="relative h-2.5 w-24 overflow-hidden rounded bg-gray-200">
            <div className="animate-shimmer absolute inset-0 -translate-x-full bg-linear-to-r from-gray-200 via-gray-300 to-gray-200" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="space-y-2 text-right">
          <div className="relative h-2.5 w-10 overflow-hidden rounded bg-gray-200">
            <div className="animate-shimmer absolute inset-0 -translate-x-full bg-linear-to-r from-gray-200 via-gray-300 to-gray-200" />
          </div>
          <div className="relative h-3 w-12 overflow-hidden rounded bg-gray-200">
            <div className="animate-shimmer absolute inset-0 -translate-x-full bg-linear-to-r from-gray-200 via-gray-300 to-gray-200" />
          </div>
        </div>
        <div className="space-y-2 text-right">
          <div className="relative h-2.5 w-16 overflow-hidden rounded bg-gray-200">
            <div className="animate-shimmer absolute inset-0 -translate-x-full bg-linear-to-r from-gray-200 via-gray-300 to-gray-200" />
          </div>
          <div className="relative h-3 w-12 overflow-hidden rounded bg-gray-200">
            <div className="animate-shimmer absolute inset-0 -translate-x-full bg-linear-to-r from-gray-200 via-gray-300 to-gray-200" />
          </div>
        </div>
        <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-gray-200">
          <div className="animate-shimmer absolute inset-0 -translate-x-full bg-linear-to-r from-gray-200 via-gray-300 to-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default ExpenseCardShimmer;
