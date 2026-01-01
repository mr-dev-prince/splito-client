import React from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TrendingUp, PieChart as PieIcon, BarChart3 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ---------------- Mock Data ----------------
const monthlySpend = [
  { month: "Jan", amount: 12000 },
  { month: "Feb", amount: 9800 },
  { month: "Mar", amount: 14300 },
  { month: "Apr", amount: 11000 },
  { month: "May", amount: 16200 },
];

const categorySpend = [
  { name: "Food", value: 42000 },
  { name: "Travel", value: 28000 },
  { name: "Rent", value: 65000 },
  { name: "Utilities", value: 12000 },
];

const groupSpend = [
  { name: "Goa Trip", amount: 38000 },
  { name: "Flat", amount: 52000 },
  { name: "Office", amount: 21000 },
];

const COLORS = ["#2563EB", "#60A5FA", "#93C5FD", "#CBD5E1"];

// ---------------- Component ----------------
const AnalyticsTab: React.FC = () => {
  return (
    <div className="mx-auto w-full space-y-6 rounded-4xl bg-white p-6 shadow-2xl">
      <h2 className="text-xl font-semibold text-gray-800">Analytics</h2>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Avg Monthly Spend" value="₹12,660" icon={TrendingUp} />
        <StatCard label="Top Category" value="Rent" icon={PieIcon} />
        <StatCard label="Most Active Group" value="Flat" icon={BarChart3} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Line Chart */}
        <ChartCard title="Monthly Spending Trend">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={monthlySpend}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#2563EB"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Bar Chart */}
        <ChartCard title="Spending by Group">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={groupSpend}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" radius={[6, 6, 0, 0]} fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Pie Chart */}
        <ChartCard title="Category Breakdown" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Tooltip />
              <Pie
                data={categorySpend}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
              >
                {categorySpend.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

// ---------------- Reusable Components ----------------
interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon }) => (
  <motion.div
    whileHover={{ y: -2 }}
    className="flex items-center gap-4 rounded-2xl bg-linear-to-b from-blue-50 to-gray-50 p-4 shadow-md shadow-blue-100"
  >
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
      <Icon size={18} />
    </div>
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-800">{value}</p>
    </div>
  </motion.div>
);

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  children,
  className = "",
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`rounded-2xl bg-white p-5 shadow-lg shadow-blue-100 ${className}`}
  >
    <h3 className="mb-3 text-sm font-semibold text-gray-700">{title}</h3>
    {children}
  </motion.div>
);

export default AnalyticsTab;
