import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { Users, X } from "lucide-react";
import { notifyError, notifySuccess } from "@/lib/toast";

import { addGroupMember } from "@/redux/features/groups/group-thunks";
import { fetchGroupMembers } from "@/redux/features/members/member-thunk";
import { useAppDispatch } from "@/redux/hooks";

interface AddMemberModalProps {
  open: boolean;
  onClose: () => void;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({ open, onClose }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("+91 ");

  const urlSegments = window.location.href.split("/");
  const groupId = urlSegments[urlSegments.length - 1];

  const [usePhone, setUsePhone] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      notifyError("Name and email cannot be empty.");
      return;
    }
    if (usePhone && !phone.trim()) {
      notifyError("Phone number cannot be empty.");
      return;
    }
    if (usePhone && !/^\+?[0-9]{7,15}$/.test(phone.trim())) {
      notifyError("Please enter a valid phone number.");
      return;
    }
    if (usePhone && phone.trim().length < 10) {
      notifyError("Phone number is too short.");
      return;
    }

    const res = await dispatch(
      addGroupMember({
        groupId: Number(groupId),
        name: name.trim(),
        email: usePhone ? null : email.trim(),
        phone: usePhone ? phone.trim() : null,
      }),
    );

    if (addGroupMember.fulfilled.match(res)) {
      await dispatch(fetchGroupMembers({ groupId: Number(groupId) }));
      notifySuccess("Group member added successfully!");
      setName("");
      onClose();
    } else {
      notifyError("Failed to add group member");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 h-full bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-xl ring-1 ring-gray-100"
          >
            <div className="mb-5 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <Users size={18} />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    Add new member
                  </p>
                  <p className="text-sm text-gray-500">
                    Add a new member to your group
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
            <div className="space-y-4">
              <div>
                <label className="mb-1 block pl-2 text-xs text-gray-500">
                  Member Name
                </label>
                <input
                  type="text"
                  placeholder="Enter member's name"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="flex justify-between">
                  <label className="mt-4 mb-1 block pl-2 text-xs text-gray-500">
                    Member {usePhone ? "Phone" : "Email"}
                  </label>
                  <button
                    className="mt-4 mb-1 block pl-2 text-xs text-gray-500 hover:text-blue-500"
                    onClick={() => setUsePhone(!usePhone)}
                  >
                    use phone
                  </button>
                </div>
                <input
                  type={usePhone ? "tel" : "email"}
                  maxLength={usePhone ? 13 : 100}
                  minLength={usePhone ? 10 : undefined}
                  placeholder={`Enter member's ${usePhone ? "phone" : "email"}`}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                  value={usePhone ? phone : email}
                  onChange={(e) =>
                    usePhone
                      ? setPhone(e.target.value)
                      : setEmail(e.target.value)
                  }
                />
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="rounded-xl px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <motion.button
                onClick={handleSubmit}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow hover:bg-blue-700"
              >
                Add member
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddMemberModal;
