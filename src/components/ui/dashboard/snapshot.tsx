import React from "react";
import { motion } from "motion/react";

const Snapshot: React.FC = () => {
  return (
    <div className="rounded-xl border border-blue-500/20 bg-blue-900/20 p-6">
      <h4 className="mb-2 font-semibold text-blue-400">Monthly Snapshot</h4>
      <p className="mb-4 text-sm text-gray-400">
        You've spent <span className="font-bold text-blue-950">$840</span> more
        than last month.
      </p>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-800">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "70%" }}
          className="h-full bg-blue-500"
        />
      </div>
      <div className="mt-2 flex justify-between text-[10px] font-bold tracking-widest text-gray-500 uppercase">
        <span>Budget</span>
        <span>70% Reached</span>
      </div>
    </div>
  );
};

export default Snapshot;
