import React, { useState } from "react";
import { motion } from "motion/react";
import { Trash2 } from "lucide-react";

export type SortOptions = "latest" | "oldest" | "amount_high" | "amount_low";

const Expenses: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortOptions>("latest");

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold text-gray-800">Expenses</p>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOptions)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
        >
          <option value="latest">Latest first</option>
          <option value="oldest">Oldest first</option>
          <option value="amount_high">Amount: High → Low</option>
          <option value="amount_low">Amount: Low → High</option>
        </select>
      </div>

      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          whileHover={{ y: -2 }}
          className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-100" />
            <div>
              <p className="text-sm font-medium text-gray-800">
                Dinner at Baga
              </p>
              <p className="text-xs text-gray-500">Added by Rahul</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs text-gray-500">Total</p>
              <p className="text-sm font-semibold">₹1,200</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Your share</p>
              <p className="text-sm font-semibold text-red-500">₹300</p>
            </div>
            <button className="rounded-lg p-2 text-red-500 hover:bg-red-50">
              <Trash2 size={16} />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Expenses;
