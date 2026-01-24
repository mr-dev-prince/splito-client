import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import BaseCard from "./base-card";

export const PersonalBalanceCard = ({ balance }: { balance: number }) => {
  const isPositive = balance > 0;
  const accent = isPositive ? "emerald" : "rose";

  return (
    <BaseCard accentColor={accent}>
      <div className="flex items-center justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ring-4 ${isPositive ? "bg-emerald-50 text-emerald-600 ring-emerald-50/30" : "bg-rose-50 text-rose-600 ring-rose-50/30"}`}
        >
          {isPositive ? (
            <ArrowUpRight size={22} />
          ) : (
            <ArrowDownLeft size={22} />
          )}
        </div>
        <span
          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase ${isPositive ? "bg-emerald-100/50 text-emerald-700" : "bg-rose-100/50 text-rose-700"}`}
        >
          {isPositive ? "To Receive" : "To Pay"}
        </span>
      </div>
      <div className="mt-8">
        <p className="text-sm font-medium text-gray-500">Your Net Balance</p>
        <div className="flex items-baseline gap-1">
          <span
            className={`text-lg font-medium ${isPositive ? "text-emerald-400" : "text-rose-400"}`}
          >
            ₹
          </span>
          <p
            className={`text-3xl font-bold tracking-tight ${isPositive ? "text-emerald-600" : "text-rose-600"}`}
          >
            {Math.abs(balance).toLocaleString("en-IN")}
          </p>
        </div>
        <p className="mt-1 text-xs font-medium text-gray-400">
          {isPositive ? "Settlement incoming" : "Outstanding balance"}
        </p>
      </div>
    </BaseCard>
  );
};
