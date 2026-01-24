import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useAuth } from "@clerk/clerk-react";
import { fetchGroups } from "@/redux/features/groups/group-thunks";
import { notifyError } from "@/lib/toast";
import GroupCard from "./group-card";
import GroupCardShimmer from "../shimmers/group-card";
import ListWithSkeleton from "../utils/list-with-skeleton";

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
      <div className="flex h-fit w-full gap-5 rounded-xl border bg-white p-3">
        <ListWithSkeleton
          loading={loading}
          data={list}
          Skeleton={GroupCardShimmer}
          renderItem={(group) => <GroupCard key={group.id} group={group} />}
          vertical={false}
        />
      </div>
    </div>
  );
};

export default GroupList;
