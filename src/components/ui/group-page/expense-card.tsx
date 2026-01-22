import React, { useState } from "react";
import { Trash2, User } from "lucide-react";
import { motion } from "motion/react";
import type { ExpenseType } from "@/redux/features/expenses/expense-type";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { deleteExpense } from "@/redux/features/expenses/expense-thunk";
import { notifyError, notifySuccess } from "@/lib/toast";
import ConfirmationPopUp from "../utils/confirmation-pop-up";

interface ExpenseCardProps {
  data: ExpenseType;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ data }) => {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const { loading } = useAppSelector((state) => state.expenses);
  const dispatch = useAppDispatch();

  const handleDeleteExpense = () => {
    try {
      dispatch(deleteExpense({ expenseId: data.id, groupId: data.group_id }));
      notifySuccess("Expense deleted successfully");
    } catch (error) {
      if (error instanceof Error) {
        notifyError(error.message ?? "Failed to delete expense");
      }
    }
  };

  return (
    <>
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
            <p className="text-sm font-medium text-gray-800 capitalize">
              {data.title}
            </p>
            <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
              <User size={12} color="green" />
              <p>{data.payer_name}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-xs text-gray-500">Total</p>
            <p className="text-sm font-semibold">₹{data.amount}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Your share</p>
            <p className="text-sm font-semibold text-red-500">
              ₹{data.my_share}
            </p>
          </div>
          <button
            className="h-8 w-8 rounded-lg bg-red-400 p-2 duration-200 hover:bg-red-500"
            disabled={loading}
            onClick={() => setDeleteConfirmOpen(true)}
          >
            <Trash2 size={16} color="white" />
          </button>
        </div>
      </motion.div>
      <ConfirmationPopUp
        open={deleteConfirmOpen}
        onCancel={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDeleteExpense}
        message="Do you really want to delete the expense ?"
      />
    </>
  );
};

export default ExpenseCard;
