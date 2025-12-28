import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import CustomTooltip from "./custom-tooltip";
import type React from "react";
import { cn } from "@/lib/utils";

const data = [
  { month: "Jan", paid: 4000, owe: 1200, owed: 800 },
  { month: "Feb", paid: 5200, owe: 900, owed: 1100 },
  { month: "Mar", paid: 6100, owe: 700, owed: 1400 },
  { month: "Apr", paid: 7200, owe: 500, owed: 1800 },
  { month: "May", paid: 8300, owe: 300, owed: 2100 },
  { month: "Jun", paid: 9400, owe: 200, owed: 2600 },
];

const ExpenseStackedBarChart: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <div
      className={cn(
        "h-80 w-full cursor-pointer border-none outline-none",
        className,
      )}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barGap={2}>
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <YAxis hide />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "transparent" }}
          />
          <Bar
            dataKey="paid"
            stackId="a"
            fill="#0229bf"
            radius={[0, 0, 0, 0]}
          />
          <Bar dataKey="owe" stackId="a" fill="#4e91fd" />
          <Bar
            dataKey="owed"
            stackId="a"
            fill="#2c2cff"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseStackedBarChart;
