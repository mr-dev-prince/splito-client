import { PieChart, TrendingUp } from "lucide-react";
import BaseCard from "./base-card";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchWeeklyActivity } from "@/redux/features/groups/group-thunks";

export const AnalyticsPreviewCard = () => {
  const { currentGroupWeeklyActivity, currentGroupLoading } = useAppSelector(
    (state) => state.groups,
  );

  const groupId = useParams<{ groupId: string }>().groupId;
  const dispatch = useAppDispatch();

  const data = currentGroupWeeklyActivity?.daily ?? [];

  const maxAmount = Math.max(...data.map((d) => d.amount), 1);

  const heights = data.map((d) => Math.round((d.amount / maxAmount) * 80));

  useEffect(() => {
    if (!groupId) return;
    const fetchData = async () => {
      await dispatch(fetchWeeklyActivity({ groupId: Number(groupId) }));
    };
    fetchData();
  }, [dispatch, groupId]);

  if (currentGroupLoading) {
    return <BaseCard accentColor="indigo">Loading…</BaseCard>;
  }

  return (
    <BaseCard accentColor="indigo">
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-4 ring-indigo-50/30">
          <PieChart size={22} />
        </div>
        <div className="flex items-center gap-1 text-emerald-500">
          <TrendingUp size={14} />
          <span className="text-[10px] font-bold uppercase">Active</span>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-sm font-medium text-gray-500">Weekly Activity</p>
        <div className="mt-3 flex items-end gap-2">
          {heights.map((h, i) => (
            <div
              key={i}
              className="relative h-fit flex-1 cursor-pointer overflow-hidden rounded-t-sm bg-indigo-100"
            >
              <div
                className={`h-full bg-indigo-500 transition-all duration-1000 group-hover:bg-indigo-600`}
                style={{ width: "100%", height: `${h > 0 ? h : 1}px` }}
                title={`• ₹${data[i].amount}`}
              />
            </div>
          ))}
        </div>
      </div>
    </BaseCard>
  );
};
