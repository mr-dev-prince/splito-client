import React from "react";

const GroupCardShimmer: React.FC = () => {
  return (
    <div className="relative flex w-64 flex-col gap-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_2px_4px_rgba(0,0,0,0.01)]">
      <div className="flex animate-pulse flex-col gap-6">
        <div className="flex items-start justify-between">
          <div className="h-12 w-12 rounded-2xl bg-slate-100" />
          <div className="h-6 w-6 rounded-full bg-slate-50" />
        </div>
        <div className="space-y-3">
          <div className="h-5 w-5/6 rounded-lg bg-slate-100" />
          <div className="h-3 w-1/3 rounded-md bg-slate-50" />
        </div>
        <div className="mt-2 space-y-3">
          <div className="h-2.5 w-1/4 rounded-md bg-slate-50" />
          <div className="h-8 w-1/2 rounded-xl bg-slate-100" />
        </div>
        <div className="h-1.5 w-full rounded-full bg-slate-50" />
        <div className="h-2.5 w-2/5 rounded-md bg-slate-50" />
      </div>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/60 to-transparent" />
    </div>
  );
};

export default GroupCardShimmer;
