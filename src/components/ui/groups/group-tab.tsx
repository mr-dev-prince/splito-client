import React from "react";
import AnalyticSection from "./analytic-section";
import GroupList from "./group-list";
import Hero from "./hero";

const GroupsTab: React.FC = () => {
  return (
    <div className="min-h-screen space-y-4 rounded-2xl border-2 bg-white p-6 shadow-lg">
      <Hero />
      <GroupList />
      <AnalyticSection />
    </div>
  );
};

export default GroupsTab;
