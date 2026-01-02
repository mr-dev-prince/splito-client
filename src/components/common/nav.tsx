import React from "react";
import { motion } from "motion/react";
import { primaryNav } from "../../constants/nav-options";
import { KeyRound } from "lucide-react";
import CustomButton from "../ui/custom-button";

const Nav: React.FC = () => {
  return (
    <motion.div className="z-9999 flex h-full w-full items-center justify-between border-b p-4 shadow-xl lg:bg-none lg:px-24 lg:shadow-none">
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
      <motion.div className="hidden items-center justify-center gap-6 font-medium text-gray-600 lg:flex">
        {primaryNav.map((navItem) => (
          <motion.a
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.1 * primaryNav.indexOf(navItem),
            }}
            key={navItem.id}
            href={navItem.href}
            className="hover:text-blue-500"
          >
            {navItem.label}
          </motion.a>
        ))}
      </motion.div>
      <CustomButton label="login" logo={<KeyRound size={14} />} />
    </motion.div>
  );
};

export default Nav;
