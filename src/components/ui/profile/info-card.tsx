import React from "react";
import { motion } from "motion/react";

const InfoCard: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };
  return (
    <motion.div variants={fadeInUp} className="space-y-6">
      <div className="rounded-3xl border border-blue-500/20 bg-blue-600/5 p-6">
        <h4 className="mb-2 text-sm font-bold text-blue-400">Pro Membership</h4>
        <p className="mb-4 text-xs leading-relaxed text-gray-500">
          You have access to unlimited groups and receipt scanning.
        </p>
        <button className="w-full rounded-xl bg-blue-600 py-2 text-xs font-bold text-white shadow-lg shadow-blue-900/20">
          Manage Subscription
        </button>
      </div>
    </motion.div>
  );
};

export default InfoCard;
