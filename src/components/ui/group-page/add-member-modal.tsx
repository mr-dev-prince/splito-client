import { api } from "@/lib/api";
import { notifyError, notifySuccess } from "@/lib/toast";
import { Users, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";

interface AddMemberModalProps {
  open: boolean;
  onClose: () => void;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({ open, onClose }) => {
  const [name, setName] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/groups", {
        name,
      });
      if (res.status === 201) {
        notifySuccess("Group created successfully!");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        notifyError(`Failed to create group: ${error.message}`);
      } else {
        console.log(error);
        notifyError("An unexpected error occurred.");
      }
    }
    onClose();
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
            className="fixed inset-0 z-40 h-full bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 shadow-xl ring-1 ring-gray-100"
          >
            <div className="mb-5 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <Users size={18} />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    Add new member
                  </p>
                  <p className="text-sm text-gray-500">
                    Add a new member to your group
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs text-gray-500">
                  Member Email
                </label>
                <input
                  type="text"
                  placeholder="Enter member's email"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
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
                onClick={handleSubmit}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow hover:bg-blue-700"
              >
                Add member
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddMemberModal;
