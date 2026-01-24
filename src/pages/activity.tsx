import React from "react";
import { motion } from "motion/react";
import {
  Users,
  Receipt,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";

interface Activity {
  id: number;
  type: "expense" | "settlement" | "group";
  title: string;
  subtitle: string;
  amount?: number;
  time: string;
}

const activities: Activity[] = [
  {
    id: 1,
    type: "expense",
    title: "You added an expense",
    subtitle: "Dinner at Baga • Goa Trip",
    amount: 1200,
    time: "2h ago",
  },
  {
    id: 2,
    type: "settlement",
    title: "Settlement completed",
    subtitle: "With Rahul • Flatmates",
    amount: -450,
    time: "Yesterday",
  },
  {
    id: 3,
    type: "group",
    title: "New group created",
    subtitle: "Office Lunch",
    time: "2 days ago",
  },
];

const ActivityIcon = ({ type }: { type: Activity["type"] }) => {
  if (type === "expense") {
    return (
      <div className="rounded-xl bg-blue-100 p-2 text-blue-600">
        <Receipt size={18} />
      </div>
    );
  }

  if (type === "settlement") {
    return (
      <div className="rounded-xl bg-green-100 p-2 text-green-600">
        <CheckCircle2 size={18} />
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-gray-100 p-2 text-gray-600">
      <Users size={18} />
    </div>
  );
};

const ActivityRow = ({ activity }: { activity: Activity }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2 }}
    className="flex items-center justify-between rounded-xl border px-4 py-3"
  >
    <div className="flex items-start gap-3">
      <ActivityIcon type={activity.type} />

      <div>
        <p className="text-sm font-medium text-gray-800">{activity.title}</p>
        <p className="text-xs text-gray-500">{activity.subtitle}</p>
        <p className="mt-1 text-xs text-gray-400">{activity.time}</p>
      </div>
    </div>

    {activity.amount !== undefined && (
      <div
        className={`flex items-center gap-1 text-sm font-semibold ${
          activity.amount > 0 ? "text-green-600" : "text-red-500"
        }`}
      >
        {activity.amount > 0 ? (
          <ArrowUpRight size={16} />
        ) : (
          <ArrowDownLeft size={16} />
        )}
        ₹{Math.abs(activity.amount)}
      </div>
    )}
  </motion.div>
);

const ActivityPage: React.FC = () => {
  return (
    <div className="min-h-screen space-y-4 bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between rounded-xl border bg-white p-3 shadow-2xl">
        <h1 className="text-2xl font-semibold text-gray-800">Activity</h1>
        <p className="text-sm text-gray-500">
          Everything that happened recently
        </p>
      </div>

      {/* Activity Feed */}
      <div className="space-y-3 rounded-xl bg-white p-2 shadow-sm">
        {activities.map((activity) => (
          <ActivityRow key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
};

export default ActivityPage;
