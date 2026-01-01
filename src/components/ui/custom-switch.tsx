import React from "react";
import { motion } from "motion/react";

const CustomSwitch: React.FC<{ enabled: boolean; onChange: () => void }> = ({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: () => void;
}) => (
  <button
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
      enabled ? "bg-blue-600" : "bg-gray-700"
    }`}
  >
    <motion.span
      animate={{ x: enabled ? 24 : 4 }}
      className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
    />
  </button>
);

export default CustomSwitch;
