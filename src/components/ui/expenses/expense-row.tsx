import type { ExpenseType } from "@/redux/features/expenses/expense-type";
import { GiCash } from "react-icons/gi";
import React from "react";
import { formatDate } from "@/lib/utils";
import { motion } from "motion/react";

const ExpenseRow: React.FC<{ expense: ExpenseType }> = ({ expense }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01, backgroundColor: "#f9fafb" }}
      className="group flex cursor-pointer items-center justify-between rounded-2xl px-4 py-4 transition-colors"
    >
      <div className="flex items-center gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition-transform group-hover:scale-110`}
        >
          <GiCash size={20} />
        </div>

        <div>
          <p className="text-xl font-bold tracking-tight text-gray-900 capitalize">
            {expense.title}
          </p>
          <p className="text-xs font-medium text-gray-400">
            {expense.payer_name} • {formatDate(expense.created_at)}
          </p>
        </div>
      </div>

      <div className="text-right">
        <p className={`text-[16px] font-black text-emerald-600`}>
          ₹{expense.my_share}
        </p>
        <p className="text-[10px] font-bold tracking-widest text-gray-300 uppercase">
          My Share
        </p>
      </div>
    </motion.div>
  );
};

export default ExpenseRow;
