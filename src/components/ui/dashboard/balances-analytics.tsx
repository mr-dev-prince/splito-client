import { ArrowDownLeft, ArrowUpRight, Calendar } from "lucide-react";

import { Link } from "react-router-dom";
import { NumberTicker } from "@/components/ui/number-ticker";
import React from "react";
import { motion } from "motion/react";

interface DashboardAnalyticsProps {
  owedToYou: number;
  youOwe: number;
  activeGroups: number;
  thisMonthSpending: number;
  monthlyAvgSpending: number;
}

const DashboardAnalytics: React.FC<DashboardAnalyticsProps> = ({
  owedToYou,
  youOwe,
  activeGroups,
  thisMonthSpending,
  monthlyAvgSpending,
}) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:col-span-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col justify-between rounded-[2.5rem] bg-slate-900 p-8 text-white shadow-2xl"
      >
        <div className="flex items-start justify-between">
          <p className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
            Owed To You
          </p>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
            <ArrowUpRight className="text-emerald-400" size={20} />
          </div>
        </div>
        <div>
          <h3 className="text-4xl font-black italic">₹{owedToYou}</h3>
          <p className="mt-2 text-xs text-slate-400">
            Across {activeGroups} active groups
          </p>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col justify-between rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm"
      >
        <div className="flex items-start justify-between">
          <p className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
            You Owe
          </p>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50">
            <ArrowDownLeft className="text-rose-500" size={20} />
          </div>
        </div>
        <div>
          <h3 className="text-4xl font-black text-slate-900">₹{youOwe}</h3>
          <Link to={"/settlements"} className="mt-2 text-xs font-bold text-blue-600 hover:underline">
            Check out settlements →
          </Link>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm sm:col-span-2"
      >
        <div className="mb-8 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            Spending Insights
          </h3>
          <div className="flex items-center gap-2 rounded-full border border-slate-100 bg-slate-50 px-3 py-1">
            <Calendar size={14} className="text-slate-400" />
            <span className="text-[10px] font-bold text-slate-500 uppercase">
              January 2026
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                This Month
              </p>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">₹</span>
              <NumberTicker
                value={thisMonthSpending}
                className="text-3xl font-black text-slate-900"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-slate-200" />
              <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                Monthly Avg
              </p>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">₹</span>
              <NumberTicker
                value={monthlyAvgSpending}
                className="text-3xl font-black text-slate-900"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardAnalytics;
