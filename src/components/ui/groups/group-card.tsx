import { ArrowUpRight, Users } from "lucide-react";

import type { Group } from "@/redux/features/groups/group-types";
import { NumberTicker } from "../number-ticker";
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const GroupCard: React.FC<{ group: Group }> = ({ group }) => {
  const navigate = useNavigate();
  const isPositive = group.my_balance > 0;
  const isNeutral = group.my_balance === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, borderColor: "#cbd5e1" }}
      className="group relative flex w-64 cursor-pointer flex-col gap-6 rounded-xl border border-slate-200 bg-white p-6 shadow-[0_2px_4px_rgba(0,0,0,0.02)] transition-all duration-100 hover:shadow-[0_12px_24px_rgba(0,0,0,0.04)]"
      onClick={() => navigate(`/groups/${group.id}`)}
    >
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 text-slate-600 transition-colors group-hover:border-blue-500 group-hover:bg-blue-600 group-hover:text-white">
          <Users size={22} strokeWidth={2.5} />
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 opacity-0 transition-opacity group-hover:opacity-100">
          <ArrowUpRight size={16} className="text-slate-400" />
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="truncate text-lg font-bold tracking-tight text-slate-900">
          {group.name}
        </h3>
        <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
          {group.member_count} Members
        </p>
      </div>

      <div className="mt-2 space-y-1.5">
        <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
          Your Balance
        </p>
        <div className="flex items-baseline gap-1">
          <span
            className={`text-2xl font-black tabular-nums ${
              isPositive
                ? "text-emerald-600"
                : isNeutral
                  ? "text-slate-400"
                  : "text-rose-500"
            }`}
          >
            {isNeutral ? "" : isPositive ? "+" : "−"}
            <NumberTicker
              value={Math.abs(group.my_balance || 0)}
              className="text-2xl font-black tabular-nums"
            />
          </span>
        </div>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-50">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          className={`h-full opacity-40 ${
            isPositive
              ? "bg-emerald-500"
              : isNeutral
                ? "bg-slate-200"
                : "bg-rose-500"
          }`}
        />
      </div>

      <div className="pt-2 text-[11px] font-bold text-slate-400 transition-colors group-hover:text-blue-600">
        Click to manage group
      </div>
    </motion.div>
  );
};

export default GroupCard;
