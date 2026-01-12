import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Users } from "lucide-react";

interface AddExpenseModalProps {
  onClose: () => void;
  open: boolean;
}

// dummy members
const members = [
  { id: 1, name: "You" },
  { id: 2, name: "Rahul" },
  { id: 3, name: "Amit" },
];

type SplitType = "equal" | "percentage" | "exact";

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({ open, onClose }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [splitType, setSplitType] = useState<SplitType>("equal");

  const [splits, setSplits] = useState<Record<number, number>>({});

  const handleSplitChange = (id: number, value: number) => {
    setSplits((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 shadow-xl ring-1 ring-gray-100"
          >
            {/* Header */}
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

            {/* Form */}
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

              {/* Split Strategy */}
              <div>
                <p className="mb-2 text-xs text-gray-500">Split strategy</p>
                <div className="flex gap-2">
                  {["equal", "percentage", "exact"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setSplitType(type as SplitType)}
                      className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition ${
                        splitType === type
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Members split */}
              <div className="space-y-2">
                {members.map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2"
                  >
                    <p className="text-sm text-gray-700">{m.name}</p>

                    {splitType === "equal" ? (
                      <p className="text-sm text-gray-500">
                        ₹{amount ? (amount / members.length).toFixed(0) : 0}
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

            {/* Actions */}
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="rounded-xl px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow hover:bg-blue-700"
              >
                Save expense
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddExpenseModal;
