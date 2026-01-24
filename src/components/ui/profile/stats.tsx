import React from "react";
import { motion } from "motion/react";
import { BadgeCheck, ShieldCheck, Star, TrendingUp } from "lucide-react";

const Stats: React.FC = () => {
  // Animation Variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };
  return (
    <motion.div
      variants={fadeInUp}
      className="grid grid-cols-2 gap-4 md:grid-cols-4"
    >
      {[
        {
          label: "Trust Score",
          value: "98%",
          icon: ShieldCheck,
          color: "text-green-400",
        },
        {
          label: "Settlements",
          value: "142",
          icon: TrendingUp,
          color: "text-blue-400",
        },
        {
          label: "Groups",
          value: "12 Active",
          icon: Star,
          color: "text-yellow-500",
        },
        {
          label: "Reliability",
          value: "Top 5%",
          icon: BadgeCheck,
          color: "text-purple-400",
        },
      ].map((stat, i) => (
        <div
          key={i}
          className="rounded-xl border border-gray-800 bg-[#1A1C1E] p-4"
        >
          <stat.icon size={18} className={`${stat.color} mb-2`} />
          <p className="text-2xl font-bold text-white">{stat.value}</p>
          <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
            {stat.label}
          </p>
        </div>
      ))}
    </motion.div>
  );
};

export default Stats;
