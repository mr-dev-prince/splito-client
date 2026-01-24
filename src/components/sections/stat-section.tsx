import React from "react";
import { motion } from "motion/react";
import { TextAnimate } from "../ui/text-animate";
import ExpenseInsightChart from "../ui/expense-insight-chart";
import { NumberTicker } from "../ui/number-ticker";
import GroupSettlementCard from "../ui/home/group-settlement-card";

const Stats: React.FC = () => {
  return (
    <div className="flex w-full flex-col pt-12 pb-6 lg:h-screen lg:pt-0 lg:pb-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col items-center justify-center gap-4 px-6 lg:px-0"
      >
        <TextAnimate
          animation="slideUp"
          by="word"
          className="text-center text-4xl font-bold text-black lg:text-5xl"
        >
          Designed to keep expenses simple.
        </TextAnimate>
        <p className="text-xl font-medium text-gray-400">
          See where your money really goes
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-12 flex w-full flex-col items-start justify-between gap-8 px-4 lg:flex-row lg:px-24"
      >
        <div className="w-full items-center justify-center lg:flex lg:w-1/2">
          <GroupSettlementCard />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          whileHover={{ y: -4 }}
          className="h-full cursor-pointer rounded-xl bg-white p-4 shadow-lg lg:w-1/2"
        >
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-md bg-white px-3 py-1.5 shadow-sm">
              <span className="h-4 w-4 rounded-sm bg-[#1E3A8A]" />
              <p className="text-sm font-medium text-slate-700">Paid by you</p>
            </div>

            <div className="flex items-center gap-2 rounded-md bg-white px-3 py-1.5 shadow-sm">
              <span className="h-4 w-4 rounded-sm bg-[#2563EB]" />
              <p className="text-sm font-medium text-slate-700">You owe</p>
            </div>

            <div className="flex items-center gap-2 rounded-md bg-white px-3 py-1.5 shadow-sm">
              <span className="h-4 w-4 rounded-sm bg-[#60A5FA]" />
              <p className="text-sm font-medium text-slate-700">Owed to you</p>
            </div>
          </div>
          <ExpenseInsightChart />
          <div className="mt-4 flex items-center justify-between px-3">
            <div className="space-y-2">
              <div className="flex gap-1">
                <p className="text-4xl font-black text-blue-950">$</p>
                <NumberTicker
                  className="text-4xl font-black text-blue-950"
                  value={4500}
                />
              </div>
              <p className="text-sm font-medium text-gray-400">
                Total Expenses This Month
              </p>
            </div>
            <div className="w-[40%] rounded-md bg-white p-3 shadow-sm">
              <h4 className="text-sm font-semibold text-slate-900">
                Monthly savings
              </h4>
              <p className="mt-1 text-sm text-slate-600">
                You’re on track to save
                <span className="mx-1 font-semibold text-blue-600">$1,200</span>
                this month.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Stats;
