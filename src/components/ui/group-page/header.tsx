import React, { useState } from "react";
import { motion } from "motion/react";
import { BanknoteArrowUp, LogOut, UserRoundPlus } from "lucide-react";
import AddMemberModal from "./add-member-modal";
import AddExpenseModal from "./add-expense-modal";

const GroupHeader: React.FC = () => {
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);

  return (
    <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-md sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Goa Trip</h1>
        <p className="text-sm text-gray-500">4 members • Active group</p>
      </div>

      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAddExpenseModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700"
        >
          <BanknoteArrowUp size={16} />
        </motion.button>
        <motion.button
          onClick={() => setIsAddMemberModalOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700"
        >
          <UserRoundPlus size={16} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <LogOut size={16} />
        </motion.button>
      </div>
      <AddMemberModal
        open={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
      />
      <AddExpenseModal
        open={isAddExpenseModalOpen}
        onClose={() => setIsAddExpenseModalOpen(false)}
      />
    </div>
  );
};

export default GroupHeader;
