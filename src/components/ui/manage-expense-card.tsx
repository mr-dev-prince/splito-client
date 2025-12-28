import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";

interface ManageExpenseProps {
  className?: string;
}

const data = [
  { month: "Jan", expense: 1200 },
  { month: "Feb", expense: 1800 },
  { month: "Mar", expense: 1400 },
  { month: "Apr", expense: 2200 },
  { month: "May", expense: 1900 },
  { month: "Jun", expense: 2600 },
];

const ManageExpense: React.FC<ManageExpenseProps> = ({ className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      viewport={{ once: true }}
      className={cn(
        "flex h-fit w-64 flex-col overflow-hidden rounded-xl bg-white/20 shadow-xl backdrop-blur-xs",
        className,
      )}
    >
      <div className="w-full p-1">
        <div className="h-32 w-full border">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={6}>
              <XAxis hide />
              <YAxis hide />
              <Bar
                dataKey="expense"
                fill="#3b82f6"
                radius={[6, 6, 0, 0]}
                animationDuration={1000}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex w-full flex-col justify-center gap-2 p-2"
      >
        <h3 className="text-lg font-bold text-slate-900">
          Manage your expenses
        </h3>
        <p className="text-sm text-slate-600">Be financially intelligent.</p>
      </motion.div>
    </motion.div>
  );
};

export default ManageExpense;
