import React from "react";
import { Users } from "lucide-react";
import GroupCard from "./group-card";

interface Group {
  id: number;
  name: string;
  members: string[];
  totalSpent: string;
  status: "settled" | "unbalanced";
  color: string;
}

const GROUPS: Group[] = [
  {
    id: 1,
    name: "Manali Trip",
    members: [
      "https://i.pravatar.cc/150?u=1",
      "https://i.pravatar.cc/150?u=2",
      "https://i.pravatar.cc/150?u=3",
    ],
    totalSpent: "$2,450.00",
    status: "unbalanced",
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "Home",
    members: ["https://i.pravatar.cc/150?u=4", "https://i.pravatar.cc/150?u=5"],
    totalSpent: "$1,120.50",
    status: "settled",
    color: "bg-gray-600",
  },
];

const RecentGroups: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-xl font-semibold text-blue-950">
          <Users size={20} className="text-blue-950" /> Recent Groups
        </h3>
        <button className="text-sm text-blue-950 hover:underline">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {GROUPS.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
};

export default RecentGroups;
