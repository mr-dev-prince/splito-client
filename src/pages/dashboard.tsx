import { Bell, Settings } from "lucide-react";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useAuth, useUser } from "@clerk/clerk-react";

import { BlueLoader } from "@/components/ui/utils/custom-loader";
import DashboardAnalytics from "@/components/ui/dashboard/balances-analytics";
import SettingsSection from "@/components/ui/dashboard/settings";
import UserCard from "@/components/ui/dashboard/user-card";
import { fetchGroupAnalytics } from "@/redux/features/groups/group-thunks";
import { getUserDetails } from "@/redux/features/user/user-thunk";
import { notifyError } from "@/lib/toast";

const DashboardPage: React.FC = () => {
  const { user } = useUser();
  const { fullName, primaryEmailAddress, phoneNumbers, imageUrl } = user ?? {};

  const { groupAnalytics, groupAnalyticsLoading, groupAnalyticsError } =
    useAppSelector((state) => state.groups);

  const dispatch = useAppDispatch();

  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (groupAnalyticsError) {
      notifyError(groupAnalyticsError);
    }
  }, [groupAnalyticsError]);

  useEffect(() => {
    if (!isLoaded && !isSignedIn) return;
    dispatch(fetchGroupAnalytics());
    dispatch(getUserDetails());
  }, [dispatch, isLoaded, isSignedIn]);

  const data = {
    owedToYou: groupAnalytics?.owed_to_you || 0,
    youOwe: groupAnalytics?.you_owe || 0,
    activeGroups: groupAnalytics?.total_active_groups || 0,
    thisMonthSpending: groupAnalytics?.mtd_total || 0,
    monthlyAvgSpending: groupAnalytics?.avg_monthly_expense || 0,
  };

  return (
    <div className="min-h-screen bg-[#FBFBFC] p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-black tracking-tight text-slate-900">
            Dashboard
          </h1>
          <div className="flex items-center gap-3">
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm hover:text-slate-900">
              <Bell size={18} />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm hover:text-slate-900">
              <Settings size={18} />
            </button>
          </div>
        </div>
        {groupAnalyticsLoading ? (
          <div className="flex flex-col items-center justify-center gap-6 p-10">
            <BlueLoader />
            <p className="text-xl font-bold text-gray-400">
              Loading... Please wait
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
              <UserCard
                name={fullName ?? "Splito User"}
                email={primaryEmailAddress?.emailAddress ?? "Not Updated"}
                phone={phoneNumbers?.[0]?.phoneNumber ?? "Not Updated"}
                avatar={imageUrl ?? ""}
              />
              <DashboardAnalytics {...data} />
            </div>
            <SettingsSection />
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
