import type React from "react";

const MemberCardShimmer: React.FC = () => {
  return (
    <div className="flex animate-pulse items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-gray-200">
          <div className="animate-shimmer absolute inset-0 -translate-x-full bg-linear-to-r from-gray-200 via-gray-300 to-gray-200" />
        </div>
        <div className="relative h-3 w-24 overflow-hidden rounded bg-gray-200">
          <div className="animate-shimmer absolute inset-0 -translate-x-full bg-linear-to-r from-gray-200 via-gray-300 to-gray-200" />
        </div>
      </div>
      <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-gray-200">
        <div className="animate-shimmer absolute inset-0 -translate-x-full bg-linear-to-r from-gray-200 via-gray-300 to-gray-200" />
      </div>
    </div>
  );
};

export default MemberCardShimmer;
