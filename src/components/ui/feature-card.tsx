import type { IFeature } from "@/constants/feature-options";
import { motion } from "motion/react";
import React from "react";

interface FeatureCardProps {
  options: IFeature[];
}

const FeatureCard: React.FC<FeatureCardProps> = ({ options }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="hidden w-full flex-col gap-4 opacity-70 lg:flex"
    >
      {options.map(({ id, label, logo: Icon }) => (
        <motion.div
          initial={{ x: 20 }}
          animate={{ x: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.2 * options.indexOf({ id, label, logo: Icon }),
          }}
          key={id}
          className="flex w-40 animate-pulse items-center gap-2 rounded-md bg-white p-1 shadow-md"
        >
          <div className="rounded-md bg-blue-500 p-2">
            <Icon size={14} color="white" />
          </div>
          <h3 className="font-medium text-blue-500">{label}</h3>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FeatureCard;
