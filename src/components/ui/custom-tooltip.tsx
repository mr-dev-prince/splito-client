import React from "react";

interface TooltipProps {
  active?: boolean;
  payload?: string[];
}

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload }) => {
  if (!active || !payload) return null;

  return (
    <div className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white shadow-lg">
      <p className="font-semibold">$8,450 saved in 6 months</p>
      <p className="text-xs text-slate-300">
        by settling early & avoiding overlaps
      </p>
    </div>
  );
};

export default CustomTooltip;
