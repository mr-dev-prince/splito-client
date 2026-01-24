import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Trash2, Users } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchGroupData,
  updateGroupName,
} from "@/redux/features/groups/group-thunks";
import { notifyError } from "@/lib/toast";
import Loader from "../utils/loader-component";

interface Member {
  id: number;
  name: string;
}

interface EditGroupModalProps {
  open: boolean;
  onClose: () => void;
  groupId: number;
  groupName: string;
  members: Member[];
  onRemoveMember: (id: number) => void;
}

const EditGroupModal: React.FC<EditGroupModalProps> = ({
  open,
  onClose,
  groupId,
  groupName,
  members,
  onRemoveMember,
}) => {
  const [name, setName] = useState(groupName);
  const [confirm, setConfirm] = useState(false);
  const [removeId, setRemoveId] = useState<number | null>(null);

  const { currentGroupUpdating } = useAppSelector((state) => state.groups);

  const dispatch = useAppDispatch();

  const handleUpdateGroupName = async () => {
    try {
      await dispatch(updateGroupName({ groupId, name }));
      await dispatch(fetchGroupData({ groupId }));
    } catch (error) {
      if (error instanceof Error) {
        notifyError(error.message);
      } else {
        console.error("Failed to update group name:", error);
      }
    }
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-xl ring-1 ring-gray-100"
      >
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Users size={18} />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-800">Edit Group</p>
              <p className="text-sm text-gray-500">
                Update Group name or Remove members
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>
        <div className="mb-5">
          <label className="mb-1 block text-xs text-gray-500">Group name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          <button
            onClick={handleUpdateGroupName}
            className="mt-2 flex h-10 w-full items-center justify-center rounded-xl bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700"
            disabled={currentGroupUpdating}
          >
            {currentGroupUpdating ? (
              <Loader loading={currentGroupUpdating} size="sm" />
            ) : (
              "Save name"
            )}
          </button>
        </div>
        <div>
          <p className="mb-2 text-xs font-medium text-gray-500">Members</p>

          <div className="max-h-56 space-y-2 overflow-y-auto pr-1">
            {members.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-200 text-sm font-medium text-gray-600">
                    {m.name.charAt(0).toUpperCase()}
                  </div>
                  <p className="text-sm text-gray-700">{m.name}</p>
                </div>

                {confirm && removeId === m.id ? (
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setConfirm(false)}
                      className="h-8 rounded-lg bg-gray-200 px-2 text-sm text-gray-700 hover:bg-gray-300"
                    >
                      <X size={16} />
                    </button>
                    <button
                      onClick={() => {
                        if (removeId !== null) {
                          onRemoveMember(removeId);
                        }
                        setConfirm(false);
                      }}
                      className="mr-2 h-8 rounded-lg bg-red-500 px-2 text-sm text-white hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setConfirm(true);
                      setRemoveId(m.id);
                    }}
                    className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditGroupModal;
