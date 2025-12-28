import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import ExpenseInsightChart from "../ui/expense-insight-chart";
import ExpenseHandledCard from "../ui/expense-handled-cards";

const BentoSection: React.FC = () => {
  const [assets, setAssets] = useState<{
    trip?: string;
    flats?: string;
    teams?: string;
    vid?: string;
  }>({});

  useEffect(() => {
    const loadAssets = async () => {
      const [trip, flats, teams, vid] = await Promise.all([
        import("@/assets/trip.avif"),
        import("@/assets/flats.avif"),
        import("@/assets/team.avif"),
        import("@/assets/vid.mp4"),
      ]);

      setAssets({
        trip: trip.default,
        flats: flats.default,
        teams: teams.default,
        vid: vid.default,
      });
    };

    loadAssets();
  }, []);

  return (
    <section className="relative h-fit w-full px-4 py-10 lg:h-screen lg:px-32">
      <div className="mx-auto flex h-full flex-col gap-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:grid-rows-6">
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="col-span-6 row-span-3 rounded-2xl bg-white p-8 shadow-sm"
        >
          <p className="text-sm font-medium text-blue-600">
            You stay in control
          </p>
          <h2 className="mt-2 text-4xl font-semibold text-slate-900">
            Manage shared expenses
            <br />
            without the chaos
          </h2>
          <p className="mt-4 max-w-md text-slate-600">
            Track, split, and settle group expenses clearly — so money never
            becomes awkward.
          </p>
        </motion.div>
        <motion.div
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.5 }}
          className="col-span-6 row-span-3 rounded-2xl bg-linear-to-br from-blue-50 to-white p-6 shadow-sm"
        >
          <p className="text-sm font-medium text-blue-600">Spending insights</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">
            See where your money goes
          </h3>

          <div className="mt-6 rounded-xl bg-white shadow-md">
            <ExpenseInsightChart className="h-48" />
          </div>
        </motion.div>
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="col-span-5 row-span-3 rounded-2xl bg-white p-6 shadow-sm"
        >
          <p className="text-sm font-medium text-blue-600">Smart automation</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">
            Split once. Done forever.
          </h3>
          <p className="mt-3 text-slate-600">
            Automatically divide expenses and keep balances updated in real
            time.
          </p>

          {assets.vid && (
            <div className="h-40">
              <video
                className="mt-4 h-full w-full rounded-lg object-cover shadow-md"
                src={assets.vid}
                autoPlay
                loop
                muted
              />
            </div>
          )}
        </motion.div>
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="col-span-7 row-span-3 overflow-hidden rounded-2xl bg-blue-600 p-6 text-white shadow-sm"
        >
          <p className="text-sm font-medium text-blue-200">Built for groups</p>
          <h3 className="mt-1 text-2xl font-semibold">
            Trips, flats, teams—handled
          </h3>
          <p className="mt-1 max-w-md text-blue-100">
            Create groups, add expenses, and settle up without endless
            reminders.
          </p>

          {assets.trip && assets.flats && assets.teams && (
            <div className="mt-3 flex justify-center gap-7">
              <ExpenseHandledCard
                image={assets.trip}
                label="Trips"
                delay={0.1}
              />
              <ExpenseHandledCard
                image={assets.flats}
                label="Flats"
                delay={0.25}
              />
              <ExpenseHandledCard
                image={assets.teams}
                label="Teams"
                delay={0.4}
              />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default BentoSection;
