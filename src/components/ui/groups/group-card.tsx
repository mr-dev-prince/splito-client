import React from "react";
import { motion } from "motion/react";
import { Users } from "lucide-react";
import { NumberTicker } from "../number-ticker";
import { useNavigate } from "react-router-dom";
import type { Group } from "@/redux/features/groups/group-types";

const GroupCard: React.FC<{ group: Group }> = ({ group }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      key={group.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative h-fit w-56 cursor-pointer rounded-md bg-white p-4 border border-gray-200 ring-1 ring-gray-100 hover:shadow-sm"
    >
      <div className="flex h-full flex-col gap-5">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 3, scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-100 text-blue-600 border border-blue-200"
          >
            <Users size={20} />
          </motion.div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-800">
              {group.name}
            </p>
            <p className="text-xs text-gray-500">
              {group.member_count} members
            </p>
          </div>
        </div>
        <div className="rounded-md bg-gray-50 px-3 py-2 border border-gray-200">
          <p className="text-xs text-gray-500">Your balance</p>
          <NumberTicker
            className={`text-2xl font-semibold ${
              group.my_balance > 0
                ? "text-green-600"
                : group.my_balance < 0
                  ? "text-red-500"
                  : "text-gray-500"
            }`}
            value={group.my_balance || 0}
          />
        </div>
        <button
          onClick={() => navigate(`/groups/${group.id}`)}
          className="mt-auto w-full rounded-md border border-gray-200 bg-white py-2 text-sm font-medium text-gray-700 transition-all hover:border-blue-500 hover:text-blue-600 active:scale-95"
        >
          Open group
        </button>
      </div>
    </motion.div>
  );
};

export default GroupCard;
