import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const InsightCard = ({
  title,
  value,
  className,
  delay = 0,
}: {
  title: string;
  value: string;
  className?: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: [0, -6, 0], scale: 1 }}
      transition={{
        opacity: { duration: 0.4, delay },
        y: {
          duration: 3.5,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay,
        },
      }}
      className={cn(
        "rounded-lg bg-white/70 px-4 py-3 text-sm shadow-md backdrop-blur-md",
        className,
      )}
    >
      <p className="text-xs text-slate-500">{title}</p>
      <p className="font-semibold text-slate-900">{value}</p>
    </motion.div>
  );
};

export default InsightCard;
