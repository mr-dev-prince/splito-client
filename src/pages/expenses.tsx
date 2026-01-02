import React from "react";
import { motion } from "motion/react";
import { Plus, Filter, ArrowUpRight, ArrowDownLeft } from "lucide-react";

interface Expense {
  id: number;
  title: string;
  group: string;
  amount: number;
  date: string;
}

const expenses: Expense[] = [
  {
    id: 1,
    title: "Dinner at Baga",
    group: "Goa Trip",
    amount: 1200,
    date: "Today",
  },
  {
    id: 2,
    title: "Groceries",
    group: "Flatmates",
    amount: -450,
    date: "Yesterday",
  },
  {
    id: 3,
    title: "Office Lunch",
    group: "Office",
    amount: 300,
    date: "2 days ago",
  },
];

const ExpenseRow = ({ expense }: { expense: Expense }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2 }}
    className="flex items-center justify-between rounded-xl border px-4 py-3"
  >
    <div className="flex items-center gap-3">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
          expense.amount > 0
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-500"
        }`}
      >
        {expense.amount > 0 ? (
          <ArrowUpRight size={18} />
        ) : (
          <ArrowDownLeft size={18} />
        )}
      </div>

      <div>
        <p className="text-sm font-medium text-gray-800">{expense.title}</p>
        <p className="text-xs text-gray-500">
          {expense.group} • {expense.date}
        </p>
      </div>
    </div>

    <p
      className={`text-sm font-semibold ${
        expense.amount > 0 ? "text-green-600" : "text-red-500"
      }`}
    >
      ₹{Math.abs(expense.amount)}
    </p>
  </motion.div>
);

const ExpensesPage: React.FC = () => {
  return (
    <div className="min-h-screen space-y-4 p-6">
      <div className="flex items-center justify-between rounded-2xl border bg-white p-3 shadow-2xl">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Expenses</h1>
          <p className="text-sm text-gray-500">
            Track and manage all your expenses
          </p>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-xl border border-gray-200 bg-white p-2 text-gray-600 hover:bg-gray-100"
          >
            <Filter size={18} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700"
          >
            <Plus size={18} />
            Add expense
          </motion.button>
        </div>
      </div>
      <div className="space-y-2 rounded-2xl bg-white p-2 shadow-sm">
        {expenses.map((expense) => (
          <ExpenseRow key={expense.id} expense={expense} />
        ))}
      </div>
    </div>
  );
};

export default ExpensesPage;
