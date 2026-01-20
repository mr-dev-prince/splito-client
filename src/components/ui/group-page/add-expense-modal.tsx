import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Users } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { notifyError, notifySuccess } from "@/lib/toast";
import { useParams } from "react-router-dom";
import type {
  CreateExpensePayload,
  SplitStrategy,
} from "@/redux/features/expenses/expense-type";
import { createExpense } from "@/redux/features/expenses/expense-thunk";
import { fetchGroupData } from "@/redux/features/groups/group-thunks";
import Loader from "../utils/loader-component";

interface AddExpenseModalProps {
  onClose: () => void;
  open: boolean;
}

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({ open, onClose }) => {
  const { list: members } = useAppSelector((state) => state.members);
  const { groupId } = useParams<{ groupId: string }>();

  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [splitType, setSplitType] = useState<SplitStrategy>("equal");
  const [splits, setSplits] = useState<Record<number, number>>({});
  const [submitting, setSubmitting] = useState(false);


  const handleSplitChange = (id: number, value: number) => {
    setSplits((prev) => ({ ...prev, [id]: value }));
  };

  const buildSplitsPayload = () => {
    if (!members || members.length === 0) return [];

    if (splitType === "equal") {
      const perHead = Number((amount / members.length).toFixed(2));
      return members.map((m) => ({
        member_id: m.id,
        amount: perHead,
      }));
    }

    if (splitType === "percentage") {
      return members.map((m) => ({
        member_id: m.id,
        amount: Number((((splits[m.id] || 0) * amount) / 100).toFixed(2)),
      }));
    }

    // exact
    return members.map((m) => ({
      member_id: m.id,
      amount: Number((splits[m.id] || 0).toFixed(2)),
    }));
  };

  const isSplitValid = () => {
    if (splitType === "percentage") {
      const total = Object.values(splits).reduce((a, b) => a + b, 0);
      return total === 100;
    }

    if (splitType === "exact") {
      const total = Object.values(splits).reduce((a, b) => a + b, 0);
      return total === amount;
    }

    return true; // equal
  };

  const handleSave = async () => {
    if (!title.trim()) {
      notifyError("Expense title is required");
      return;
    }

    if (amount <= 0) {
      notifyError("Amount must be greater than zero");
      return;
    }

    if (!isSplitValid()) {
      notifyError("Split values do not match total");
      return;
    }

    try {
      setSubmitting(true);

      const payload: CreateExpensePayload = {
        title,
        amount,
        strategy: splitType,
        splits: buildSplitsPayload(),
      };

      await dispatch(
        createExpense({ groupId: Number(groupId), data: payload }),
      ).unwrap();

      notifySuccess("Expense added successfully");
      await dispatch(fetchGroupData({ groupId: Number(groupId) })).unwrap();
      onClose();
    } catch (err) {
      notifyError("Failed to add expense");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 shadow-xl ring-1 ring-gray-100"
          >
            <div className="mb-5 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <Users size={18} />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    Add expense
                  </p>
                  <p className="text-sm text-gray-500">Split it fairly</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs text-gray-500">
                  Title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Dinner, Groceries, Taxi"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-500">
                  Amount
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  placeholder="0"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                />
              </div>

              {/* Split strategy */}
              <div>
                <p className="mb-2 text-xs text-gray-500">Split strategy</p>
                <div className="flex gap-2">
                  {(["equal", "percentage", "exact"] as SplitStrategy[]).map(
                    (type) => (
                      <button
                        key={type}
                        onClick={() => setSplitType(type)}
                        className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition ${
                          splitType === type
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {type}
                      </button>
                    ),
                  )}
                </div>
              </div>
              <div className="space-y-2">
                {members.map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2"
                  >
                    <p className="text-sm text-gray-700">{m.name}</p>

                    {splitType === "equal" ? (
                      <p className="text-sm text-gray-500">
                        ₹
                        {amount ? (amount / members.length).toFixed(2) : "0.00"}
                      </p>
                    ) : (
                      <input
                        type="number"
                        placeholder={splitType === "percentage" ? "%" : "₹"}
                        className="w-20 rounded-lg border border-gray-200 px-2 py-1 text-sm focus:border-blue-500 focus:outline-none"
                        value={splits[m.id] ?? ""}
                        onChange={(e) =>
                          handleSplitChange(m.id, Number(e.target.value))
                        }
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="rounded-xl px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <motion.button
                disabled={submitting}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleSave}
                className="flex h-10 items-center justify-center rounded-xl bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 disabled:opacity-60"
              >
                {submitting ? (
                  <Loader loading={submitting} size="sm" />
                ) : (
                  "Save expense"
                )}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddExpenseModal;
