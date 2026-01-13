import React from "react";
import type { Member } from "@/redux/features/members/member-types";
import { Bell } from "lucide-react";

interface MemberCardProps {
  data: Member;
}

const MemberCard: React.FC<MemberCardProps> = ({ data }) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-gray-200">
          <span className="text-sm font-medium text-gray-600">
            {data?.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <p className="text-sm text-gray-700">{data?.name}</p>
      </div>
      <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100">
        <Bell size={16} />
      </button>
    </div>
  );
};

export default MemberCard;
