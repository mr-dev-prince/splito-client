import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Wallet, CalendarDays, TrendingUp, X } from "lucide-react";

// Types
export type ExpensePlan = {
  id: string;
  name: string;
  budget: number;
  spent: number;
  period: string;
};

// Mock Data
const mockPlans: ExpensePlan[] = [
  {
    id: "1",
    name: "Monthly Personal",
    budget: 20000,
    spent: 12450,
    period: "This Month",
  },
  {
    id: "2",
    name: "Goa Trip",
    budget: 50000,
    spent: 38600,
    period: "Mar 2026",
  },
];

const ExpensePlansTab: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const totalBudget = mockPlans.reduce((a, b) => a + b.budget, 0);
  const totalSpent = mockPlans.reduce((a, b) => a + b.spent, 0);

  return (
    <div className="h-screen w-full space-y-6 rounded-xl bg-white p-6 shadow-2xl">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Expense Plans</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-200"
        >
          <Plus size={16} /> Add Plan
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          icon={Wallet}
          label="Total Budget"
          value={`₹${totalBudget.toLocaleString()}`}
        />
        <StatCard
          icon={TrendingUp}
          label="Total Spent"
          value={`₹${totalSpent.toLocaleString()}`}
        />
        <StatCard
          icon={CalendarDays}
          label="Active Plans"
          value={mockPlans.length.toString()}
        />
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {mockPlans.map((plan, index) => {
          const progress = Math.min((plan.spent / plan.budget) * 100, 100);

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.01 }}
              className="rounded-xl bg-white p-5 shadow-md shadow-blue-100"
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">{plan.name}</h3>
                <span className="text-xs text-gray-400">{plan.period}</span>
              </div>

              <p className="mb-3 text-sm text-gray-600">
                ₹{plan.spent.toLocaleString()} spent of ₹
                {plan.budget.toLocaleString()}
              </p>

              {/* Progress */}
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6 }}
                  className={`h-full rounded-full ${
                    progress > 90 ? "bg-red-500" : "bg-blue-500"
                  }`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add Plan Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  New Expense Plan
                </h3>
                <button onClick={() => setIsOpen(false)}>
                  <X size={18} className="text-gray-400 hover:text-gray-600" />
                </button>
              </div>

              <div className="space-y-3">
                <input
                  placeholder="Plan name"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <input
                  placeholder="Budget (₹)"
                  type="number"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <input
                  placeholder="Period (e.g. April 2026)"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="mt-5 w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white shadow-lg shadow-blue-200"
              >
                Create Plan
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface StatCardProps {
  icon: React.ComponentType<{ size: number }>;
  label: string;
  value: string;
}
// Reusable stat card
const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value }) => (
  <motion.div
    whileHover={{ y: -2 }}
    className="flex items-center gap-4 rounded-xl bg-linear-to-b from-blue-50 to-gray-50 p-4 shadow-md shadow-blue-100"
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

export default ExpensePlansTab;
