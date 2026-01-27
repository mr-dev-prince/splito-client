import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronRight,
  Lock,
  LogOut,
  Smartphone,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import SetSecurityPinModal from "../set-security-pin";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import ConfirmationPopUp from "../utils/confirmation-pop-up";
import {
  getUserDetails,
  removeUserPin,
} from "@/redux/features/user/user-thunk";
import { notifyError } from "@/lib/toast";

const SettingsItem = ({
  icon: Icon,
  title,
  description,
  action,
  danger = false,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action: React.ReactNode;
  danger?: boolean;
}) => (
  <div className="flex items-center justify-between border-b border-slate-50 py-5 last:border-0">
    <div className="flex items-center gap-4">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${danger ? "bg-rose-50 text-rose-500" : "bg-slate-50 text-slate-500"}`}
      >
        <Icon size={18} />
      </div>
      <div>
        <p
          className={`text-sm font-bold ${danger ? "text-rose-600" : "text-slate-900"}`}
        >
          {title}
        </p>
        <p className="text-xs font-medium text-slate-400">{description}</p>
      </div>
    </div>
    {action}
  </div>
);

const SettingsSection: React.FC = () => {
  const [openSetPin, setOpenSetPin] = useState(false);
  const [confirmingDeactivate, setConfirmingDeactivate] = useState(false);
  const { currentUser, deactivatePinLoading, deactivatePinError } =
    useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const handleSecurityPinToggle = () => {
    if (currentUser?.security_pin_active) {
      setConfirmingDeactivate(true);
    } else {
      setOpenSetPin(true);
    }
  };

  const handleDeactivatePin = async () => {
    await dispatch(removeUserPin());
    await dispatch(getUserDetails());
    setConfirmingDeactivate(false);
  };

  useEffect(() => {
    if (deactivatePinError) {
      notifyError(deactivatePinError);
    }
  }, [deactivatePinError]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm"
      >
        <div className="mb-8 flex items-center justify-between">
          <h3 className="text-lg font-black tracking-tight text-slate-900">
            System Configuration
          </h3>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
            <Smartphone size={16} />
          </div>
        </div>

        <div className="space-y-1">
          <SettingsItem
            icon={Lock}
            title="Security PIN"
            description="Require a 4-digit code to open the app"
            action={
              <div
                onClick={handleSecurityPinToggle}
                className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors duration-300 ${currentUser?.security_pin_active ? "bg-indigo-600" : "bg-slate-200"}`}
              >
                <motion.div
                  animate={{ x: currentUser?.security_pin_active ? 22 : 2 }}
                  className="absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm"
                />
              </div>
            }
          />
          <div className="mt-8 border-slate-100 pt-8">
            <p className="mb-4 text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">
              Danger Zone
            </p>

            <SettingsItem
              icon={LogOut}
              title="Log Out"
              description="Securely sign out of this session"
              action={<ChevronRight size={18} className="text-slate-300" />}
            />

            <SettingsItem
              icon={Trash2}
              title="Delete Account"
              description="Permanently remove all data and groups"
              danger
              action={<ChevronRight size={18} className="text-slate-300" />}
            />
          </div>
        </div>

        <AnimatePresence>
          {currentUser?.security_pin_active && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4"
            >
              <p className="text-xs leading-relaxed font-bold text-indigo-900">
                PIN protection is enabled. You'll be prompted to enter your PIN
                every time you open groups or access sensitive features.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <SetSecurityPinModal
        isOpen={openSetPin}
        onClose={() => setOpenSetPin(false)}
      />
      <ConfirmationPopUp
        loading={deactivatePinLoading}
        open={confirmingDeactivate}
        onCancel={() => setConfirmingDeactivate(false)}
        onConfirm={handleDeactivatePin}
        title="Deactivate Security PIN"
        message="Are you sure you want to deactivate your security PIN? This will remove the PIN requirement from your account."
      />
    </>
  );
};

export default SettingsSection;
