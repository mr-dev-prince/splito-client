import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { BanknoteArrowUp, LogOut, UserRoundPlus } from "lucide-react";
import AddMemberModal from "./add-member-modal";
import AddExpenseModal from "./add-expense-modal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchGroupData } from "@/redux/features/groups/group-thunks";
import { useParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import ComponentWithSkeleton from "../utils/component-with-skeleton";
import GroupHeaderShimmer from "../shimmers/group-header-shimmer";
import type { GroupDetails } from "@/redux/features/groups/group-types";

interface GroupHeaderComponentProps {
  data: GroupDetails | null;
}

const GroupHeader: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();

  const { currentGroup, currentGroupLoading } = useAppSelector(
    (state) => state.groups,
  );

  const { isLoaded, isSignedIn } = useAuth();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    if (!groupId) return;
    const fetchCurrentGroup = async () => {
      await dispatch(fetchGroupData({ groupId: Number(groupId) }));
    };
    fetchCurrentGroup();
  }, [dispatch, groupId, isLoaded, isSignedIn]);

  return (
    <ComponentWithSkeleton
      loading={currentGroupLoading}
      data={currentGroup}
      Component={GroupHeaderComponent}
      Skeleton={GroupHeaderShimmer}
    />
  );
};

const GroupHeaderComponent: React.FC<GroupHeaderComponentProps> = ({
  data,
}) => {
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  return (
    <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-md sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">{data?.name}</h1>
        <p className="text-sm text-gray-500">
          {data?.member_count} members • Active group
        </p>
      </div>
      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAddExpenseModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700"
        >
          <BanknoteArrowUp size={16} />
        </motion.button>
        <motion.button
          onClick={() => setIsAddMemberModalOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700"
        >
          <UserRoundPlus size={16} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <LogOut size={16} />
        </motion.button>
      </div>
      <AddMemberModal
        open={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
      />
      <AddExpenseModal
        open={isAddExpenseModalOpen}
        onClose={() => setIsAddExpenseModalOpen(false)}
      />
    </div>
  );
};

export default GroupHeader;
