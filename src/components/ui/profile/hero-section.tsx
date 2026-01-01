import React, { useState } from "react";
import { motion } from "motion/react";
import { BadgeCheck, Camera } from "lucide-react";

const HeroSection: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };
  return (
    <motion.section
      variants={fadeInUp}
      className="relative"
    >
      <div className="h-32 w-full rounded-t-3xl border-gray-800 bg-linear-to-r from-blue-500/80 to-blue-900/90" />
      <div className="rounded-b-3xl border-x border-b border-gray-800 bg-[#1A1C1E] p-6 pt-0">
        <div className="-mt-12 flex flex-col items-end gap-6 pt-3 md:flex-row md:items-center">
          <div className="group relative">
            <div className="h-32 w-32 overflow-hidden rounded-3xl border-4 border-[#0F1113] bg-gray-800 shadow-2xl">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                alt="User Avatar"
                className="h-full w-full object-cover"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-2 bottom-2 rounded-xl border-2 border-[#1A1C1E] bg-blue-600 p-2 text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100"
            >
              <Camera size={16} />
            </motion.button>
          </div>

          <div className="flex-1 pb-2">
            <div className="flex items-center gap-2">
              <h2 className="text-3xl font-bold text-white">Alex Thompson</h2>
              <BadgeCheck className="text-blue-500" size={24} />
            </div>
            <p className="font-medium text-gray-500">
              Splitwise Pro Member • Since 2023
            </p>
          </div>

          <div className="pb-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="rounded-xl border border-gray-700 px-6 py-2.5 text-sm font-semibold text-gray-300 transition-all hover:bg-white/5 hover:text-white active:scale-95"
            >
              {isEditing ? "Save Profile" : "Edit Profile"}
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
