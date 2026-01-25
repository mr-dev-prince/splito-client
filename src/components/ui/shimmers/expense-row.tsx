import { motion } from "motion/react";

const ExpenseRowSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-between rounded-2xl px-4 py-4"
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className="h-12 w-12 animate-pulse rounded-2xl bg-gray-200" />

        {/* Text */}
        <div className="space-y-2">
          <div className="h-4 w-36 animate-pulse rounded bg-gray-200" />
          <div className="h-3 w-28 animate-pulse rounded bg-gray-200" />
        </div>
      </div>

      {/* Amount */}
      <div className="space-y-2 text-right">
        <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
        <div className="h-2 w-14 animate-pulse rounded bg-gray-100" />
      </div>
    </motion.div>
  );
};

export default ExpenseRowSkeleton;
