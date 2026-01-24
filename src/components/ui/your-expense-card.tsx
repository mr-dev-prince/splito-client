import React from "react";
import { motion } from "motion/react";
import { NumberTicker } from "./number-ticker";

const YourExpensesCard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-2 flex h-fit w-64 flex-col overflow-hidden rounded-xl bg-white/20 p-3 shadow-lg backdrop-blur-xs"
    >
      <p className="font-medium text-gray-400">
        You spent <span className="text-lg text-blue-500">$</span>
        <NumberTicker
          value={542}
          className={`text-lg font-medium tracking-tighter whitespace-pre-wrap text-blue-500`}
        />{" "}
        on dining out this month.
      </p>
    </motion.div>
  );
};

export default YourExpensesCard;
