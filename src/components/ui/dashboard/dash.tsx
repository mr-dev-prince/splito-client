import React from "react";
import { motion } from "framer-motion";
import { Plus, Send, FileText, UserPlus } from "lucide-react";
import RecentActivity from "./recent-activity";
import Snapshot from "./snapshot";
import Pending from "./pending";
import RecentGroups from "./recent-groups";

const Dash: React.FC = () => {
  const containerVars = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="h-fit rounded-4xl bg-white font-sans text-gray-100 shadow-2xl">
      <motion.div
        variants={containerVars}
        initial="initial"
        animate="animate"
        className="mx-auto space-y-6 p-6"
      >
        <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-600 to-blue-800 p-4 shadow-2xl shadow-blue-900/30">
          <div className="relative z-10 flex flex-col items-end justify-between md:flex-row md:items-center">
            <div>
              <p className="text-sm font-medium tracking-wider text-blue-100/80 uppercase">
                Total Net Balance
              </p>
              <h1 className="mt-2 text-5xl font-bold">$1,240.00</h1>
              <div className="mt-4 flex gap-4">
                <div className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-md">
                  <p className="text-xs text-blue-200">You are owed</p>
                  <p className="font-semibold text-green-400">+$1,500.00</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-md">
                  <p className="text-xs text-blue-200">You owe</p>
                  <p className="font-semibold text-gray-300">$260.00</p>
                </div>
              </div>
            </div>
            <div className="hidden opacity-20 md:block">
              <Plus size={120} strokeWidth={1} />
            </div>
          </div>
        </section>
        <section className="grid grid-cols-2 gap-4 rounded-xl bg-white p-2 shadow-2xl md:grid-cols-4">
          {[
            { label: "Add Expense", icon: Plus, primary: true },
            { label: "Settle Up", icon: Send },
            { label: "Export", icon: FileText },
            { label: "Invite", icon: UserPlus },
          ].map((action) => (
            <motion.button
              key={action.label}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center justify-center gap-2 rounded-xl p-4 font-medium transition-colors ${
                action.primary
                  ? "bg-blue-500 text-white hover:bg-blue-400"
                  : "border border-gray-800 bg-[#1A1C1E] text-gray-300 hover:border-gray-600"
              }`}
            >
              <action.icon size={20} />
              {action.label}
            </motion.button>
          ))}
        </section>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-xl bg-white p-3 shadow-2xl">
            <RecentActivity />
          </div>
          <div className="rounded-xl bg-white p-3 shadow-2xl">
            <RecentGroups />
          </div>
          <div className="space-y-8 rounded-xl bg-white p-3 shadow-2xl">
            <Pending />
            <Snapshot />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
export default Dash;
