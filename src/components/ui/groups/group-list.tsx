import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useAuth } from "@clerk/clerk-react";
import { fetchGroups } from "@/redux/features/groups/group-thunks";
import { notifyError } from "@/lib/toast";
import GroupCard from "./group-card";
import GroupCardShimmer from "../shimmers/group-card";

const GroupList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector((state) => state.groups);
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    dispatch(fetchGroups());
  }, [dispatch, isLoaded, isSignedIn]);

  useEffect(() => {
    if (error) {
      notifyError(`Failed to fetch groups: ${error}`);
    }
  }, [error]);

  return (
    <div className="space-y-4">
      <div className="flex h-fit w-full gap-5 rounded-2xl bg-white p-3 shadow-2xl">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <GroupCardShimmer key={i} />
            ))
          : list.map((group) => <GroupCard key={group.id} group={group} />)}
      </div>
    </div>
  );
};

export default GroupList;
