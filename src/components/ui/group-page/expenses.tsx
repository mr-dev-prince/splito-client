import React, { useEffect } from "react";
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
      <div className="flex items-center justify-between px-4">
        <p className="text-lg font-semibold text-gray-800">Expenses</p>
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
