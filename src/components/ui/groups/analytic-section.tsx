import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { ChartPie, Eye, EyeOff } from "lucide-react";
import type { Variants } from "motion/react";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut",
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

const groupData = [
  { name: "Goa Trip", value: 4200 },
  { name: "Flatmates", value: 2800 },
  { name: "Office Lunch", value: 1500 },
];

const categoryData = [
  { name: "Food", value: 3500 },
  { name: "Travel", value: 3000 },
  { name: "Rent", value: 2000 },
  { name: "Misc", value: 1000 },
];

const COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd"]; // blue shades

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <motion.div
    whileHover={{ y: -4 }}
    transition={{ duration: 0.2 }}
    className="rounded-2xl bg-white p-5 shadow-sm hover:shadow-md"
  >
    <p className="text-sm text-gray-500">{label}</p>
    <p className="mt-2 text-2xl font-semibold text-gray-800">₹{value}</p>
  </motion.div>
);

const AnalyticsSection: React.FC = () => {
  const [showAnalytics, setShowAnalytics] = useState(true);

  return (
    <div className="space-y-4">
      <div className="border-accent flex items-center justify-between rounded-2xl bg-white p-4">
        <div className="flex items-center justify-center gap-2">
          <ChartPie />
          <h1 className="text-2xl font-medium text-gray-800">
            Group Analytics
          </h1>
        </div>
        <button onClick={() => setShowAnalytics((prev) => !prev)}>
          {showAnalytics ? <Eye color="#2663EB" /> : <EyeOff color="red" />}
        </button>
      </div>
      <AnimatePresence mode="wait">
        {showAnalytics && (
          <motion.div
            key="analytics"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-4 gap-4 rounded-2xl border bg-white p-3"
          >
            <motion.div variants={itemVariants}>
              <StatCard label="Total expense this month" value="5,600" />
            </motion.div>

            <motion.div variants={itemVariants}>
              <StatCard label="Overall expense" value="12,300" />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="rounded-2xl border bg-white p-5 shadow-sm"
            >
              <p className="mb-4 text-sm font-medium text-gray-700">
                Group-wise expense
              </p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={groupData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                    >
                      {groupData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="rounded-2xl border bg-white p-5 shadow-sm"
            >
              <p className="mb-4 text-sm font-medium text-gray-700">
                Expense categories
              </p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                    >
                      {categoryData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnalyticsSection;
