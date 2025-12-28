import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Users, Wallet } from "lucide-react";
import { TextAnimate } from "../ui/text-animate";

const ExpenseModesSection: React.FC = () => {
  return (
    <section className="w-full bg-slate-50 py-6 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <TextAnimate className="text-4xl font-bold text-slate-900">
            One app. Two ways to manage money.
          </TextAnimate>
          <p className="mt-3 text-slate-600">
            Whether it’s just you or a group - Splito adapts.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
            className="group relative rounded-2xl bg-white p-8 shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Wallet />
            </div>

            <h3 className="mt-6 text-2xl font-semibold text-slate-900">
              Personal expenses
            </h3>

            <p className="mt-3 max-w-sm text-slate-600">
              Track your own spending without splitting. Stay aware of where
              your money goes—no groups involved.
            </p>

            <motion.button
              whileHover={{ x: 4 }}
              className="mt-6 inline-flex items-center gap-2 font-medium text-blue-600"
            >
              Track personal spending
              <ArrowRight size={16} />
            </motion.button>
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-blue-50/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 16,
              delay: 0.05,
            }}
            className="group relative rounded-2xl bg-blue-600 p-8 text-white shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
              <Users />
            </div>

            <h3 className="mt-6 text-2xl font-semibold">Group expenses</h3>

            <p className="mt-3 max-w-sm text-blue-100">
              Split bills across trips, flats, or teams. Everyone sees what they
              owe - clearly and fairly.
            </p>

            <motion.button
              whileHover={{ x: 4 }}
              className="mt-6 inline-flex items-center gap-2 font-medium text-white"
            >
              Manage group splits
              <ArrowRight size={16} />
            </motion.button>
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExpenseModesSection;
