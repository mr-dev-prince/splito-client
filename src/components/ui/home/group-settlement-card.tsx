import React from "react";
import { motion } from "motion/react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ArrowRightLeft, CheckCircle2 } from "lucide-react";

interface SettlementData {
  name: string;
  value: number;
  [key: string]: string | number;
}

const data: SettlementData[] = [
  { name: "Paid", value: 4200 },
  { name: "Owed", value: 1800 },
];

const COLORS = ["#2563eb", "#c7d2fe"];

const GroupSettlementCard: React.FC = () => {
  const total = data.reduce((acc, d) => acc + d.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="relative w-full cursor-pointer rounded-xl bg-white p-6 shadow-xl ring-1 ring-gray-100"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-800">Settlement</p>
          <p className="text-xs text-gray-500">Group expense summary</p>
        </div>
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="rounded-xl bg-blue-100 p-2 text-blue-600"
        >
          <ArrowRightLeft size={18} />
        </motion.div>
      </div>
      <div className="relative h-96">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={110}
              outerRadius={150}
              paddingAngle={4}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-xl font-semibold text-gray-800">₹{total}</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="rounded-xl bg-white p-3 shadow-sm"
        >
          <p className="text-xs text-gray-500">You paid</p>
          <p className="text-sm font-semibold text-blue-600">₹4,200</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="rounded-xl bg-white p-3 shadow-sm"
        >
          <p className="text-xs text-gray-500">You owe</p>
          <p className="text-sm font-semibold text-gray-700">₹1,800</p>
        </motion.div>
      </div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4, type: "spring" }}
        className="absolute -top-3 -right-3 flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 shadow"
      >
        <CheckCircle2 size={14} />
        Settled
      </motion.div>
    </motion.div>
  );
};

export default GroupSettlementCard;
