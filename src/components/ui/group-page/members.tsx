import { fetchGroupMembers } from "@/redux/features/members/member-thunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useAuth } from "@clerk/clerk-react";
import { Bell } from "lucide-react";
import React, { useEffect } from "react";

const Members: React.FC = () => {
  const { list, loading, error } = useAppSelector((state) => state.members);
  const dispatch = useAppDispatch();
  const { isLoaded, isSignedIn } = useAuth();
  const urlSegments = window.location.href.split("/");
  const groupId = urlSegments[urlSegments.length - 1];

  console.log("lists-->", list);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    dispatch(fetchGroupMembers({ groupId: Number(groupId) }));
  }, [dispatch, isLoaded, isSignedIn, groupId]);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <p className="mb-3 text-sm font-semibold text-gray-800">Members</p>
      {list.map((m) => (
        <div key={m.id} className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-gray-200">
              <span className="text-sm font-medium text-gray-600">
                {m.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-gray-700">{m.name}</p>
          </div>
          <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100">
            <Bell size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Members;
