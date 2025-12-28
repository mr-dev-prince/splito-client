import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface LoginButtonProps {
  className?: string;
  onClick?: () => void;
  label?: string;
  logo: React.ReactNode;
}

const CustomButton: React.FC<LoginButtonProps> = ({
  className,
  onClick,
  label = "Click Me",
  logo,
}) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: -20, scale: 0 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className={cn(
        "flex h-10 w-fit items-center justify-between gap-1 rounded-full bg-blue-500 px-2 duration-200 hover:scale-110",
        className,
      )}
      onClick={onClick}
    >
      <p className="px-2 font-semibold text-white capitalize">{label}</p>

      <motion.div
        className="flex items-center justify-center rounded-full bg-white p-2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 18,
          delay: 0.1,
        }}
      >
        {logo}
      </motion.div>
    </motion.button>
  );
};

export default CustomButton;
