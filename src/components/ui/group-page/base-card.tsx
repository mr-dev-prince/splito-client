import type React from "react";

const BaseCard: React.FC<{
  children: React.ReactNode;
  accentColor: "blue" | "emerald" | "rose" | "indigo";
}> = ({ children, accentColor }) => {
  const colors = {
    blue: "bg-blue-50/50 text-blue-600 ring-blue-50/30",
    emerald: "bg-emerald-50/50 text-emerald-600 ring-emerald-50/30",
    rose: "bg-rose-50/50 text-rose-600 ring-rose-50/30",
    indigo: "bg-indigo-50/50 text-indigo-600 ring-indigo-50/30",
  };

  return (
    <div className="group relative cursor-default overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
      <div
        className={`absolute -top-4 -right-4 h-24 w-24 rounded-full transition-transform duration-500 group-hover:scale-150 ${colors[accentColor].split(" ")[0]}`}
      />
      <div className="relative flex h-full flex-col justify-between">
        {children}
      </div>
    </div>
  );
};

export default BaseCard;
