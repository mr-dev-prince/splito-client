import React, { use, useEffect } from "react";
import Hero from "./hero";
import AnalyticSection from "./analytic-section";
import GroupCard from "./group-card";
import { api } from "@/lib/api";
import { notifyError } from "@/lib/toast";

const groups = [
  {
    id: 1,
    name: "Goa Trip",
    members: 4,
    balance: 1200,
  },
  {
    id: 2,
    name: "Flatmates",
    members: 3,
    balance: -450,
  },
  {
    id: 3,
    name: "Office Lunch",
    members: 6,
    balance: 0,
  },
];

const GroupsTab: React.FC = () => {
  
  const fetchGroups = async () => {
    try {
      const res = await api.get("/groups");
      console.log(res.data);
    } catch (error) {
      if (error instanceof Error) {
        notifyError(error.message);
        console.log("Error fetching groups:", error.message);
      } else {
        notifyError("An unexpected error occurred.");
        console.log("fetchGroups - unexpected error:", error);
      }
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <div className="min-h-screen space-y-4 rounded-2xl border bg-white p-6 shadow-2xl">
      <AnalyticSection />
      <Hero />
      <div className="flex h-fit w-full gap-5 rounded-2xl bg-white p-3 shadow-2xl">
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
};

export default GroupsTab;
