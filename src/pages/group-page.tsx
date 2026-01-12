import React from "react";
import GroupHeader from "@/components/ui/group-page/header";
import Chats from "@/components/ui/group-page/chat";
import Members from "@/components/ui/group-page/members";
import Expenses from "@/components/ui/group-page/expenses";
import Summary from "@/components/ui/group-page/summary";

const GroupPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <GroupHeader />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Summary />
          <Expenses />
        </div>
        <div className="space-y-6">
          <Members />
          <Chats />
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
