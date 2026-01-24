import { fetchGroupMembers } from "@/redux/features/members/member-thunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useAuth } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import MemberCard from "./member-card";
import MemberCardShimmer from "../shimmers/member-card";
import ListWithSkeleton from "../utils/list-with-skeleton";
import ErrorOverlay from "../utils/error-overlay";

const Members: React.FC = () => {
  const { list, loading, error } = useAppSelector((state) => state.members);
  const dispatch = useAppDispatch();
  const { isLoaded, isSignedIn } = useAuth();
  const urlSegments = window.location.href.split("/");
  const groupId = urlSegments[urlSegments.length - 1];

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    dispatch(fetchGroupMembers({ groupId: Number(groupId) }));
  }, [dispatch, isLoaded, isSignedIn, groupId]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <p className="mb-3 text-sm font-semibold text-gray-800">Members</p>
      <ErrorOverlay
        error={error}
        onRetry={() =>
          dispatch(fetchGroupMembers({ groupId: Number(groupId) }))
        }
      >
        <ListWithSkeleton
          loading={loading}
          data={list}
          Skeleton={MemberCardShimmer}
          renderItem={(member) => <MemberCard key={member.id} data={member} />}
        />
      </ErrorOverlay>
    </div>
  );
};

export default Members;
