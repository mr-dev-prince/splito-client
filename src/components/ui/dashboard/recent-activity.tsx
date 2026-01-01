import { ArrowDownLeft, ArrowUpRight, Clock } from "lucide-react";
import React from "react";

interface Activity {
  id: number;
  title: string;
  group: string;
  amount: string;
  time: string;
  isLent: boolean;
}

const ACTIVITIES: Activity[] = [
  {
    id: 1,
    title: "Dinner at Ray’s",
    group: "Ski Trip 2024",
    amount: "$45.00",
    time: "2h ago",
    isLent: true,
  },
  {
    id: 2,
    title: "Groceries",
    group: "Apartment",
    amount: "$82.10",
    time: "Yesterday",
    isLent: false,
  },
  {
    id: 3,
    title: "Gas Fill-up",
    group: "Roadtrip",
    amount: "$60.00",
    time: "2 days ago",
    isLent: true,
  },
];

const RecentActivity: React.FC = () => {
  return (
    <div className="space-y-4 lg:col-span-2">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-xl font-semibold text-blue-950">
          <Clock size={20} className="text-blue-950" /> Recent Activity
        </h3>
        <button className="text-sm text-blue-950 hover:text-blue-500 hover:underline">
          View All
        </button>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-800 bg-[#1A1C1E]">
        {ACTIVITIES.map((item, idx) => (
          <div
            key={item.id}
            className={`flex items-center justify-between p-5 transition-colors hover:bg-white/2 ${
              idx !== ACTIVITIES.length - 1 ? "border-b border-gray-800" : ""
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`rounded-full p-3 ${item.isLent ? "bg-blue-500/10 text-blue-400" : "bg-gray-500/10 text-gray-400"}`}
              >
                {item.isLent ? (
                  <ArrowUpRight size={20} />
                ) : (
                  <ArrowDownLeft size={20} />
                )}
              </div>
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-xs text-gray-500">
                  {item.group} • {item.time}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p
                className={`font-bold ${item.isLent ? "text-blue-400" : "text-gray-300"}`}
              >
                {item.isLent ? "+" : "-"} {item.amount}
              </p>
              <p className="text-[10px] tracking-tighter text-gray-600 uppercase">
                Details
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
