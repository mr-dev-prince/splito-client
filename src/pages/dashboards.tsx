import AnalyticsTab from "@/components/ui/analytics/main";
import Dash from "@/components/ui/dashboard/dash";
import DashboardNav from "@/components/ui/dashboard/dashboard-nav";
import NotificationsTab from "@/components/ui/notifications/main";
import ExpensePlansTab from "@/components/ui/plans/main";
import ProfileTab from "@/components/ui/profile/main";
import SettingsTab from "@/components/ui/settings/main";
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
        return <AnalyticsTab />;
      case "plans":
        return <ExpensePlansTab />;
      case "notifications":
        return <NotificationsTab />;
      case "account":
        return <ProfileTab />;
      case "settings":
        return <SettingsTab />;
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
