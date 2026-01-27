import { BanknoteArrowUp, Edit, Trash2, UserRoundPlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  deleteGroup,
  fetchGroupData,
  fetchGroups,
} from "@/redux/features/groups/group-thunks";
import { notifyError, notifySuccess } from "@/lib/toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useNavigate, useParams } from "react-router-dom";

import AddExpenseModal from "./add-expense-modal";
import AddMemberModal from "./add-member-modal";
import ComponentWithSkeleton from "../utils/component-with-skeleton";
import ConfirmationPopUp from "../utils/confirmation-pop-up";
import EditGroupModal from "./edit-group-modal";
import type { GroupDetails } from "@/redux/features/groups/group-types";
import GroupHeaderShimmer from "../shimmers/group-header-shimmer";
import { motion } from "motion/react";
import { useAuth } from "@clerk/clerk-react";

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
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] =
    useState<boolean>(false);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] =
    useState<boolean>(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState<boolean>(false);

  const [isEditGroupModalOpen, setIsEditGroupModalOpen] =
    useState<boolean>(false);

  const { deleteGroupLoading } = useAppSelector((state) => state.groups);
  const { list } = useAppSelector((state) => state.members);
  const router = useNavigate();

  const dispatch = useAppDispatch();

  const handleDeleteGroup = async () => {
    if (!data?.id) return;
    try {
      await dispatch(deleteGroup({ groupId: data.id })).unwrap();
      setIsDeleteConfirmationOpen(false);
      await dispatch(fetchGroups());
      router("/groups");
      notifySuccess("Group deleted successfully");
    } catch (error) {
      notifyError((error as string) || "Failed to delete group");
    }
  };

  return (
    <div className="mb-6 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
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
          onClick={() => setIsEditGroupModalOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700"
        >
          <Edit size={16} />
        </motion.button>
        {data?.is_admin && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            onClick={() => setIsDeleteConfirmationOpen(true)}
          >
            <Trash2 size={16} />
          </motion.button>
        )}
      </div>
      <AddMemberModal
        open={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
      />
      <AddExpenseModal
        open={isAddExpenseModalOpen}
        onClose={() => setIsAddExpenseModalOpen(false)}
      />
      <ConfirmationPopUp
        message="Are you sure you want to delete this group ? This action cannot be undone."
        onConfirm={handleDeleteGroup}
        onCancel={() => setIsDeleteConfirmationOpen(false)}
        open={isDeleteConfirmationOpen}
        loading={deleteGroupLoading}
      />
      <EditGroupModal
        open={isEditGroupModalOpen}
        onClose={() => setIsEditGroupModalOpen(false)}
        groupName={data?.name || ""}
        groupId={data?.id || 0}
        members={list}
      />
    </div>
  );
};

export default GroupHeader;
