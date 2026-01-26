import {
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  Calendar,
  Mail,
  Phone,
  Settings,
  TrendingUp,
  User,
} from "lucide-react";

import { NumberTicker } from "@/components/ui/number-ticker";
import React from "react";
import SettingsSection from "@/components/ui/dashboard/settings";
import { motion } from "framer-motion";

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FBFBFC] p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* TOP BAR: Navigation & Branding */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-black tracking-tight text-slate-900">
            Dashboard
          </h1>
          <div className="flex items-center gap-3">
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm hover:text-slate-900">
              <Bell size={18} />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm hover:text-slate-900">
              <Settings size={18} />
            </button>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* PROFILE CARD (Span 4) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center rounded-[2.5rem] border border-slate-200 bg-white p-8 text-center shadow-sm md:col-span-4"
          >
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-slate-100 text-slate-400 shadow-xl">
                <User size={48} />
                {/* Image would go here: <img src={user.avatar} className="object-cover" /> */}
              </div>
              <div className="absolute right-0 bottom-0 h-6 w-6 rounded-full border-4 border-white bg-emerald-500" />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-900">
              Aryan Sharma
            </h2>
            <p className="text-sm font-medium text-slate-500">
              Splito Gold Member
            </p>

            <div className="mt-8 w-full space-y-4">
              <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <Mail size={18} className="text-slate-400" />
                <span className="text-sm font-semibold text-slate-700">
                  aryan@example.com
                </span>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <Phone size={18} className="text-slate-400" />
                <span className="text-sm font-semibold text-slate-700">
                  +91 98765 43210
                </span>
              </div>
            </div>
          </motion.div>

          {/* BALANCE & ANALYTICS SECTION (Span 8) */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:col-span-8">
            {/* Net Balance Card */}
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
                <h3 className="text-4xl font-black italic">₹12,450</h3>
                <p className="mt-2 text-xs text-slate-400">
                  Across 4 active groups
                </p>
              </div>
            </motion.div>

            {/* Owed Amount Card */}
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
                <h3 className="text-4xl font-black text-slate-900">₹3,200</h3>
                <button className="mt-2 text-xs font-bold text-blue-600 hover:underline">
                  Settle all debts →
                </button>
              </div>
            </motion.div>

            {/* Monthly Analytics */}
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
                    <span className="text-3xl font-black text-slate-900">
                      ₹
                    </span>
                    <NumberTicker
                      value={5600}
                      className="text-3xl font-black text-slate-900"
                    />
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-[65%] rounded-full bg-blue-500" />
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
                    <span className="text-3xl font-black text-slate-900">
                      ₹
                    </span>
                    <NumberTicker
                      value={4820}
                      className="text-3xl font-black text-slate-900"
                    />
                  </div>
                  <p className="flex items-center gap-1 text-[11px] font-bold text-emerald-500">
                    <TrendingUp size={12} /> +12% vs last month
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <SettingsSection />
      </div>
    </div>
  );
};

export default DashboardPage;
