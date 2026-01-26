import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Eye, EyeOff, TrendingUp } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { BlueLoader } from "../utils/custom-loader";
import type { Variants } from "motion/react";
import { fetchGroupAnalytics } from "@/redux/features/groups/group-thunks";
import { notifyError } from "@/lib/toast";
import { useAuth } from "@clerk/clerk-react";

// --- Design Tokens ---
const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f43f5e"];
const GRADIENT = "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)";

interface ChartDataItem {
  name: string;
  value: number;
  [key: string]: string | number;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

// --- Sub-Components ---

const StatCard = ({
  label,
  value,
  trend,
}: {
  label: string;
  value: string;
  trend?: string;
}) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -4 }}
    className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6"
  >
    <div className="relative z-10">
      <p className="text-xs font-bold tracking-wider text-gray-400 uppercase">
        {label}
      </p>
      <div className="mt-3 flex items-baseline gap-2">
        <h3 className="text-3xl font-black text-gray-900">₹{value}</h3>
        {trend && (
          <span className="flex items-center text-xs font-bold text-emerald-500">
            <ArrowUpRight size={14} /> {trend}
          </span>
        )}
      </div>
    </div>
    {/* Subtle Background Accent */}
    <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-indigo-50/50" />
  </motion.div>
);

const ChartCard = ({
  title,
  data,
}: {
  title: string;
  data: ChartDataItem[];
}) => (
  <motion.div
    variants={itemVariants}
    className="flex flex-col rounded-xl border border-gray-200 bg-white p-6"
  >
    <div className="mb-4 flex items-center justify-between">
      <p className="text-sm font-bold tracking-tight text-gray-800">{title}</p>
      <div className="h-2 w-2 animate-pulse rounded-full bg-indigo-500" />
    </div>
    <div className="h-52 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={65}
            outerRadius={80}
            paddingAngle={8}
            dataKey="value"
            stroke="none"
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                radius={10}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: "16px",
              border: "none",
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
    <div className="mt-4 grid grid-cols-2 gap-2">
      {data.map((item, i) => (
        <div key={item.name} className="flex items-center gap-2">
          <div
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: COLORS[i % COLORS.length] }}
          />
          <span className="text-[10px] font-semibold tracking-tighter text-gray-500 uppercase">
            {item.name}
          </span>
        </div>
      ))}
    </div>
  </motion.div>
);

const AnalyticsSection: React.FC = () => {
  const [showAnalytics, setShowAnalytics] = useState(true);

  const { groupAnalytics, groupAnalyticsLoading, groupAnalyticsError } =
    useAppSelector((state) => state.groups);

  const dispatch = useAppDispatch();

  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (groupAnalyticsError) {
      notifyError(groupAnalyticsError);
    }
  }, [groupAnalyticsError]);

  useEffect(() => {
    if (!isLoaded && !isSignedIn) return;
    dispatch(fetchGroupAnalytics());
  }, [dispatch, isLoaded, isSignedIn]);

  return (
    <div className="h-fit rounded-xl bg-[#f8fafc] p-6 font-sans text-gray-900">
      <div className="mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-gray-900">
              Group Analytics
            </h1>
            <p className="text-sm font-medium text-gray-500">
              Insights for your shared expenses
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAnalytics((p) => !p)}
            className="flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-bold shadow-sm ring-1 ring-gray-200 transition-all hover:bg-gray-50"
          >
            {showAnalytics ? (
              <>
                <EyeOff size={16} /> Hide
              </>
            ) : (
              <>
                <Eye size={16} /> Show Analytics
              </>
            )}
          </motion.button>
        </header>
        {groupAnalyticsLoading ? (
          <div className="flex w-full items-center justify-center py-6">
            <BlueLoader />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {showAnalytics && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-1 gap-6 md:grid-cols-12"
              >
                <motion.div variants={itemVariants} className="md:col-span-4">
                  <div
                    className="flex h-full flex-col justify-between rounded-3xl p-8 text-white shadow-xl"
                    style={{ background: GRADIENT }}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                      <TrendingUp size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-medium tracking-widest uppercase opacity-80">
                        Total Expense
                      </p>
                      <h2 className="mt-1 text-4xl font-black">
                        ₹{groupAnalytics?.lifetime_total ?? "0"}
                      </h2>
                      <div className="mt-4 inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase backdrop-blur-sm">
                        Lifetime Total
                      </div>
                    </div>
                  </div>
                </motion.div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:col-span-8">
                  <StatCard
                    label="Monthly Spend"
                    value={groupAnalytics?.mtd_total.toString() ?? "0"}
                    trend="8.4%"
                  />
                  <StatCard label="Saved This Month" value="2,100" />
                  <ChartCard
                    title="Top Groups"
                    data={
                      groupAnalytics?.top_groups.map((group) => ({
                        name: group.name,
                        value: group.amount,
                      })) || [
                        { name: "Group A", value: 4200 },
                        { name: "Group B", value: 2800 },
                        { name: "Group C", value: 1500 },
                      ]
                    }
                  />
                  <ChartCard
                    title="Top Months"
                    data={
                      groupAnalytics?.top_months.map((month) => ({
                        name: month.period,
                        value: month.amount,
                      })) || [
                        { name: "Jan", value: 3000 },
                        { name: "Feb", value: 2000 },
                        { name: "Mar", value: 1000 },
                      ]
                    }
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default AnalyticsSection;
