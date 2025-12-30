import type { tabType } from "@/pages/dashboards";
import {
  Bell,
  ChartNoAxesCombined,
  CircleUser,
  LayoutDashboard,
  NotebookText,
  Settings,
} from "lucide-react";
import React from "react";

const icon_map: Record<string, React.ReactNode> = {
  dash: <LayoutDashboard />,
  settings: <Settings />,
  account: <CircleUser />,
  analytics: <ChartNoAxesCombined />,
  notifications: <Bell />,
  plans: <NotebookText />,
};

const nav_items: tabType[] = [
  "dash",
  "analytics",
  "plans",
  "notifications",
  "account",
  "settings",
];

interface IDashboardNavProps {
  activeTab: tabType;
  onTabChange: (tab: tabType) => void;
}

const DashboardNav: React.FC<IDashboardNavProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="flex h-full w-18 flex-col items-center justify-center gap-4 bg-white">
      {nav_items.map((item) => (
        <button
          key={item}
          onClick={() => onTabChange(item)}
          className={`flex h-18 w-full cursor-pointer items-center justify-center rounded-xl ${activeTab == item ? "bg-blue-500" : "bg-white"} shadow-xl transition-all duration-300 hover:scale-90 hover:bg-blue-400`}
        >
          {icon_map[item]}
        </button>
      ))}
    </div>
  );
};

export default DashboardNav;
