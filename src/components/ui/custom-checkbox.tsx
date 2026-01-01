import React from "react";
import { motion } from "motion/react";

const CustomCheckbox: React.FC<{
  checked: boolean;
  onChange: () => void;
  label: string;
}> = ({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) => (
  <label className="group flex cursor-pointer items-center gap-3">
    <div
      onClick={onChange}
      className={`flex h-5 w-5 items-center justify-center rounded border transition-all ${
        checked
          ? "border-blue-600 bg-blue-600"
          : "border-gray-600 group-hover:border-blue-500"
      }`}
    >
      {checked && (
        <motion.svg
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="h-3.5 w-3.5 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={4}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </motion.svg>
      )}
    </div>
    <span className="text-sm text-gray-300">{label}</span>
  </label>
);

export default CustomCheckbox;
