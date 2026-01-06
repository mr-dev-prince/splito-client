import React, { useState } from "react";
import { motion } from "motion/react";
import { Plus, Users } from "lucide-react";
import CreateGroupModal from "./create-group-modal";

const Hero: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div className="rounded-2xl bg-white p-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-2">
            <Users />
            <h1 className="text-2xl font-medium text-gray-800">Your Groups</h1>
          </div>
          <motion.button
            onClick={() => setOpenModal(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white shadow-md hover:bg-blue-700"
          >
            <Plus size={18} />
            New Group
          </motion.button>
        </div>
      </div>
      <CreateGroupModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default Hero;
