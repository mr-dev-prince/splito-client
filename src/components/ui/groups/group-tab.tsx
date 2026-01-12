import React from "react";
import AnalyticSection from "./analytic-section";
import GroupList from "./group-list";
import Hero from "./hero";

const GroupsTab: React.FC = () => {
  return (
    <div className="min-h-screen space-y-4 rounded-2xl border bg-white p-6 shadow-2xl">
      <AnalyticSection />
      <Hero />
      <GroupList />
    </div>
  );
};

export default GroupsTab;
