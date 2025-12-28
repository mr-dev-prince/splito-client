import { motion } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExpenseHandledCardProps {
  image: string;
  label: "Trips" | "Flats" | "Teams";
  delay?: number;
  className?: string;
}

const ExpenseHandledCard = ({
  image,
  label,
  delay = 0,
  className,
}: ExpenseHandledCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: [0, -8, 0], scale: 1 }}
      transition={{
        opacity: { duration: 0.4, delay },
        scale: { duration: 0.4, delay },
        y: {
          duration: 3.5,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay,
        },
      }}
      className={cn(
        "relative flex flex-col items-center justify-center rounded-sm bg-white/80 p-2 shadow-md backdrop-blur-md lg:h-48 lg:w-48",
        className,
      )}
    >
      <img
        src={image}
        alt={label}
        className="h-full w-full rounded-sm object-cover"
      />

      <p className="text-xs font-medium text-slate-600 lg:p-2">{label}</p>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 18,
          delay: delay + 0.4,
        }}
        className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 shadow"
      >
        <Check size={14} className="text-white" />
      </motion.div>
    </motion.div>
  );
};

export default ExpenseHandledCard;
