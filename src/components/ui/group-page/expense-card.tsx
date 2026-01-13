import React from "react";
import { Trash2 } from "lucide-react";
import { motion } from "motion/react";
import type { ExpenseType } from "@/redux/features/expenses/expense-type";

interface ExpenseCardProps {
  data: ExpenseType;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ data }) => {
  return (
    <motion.div
      key={data.id}
      whileHover={{ y: -2 }}
      className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm"
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-blue-100">
          <span className="flex h-full w-full items-center justify-center text-blue-600">
            {data.payer_name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-800">{data.title}</p>
          <p className="text-xs text-gray-500">Added by {data.payer_name}</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-sm font-semibold">₹{data.amount}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Your share</p>
          <p className="text-sm font-semibold text-red-500">₹{data.my_share}</p>
        </div>
        <button className="rounded-lg p-2 text-red-500 hover:bg-red-50">
          <Trash2 size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default ExpenseCard;
