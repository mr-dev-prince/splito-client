import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { motion } from "motion/react";

const avatars = [
  { id: 1, emoji: "👩‍🦰", style: "top-0 left-1/2 -translate-x-1/2" },
  { id: 2, emoji: "👨‍💼", style: "top-1/2 right-0 -translate-y-1/2" },
  { id: 3, emoji: "👩‍🎓", style: "bottom-0 left-1/2 -translate-x-1/2" },
  { id: 4, emoji: "👨‍🦱", style: "top-1/2 left-0 -translate-y-1/2" },
];

const groupData = [
  { name: "Trip", value: 35, fill: "#93C5FD" },
  { name: "Flat", value: 25, fill: "#BFDBFE" },
  { name: "Food", value: 20, fill: "#60A5FA" },
  { name: "Others", value: 20, fill: "#3B82F6" },
];

const GroupPieVisual = () => {
  return (
    <div className="relative mt-6 flex h-48 w-48 items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-white shadow-inner">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={groupData}
              dataKey="value"
              innerRadius={50}
              outerRadius={70}
              stroke="none"
            >
              {groupData.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      {avatars.map((a, i) => (
        <motion.div
          key={a.id}
          className={`absolute ${a.style} flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg shadow-lg`}
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          {a.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default GroupPieVisual;
