import Dash from "@/components/ui/dashboard/dash";
import DashboardNav from "@/components/ui/dashboard/dashboard-nav";
import React, { useState } from "react";

export type tabType =
  | "dash"
  | "analytics"
  | "plans"
  | "notifications"
  | "account"
  | "settings";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<tabType>("dash");

  const handleTabChange = (tab: tabType) => {
    setActiveTab(tab);
  };

  const currentActiveTab = (tab: tabType) => {
    switch (tab) {
      case "dash":
        return <Dash />;
      case "analytics":
        return <div>Analytics Content</div>;
      case "plans":
        return <div>Plans Content</div>;
      case "notifications":
        return <div>Notifications Content</div>;
      case "account":
        return <div>Account Content</div>;
      case "settings":
        return <div>Settings Content</div>;
      default:
        return <div>Dashboard Content</div>;
    }
  };

  return (
    <div className="h-fit px-4">
      <div className="flex h-fit gap-4 pb-6">
        <div className="h-[90vh]">
          <DashboardNav activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
        <div className="h-fit flex-1 rounded-lg p-2">
          {currentActiveTab(activeTab)}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
