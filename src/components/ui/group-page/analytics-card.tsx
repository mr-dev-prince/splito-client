import { PieChart, TrendingUp } from "lucide-react";
import BaseCard from "./base-card";

export const AnalyticsPreviewCard = () => (
  <BaseCard accentColor="indigo">
    <div className="flex items-center justify-between">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-4 ring-indigo-50/30">
        <PieChart size={22} />
      </div>
      <div className="flex items-center gap-1 text-emerald-500">
        <TrendingUp size={14} />
        <span className="text-[10px] font-bold uppercase">Active</span>
      </div>
    </div>
    <div className="mt-6">
      <p className="text-sm font-medium text-gray-500">Weekly Activity</p>
      <div className="mt-3 flex items-end gap-2">
        {[35, 60, 40, 85, 50, 70].map((h, i) => (
          <div
            key={i}
            className="h-1.5 flex-1 overflow-hidden rounded-full bg-indigo-100"
          >
            <div
              className="h-full bg-indigo-500 transition-all duration-1000 group-hover:bg-indigo-600"
              style={{ width: "100%", height: `${h}px` }}
            />
          </div>
        ))}
      </div>
    </div>
  </BaseCard>
);
