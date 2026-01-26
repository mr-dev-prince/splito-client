import { ArrowUpRight, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import CreateGroupModal from "./create-group-modal";
import { fetchGroups } from "@/redux/features/groups/group-thunks";
import { motion } from "framer-motion";
import { notifyError } from "@/lib/toast";
import { useAuth } from "@clerk/clerk-react";

const Hero: React.FC = () => {
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState(false);
  const { list, error } = useAppSelector((state) => state.groups);

  const { isLoaded, isSignedIn } = useAuth();

  const groupCount = list.length;
  const memberCount =
    list.reduce((acc, group) => acc + group.member_count, 0) - groupCount;

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    dispatch(fetchGroups());
  }, [dispatch, isLoaded, isSignedIn]);

  useEffect(() => {
    if (error) {
      notifyError(`Failed to fetch groups: ${error}`);
    }
  }, [error]);

  return (
    <>
      <div className="group relative rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-gray-300">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-100 bg-gray-50 px-3 py-1">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-600" />
              <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                Workspace
              </span>
            </div>

            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Your Groups
              </h1>
              <p className="mt-3 max-w-md text-base leading-relaxed text-gray-500">
                Seamlessly manage shared expenses, track balances, and settle up
                with your inner circle.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* <button className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900">
              <Search size={20} />
            </button> */}
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setOpenModal(true)}
              className="flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-gray-200 transition-all hover:bg-black"
            >
              <Plus size={18} strokeWidth={3} />
              New Group
              <ArrowUpRight size={14} className="ml-1 opacity-50" />
            </motion.button>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 border-t border-gray-100 pt-8 md:grid-cols-4">
          {[
            {
              label: "Active Groups",
              value: groupCount.toString().padStart(2, "0"),
            },
            {
              label: "Total Members",
              value: memberCount.toString().padStart(2, "0"),
            },
          ].map((stat, i) => (
            <div key={i} className="space-y-1">
              <p className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                {stat.label}
              </p>
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
      <CreateGroupModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default Hero;
