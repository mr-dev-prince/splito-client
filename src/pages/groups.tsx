import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import GroupsTab from "@/components/ui/groups/group-tab";
import VerifyPinModal from "@/components/ui/verify-security-pin";
import { getUserDetails } from "@/redux/features/user/user-thunk";
import { useAuth } from "@clerk/clerk-react";

const Groups: React.FC = () => {
  const { currentUser, loading } = useAppSelector((state) => state.user);
  const [verifyOpen, setVerifyOpen] = useState(false);
  const { isLoaded, isSignedIn } = useAuth();
  const dispatch = useAppDispatch();
  const isPinVerified = sessionStorage.getItem("isPinVerified") === "true";

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    dispatch(getUserDetails());
  }, [dispatch, isLoaded, isSignedIn]);

  useEffect(() => {
    if (!loading && currentUser?.security_pin_active) {
      if (!isPinVerified) {
        setTimeout(() => setVerifyOpen(true), 0);
      }
    }
  }, [loading, currentUser, isPinVerified]);

  return (
    <>
      <div className="p-4">
        <GroupsTab />
      </div>
      <VerifyPinModal
        isOpen={Boolean(currentUser?.security_pin_active) && verifyOpen}
        onClose={() => setVerifyOpen(false)}
      />
    </>
  );
};

export default Groups;
