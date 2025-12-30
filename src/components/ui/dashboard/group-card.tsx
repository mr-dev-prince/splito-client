import React from "react";
import { motion } from "motion/react";
import { Users, ArrowRight } from "lucide-react";

const bgIndicators: Record<string, string> = {
  settled: "bg-green-500 text-green-400",
  unbalanced: "bg-orange-500 text-orange-400",
  disputed: "bg-red-500 text-red-400",
};

interface Group {
  id: number;
  name: string;
  members: string[];
  totalSpent: string;
  status: "settled" | "unbalanced";
  color: string;
}

const GroupCard: React.FC<{ group: Group }> = ({ group }) => {
  return (
    <motion.div
      key={group.id}
      whileHover={{ y: -5 }}
      className="group cursor-pointer rounded-xl border border-gray-800 bg-[#1A1C1E] p-3 transition-all hover:border-blue-500/50"
    >
      <div className="flex items-center justify-start gap-2 border-b border-gray-700 pb-2">
        <div
          className={`h-8 w-8 rounded-sm ${group.color} flex items-center justify-center text-white shadow-lg`}
        >
          <Users size={16} />
        </div>
        <h4 className="text-md font-bold text-gray-100 transition-colors group-hover:text-blue-400">
          {group.name}
        </h4>
      </div>
      <div>
        <div className="mt-4 flex flex-col items-center justify-between gap-4">
          <div className="flex -space-x-3">
            {group.members.map((src, i) => (
              <img
                key={i}
                src={src}
                className="h-8 w-8 rounded-full border-2 border-[#1A1C1E] object-cover"
                alt="member"
              />
            ))}
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#1A1C1E] bg-gray-800 text-[10px] text-gray-400">
              +3
            </div>
          </div>
          <div className="flex w-full items-center justify-between p-1 text-right">
            <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">
              Spent
            </p>
            <p className="text-sm font-semibold text-gray-200">
              {group.totalSpent}
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-gray-800 pt-4">
          <span
            className={`rounded-md px-2 py-1 text-[10px] font-bold tracking-tighter uppercase ${
              bgIndicators[group.status]
            }`}
          />
          <div className="flex items-center gap-1 text-xs font-bold text-blue-500 uppercase transition-all group-hover:gap-2">
            Open Group <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GroupCard;
