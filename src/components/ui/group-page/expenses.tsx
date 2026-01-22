import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useAuth } from "@clerk/clerk-react";
import { fetchExpenses } from "@/redux/features/expenses/expense-thunk";
import { getGroupIdFromPath } from "@/lib/utils";
import ExpenseCard from "./expense-card";
import ListWithSkeleton from "../utils/list-with-skeleton";
import ExpenseCardShimmer from "../shimmers/expense-card";
import ErrorOverlay from "../utils/error-overlay";

export type SortOptions = "latest" | "oldest" | "amount_high" | "amount_low";

const Expenses: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortOptions>("latest");
  const dispatch = useAppDispatch();

  const { list, loading, error } = useAppSelector((state) => state.expenses);
  const { isSignedIn, isLoaded } = useAuth();
  const groupId = getGroupIdFromPath(window.location.pathname);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    if (!groupId) return;
    const fetchData = async () => {
      await dispatch(fetchExpenses({ groupId }));
    };

    fetchData();
  }, [dispatch, isLoaded, isSignedIn, groupId]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold text-gray-800">Expenses</p>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOptions)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
        >
          <option value="latest">Latest first</option>
          <option value="oldest">Oldest first</option>
          <option value="amount_high">Amount: High → Low</option>
          <option value="amount_low">Amount: Low → High</option>
        </select>
      </div>
      <ErrorOverlay
        error={error}
        onRetry={() => dispatch(fetchExpenses({ groupId: Number(groupId) }))}
      >
        <ListWithSkeleton
          loading={loading}
          data={list}
          Skeleton={ExpenseCardShimmer}
          renderItem={(expense) => (
            <ExpenseCard key={expense.id} data={expense} />
          )}
        />
      </ErrorOverlay>
    </div>
  );
};

export default Expenses;
