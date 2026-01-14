import { useAppSelector } from "@/redux/hooks";
import React from "react";
import ComponentWithSkeleton from "../utils/component-with-skeleton";
import SummaryShimmer from "../shimmers/summary-cards";
import type { GroupDetails } from "@/redux/features/groups/group-types";

import { AnalyticsPreviewCard } from "./analytics-card";
import { PersonalBalanceCard } from "./balance-card";
import { TotalSpentCard } from "./total-spent-card";

const Summary: React.FC = () => {
  const { currentGroup, currentGroupLoading } = useAppSelector(
    (state) => state.groups,
  );
  return (
    <ComponentWithSkeleton
      loading={currentGroupLoading}
      data={currentGroup}
      Component={SummaryComponent}
      Skeleton={SummaryShimmer}
    />
  );
};

const SummaryComponent: React.FC<{ data: GroupDetails }> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <TotalSpentCard amount={data.total_spent} />
      <PersonalBalanceCard balance={data.my_balance} />
      <AnalyticsPreviewCard />
    </div>
  );
};

export default Summary;
