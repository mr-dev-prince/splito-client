import {
  AlertCircle,
  ArrowRight,
  ChevronDown,
  MoreHorizontal,
  ShieldCheck,
  User2,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import type { AdminGroupSettlementResponse } from "@/redux/features/groups/group-types";
import { BlueLoader } from "@/components/ui/utils/custom-loader";
import VerifyPinModal from "@/components/ui/verify-security-pin";
import { fetchAdminGroupSettlements } from "@/redux/features/groups/group-thunks";
import { useAuth } from "@clerk/clerk-react";

const AdminGroupCard = ({ group }: { group: AdminGroupSettlementResponse }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <motion.div
      layout
      className="overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.03)]"
    >
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <Users size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black tracking-tight text-gray-900">
                {group.group_name}
              </h3>
              <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600 uppercase">
                <ShieldCheck size={10} /> Admin
              </span>
            </div>
            <p className="flex items-center gap-1 text-xs font-medium text-gray-400">
              <User2 size={14} color="green" /> {group.total_members} Members
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`rounded-full p-2 transition-transform ${isOpen ? "rotate-180" : ""} hover:bg-gray-50`}
        >
          <ChevronDown size={20} className="text-gray-400" />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-gray-50 bg-gray-50/30 p-6"
          >
            <p className="mb-4 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
              Internal Debt Matrix
            </p>

            <div className="space-y-3">
              {group.settlements.map((debt, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-gray-700">
                      {debt.from_member_name}
                    </span>
                    <div className="flex items-center gap-1 text-gray-300">
                      <div className="h-px w-8 bg-gray-200" />
                      <ArrowRight size={14} />
                      <div className="h-px w-8 bg-gray-200" />
                    </div>
                    <span className="text-sm font-bold text-gray-700">
                      {debt.to_member_name}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-md font-black text-rose-500">
                      ₹{debt.amount.toLocaleString()}
                    </span>
                    <button className="rounded-lg p-1 text-gray-300 hover:bg-gray-50 hover:text-gray-600">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-xl bg-indigo-50/50 p-3 text-indigo-700">
              <AlertCircle size={14} />
              <p className="text-[11px] font-medium">
                {group.settlements.length} active debts
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const GroupAdminPage: React.FC = () => {
  const isPinVerified = sessionStorage.getItem("isPinVerified") === "true";
  const [verifyOpen, setVerifyOpen] = useState(!isPinVerified);

  const { adminGroupSettlements, adminGroupSettlementsLoading } =
    useAppSelector((state) => state.groups);
  const { isLoaded, isSignedIn } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    dispatch(fetchAdminGroupSettlements());
  }, [dispatch, isSignedIn, isLoaded]);

  return (
    <>
      <div className="min-h-screen bg-[#f8fafc] p-6 pb-20">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="w-full">
            <div className="rounded-xl bg-indigo-600 p-8 text-white shadow-xl shadow-indigo-100 md:col-span-2">
              <h1 className="text-3xl font-black tracking-tight">
                Admin Dashboard
              </h1>
              <p className="mt-1 font-medium text-indigo-100 opacity-80">
                Managing {adminGroupSettlements.length} Active Groups
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="px-2 text-sm font-black tracking-widest text-gray-400 uppercase">
              Managed Groups
            </h2>
            {adminGroupSettlementsLoading ? (
              <div className="flex w-full items-center justify-center">
                <BlueLoader />
              </div>
            ) : (
              adminGroupSettlements.map((group) => (
                <AdminGroupCard key={group.group_id} group={group} />
              ))
            )}
          </div>
        </div>
      </div>
      <VerifyPinModal
        isOpen={!isPinVerified && verifyOpen}
        onClose={() => setVerifyOpen(false)}
      />
    </>
  );
};

export default GroupAdminPage;
