import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownLeft, Filter, Search } from "lucide-react";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import type { ExpenseType } from "@/redux/features/expenses/expense-type";
import { GiCash } from "react-icons/gi";
import { fetchMyExpenses } from "@/redux/features/expenses/expense-thunk";
import { formatDate } from "@/lib/utils";

const ExpenseRow = ({ expense }: { expense: ExpenseType }) => {
  const isPositive = expense.amount > 0;

  return (
    <motion.div
      whileHover={{ scale: 1.01, backgroundColor: "#f9fafb" }}
      className="group flex cursor-pointer items-center justify-between rounded-2xl px-4 py-4 transition-colors"
    >
      <div className="flex items-center gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 ${
            isPositive
              ? "bg-emerald-50 text-emerald-600"
              : "bg-rose-50 text-rose-600"
          }`}
        >
          <GiCash size={20} />
        </div>

        <div>
          <p className="text-[15px] font-bold tracking-tight text-gray-900">
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

const ExpensesPage: React.FC = () => {
  const { myExpenses } = useAppSelector((state) => state.expenses);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMyExpenses());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 pb-20">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="flex flex-col gap-6 md:flex-row md:items-center px-6 md:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-gray-900">
              Expenses
            </h1>
            <p className="text-sm font-medium text-gray-500">
              You've spent{" "}
              <span className="font-bold text-indigo-600">₹12,400</span> this
              week
            </p>
          </div>

          <div className="flex gap-2">
            <button className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-gray-500 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50">
              <Search size={18} />
            </button>
            <button className="flex h-11 items-center gap-2 rounded-2xl bg-white px-4 text-sm font-bold text-gray-700 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50">
              <Filter size={18} /> Filter
            </button>
          </div>
        </header>

        {/* Expenses List */}
        <div className="relative overflow-hidden rounded-[32px] border border-gray-50 bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="divide-y divide-gray-50">
            <AnimatePresence mode="popLayout">
              {myExpenses.length > 0 ? (
                myExpenses.map((expense, idx) => (
                  <motion.div
                    key={expense.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <ExpenseRow expense={expense} />
                  </motion.div>
                ))
              ) : (
                <div className="py-20 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 text-gray-300">
                    <ArrowDownLeft size={32} />
                  </div>
                  <p className="mt-4 text-sm font-medium text-gray-400">
                    No expenses found
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensesPage;
