import React from "react";
import { motion } from "motion/react";
import { Bell, ArrowRight } from "lucide-react";

export type Notification = {
  id: string;
  title: string;
  description: string;
  time: string;
  unread?: boolean;
};

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Expense added",
    description: "Prince added ₹1,200 for Dinner",
    time: "2 min ago",
    unread: true,
  },
  {
    id: "2",
    title: "Settlement completed",
    description: "You settled up with Rahul",
    time: "1 hour ago",
  },
  {
    id: "3",
    title: "Group update",
    description: "Trip to Goa group was updated",
    time: "Yesterday",
  },
];

const NotificationsTab: React.FC = () => {
  return (
    <div className="h-screen w-full rounded-xl bg-white p-6 shadow-2xl">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="text-blue-600" size={20} />
          <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
        </div>
        <button className="text-xs font-medium text-blue-600 hover:underline">
          Mark all as read
        </button>
      </div>
      <div className="space-y-3">
        {mockNotifications.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.01 }}
            className={`relative flex cursor-pointer gap-3 rounded-xl p-4 transition-all ${
              item.unread
                ? "bg-white shadow-lg shadow-blue-100"
                : "bg-gray-100/60 shadow-md"
            }`}
          >
            {/* Indicator */}
            {item.unread && (
              <span className="absolute top-1/2 left-0 h-10 w-1 -translate-y-1/2 rounded-r bg-blue-500" />
            )}

            {/* Content */}
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">
                {item.title}
              </p>
              <p className="mt-0.5 text-sm text-gray-600">{item.description}</p>
              <p className="mt-1 text-xs text-gray-400">{item.time}</p>
            </div>

            {/* Action */}
            <motion.div
              whileHover={{ x: 4 }}
              className="flex items-center text-blue-500"
            >
              <ArrowRight size={16} />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsTab;
