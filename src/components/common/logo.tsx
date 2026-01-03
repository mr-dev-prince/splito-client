import React from "react";
import { motion } from "framer-motion";

const Logo: React.FC = () => {
  return (
    <motion.a
      href="/"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center"
    >
      <p className="text-3xl font-black">
        Splito<span className="text-blue-500">.</span>
      </p>
    </motion.a>
  );
};

export default Logo;
