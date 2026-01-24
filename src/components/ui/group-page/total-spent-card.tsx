import { Wallet } from "lucide-react";
import BaseCard from "./base-card";

interface TotalSpentCardProps {
  amount: number;
}

export const TotalSpentCard: React.FC<TotalSpentCardProps> = ({ amount }) => (
  <BaseCard accentColor="blue">
    <div className="flex items-center justify-between">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-4 ring-blue-50/30">
        <Wallet size={22} />
      </div>
      <span className="rounded-full bg-blue-100/50 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-blue-700 uppercase">
        Total Group
      </span>
    </div>
    <div className="mt-8">
      <p className="text-sm font-medium text-gray-500">Group Expenses</p>
      <div className="flex items-baseline gap-1">
        <span className="text-lg font-medium text-gray-400">₹</span>
        <p className="text-3xl font-bold tracking-tight text-gray-900">
          {amount.toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  </BaseCard>
);
