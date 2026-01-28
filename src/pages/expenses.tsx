import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { AnimatePresence } from "framer-motion";
import ExpenseRow from "@/components/ui/expenses/expense-row";
import ExpenseRowSkeleton from "@/components/ui/shimmers/expense-row";
import ListWithSkeleton from "@/components/ui/utils/list-with-skeleton";
import { RefreshCcw } from "lucide-react";
import VerifyPinModal from "@/components/ui/verify-security-pin";
import { fetchMyExpenses } from "@/redux/features/expenses/expense-thunk";
import { notifyError } from "@/lib/toast";
import { useAuth } from "@clerk/clerk-react";

const ExpensesPage: React.FC = () => {
  const { myExpenses, myExpensesError, myExpensesLoading } = useAppSelector(
    (state) => state.expenses,
  );
  const { currentUser } = useAppSelector((state) => state.user);

  const isPinVerified = sessionStorage.getItem("isPinVerified") === "true";
  const [verifyOpen, setVerifyOpen] = useState(!isPinVerified);

  const { isSignedIn, isLoaded } = useAuth();
  const dispatch = useAppDispatch();

  const handleRefresh = async () => {
    await dispatch(fetchMyExpenses());
  };

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    dispatch(fetchMyExpenses());
  }, [dispatch, isSignedIn, isLoaded]);

  useEffect(() => {
    if (myExpensesError) {
      notifyError(myExpensesError);
    }
  }, [myExpensesError]);

  return (
    <>
      <div className="min-h-screen bg-[#f8fafc] p-6 pb-20">
        <div className="mx-auto max-w-7xl space-y-8">
          <header className="flex flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-gray-900">
                Expenses
              </h1>
              <p className="text-sm font-medium text-gray-500">
                All your expenses in one place
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleRefresh}
                className="flex h-11 items-center gap-2 rounded-2xl bg-white px-4 text-sm font-bold text-gray-700 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50"
              >
                <RefreshCcw size={18} /> Refresh
              </button>
            </div>
          </header>
          <div className="relative overflow-hidden rounded-[32px] border border-gray-50 bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="divide-y divide-gray-50">
              <AnimatePresence mode="popLayout">
                <ListWithSkeleton
                  loading={myExpensesLoading}
                  data={myExpenses}
                  Skeleton={ExpenseRowSkeleton}
                  renderItem={(expense) => (
                    <ExpenseRow key={expense.id} expense={expense} />
                  )}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      <VerifyPinModal
        isOpen={Boolean(currentUser?.security_pin_active) && verifyOpen}
        onClose={() => setVerifyOpen(false)}
      />
    </>
  );
};

export default ExpensesPage;
