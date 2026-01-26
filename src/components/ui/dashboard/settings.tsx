import { AnimatePresence, motion } from "framer-motion";
import {
  BellRing,
  ChevronRight,
  Globe,
  Lock,
  LogOut,
  ShieldCheck,
  Smartphone,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import React, { useState } from "react";

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
  const [pinActive, setPinActive] = useState(false);
  const [pushNotifs, setPushNotifs] = useState(true);

  return (
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
        {/* Security PIN Section */}
        <SettingsItem
          icon={Lock}
          title="Security PIN"
          description="Require a 4-digit code to open the app"
          action={
            <div
              onClick={() => setPinActive(!pinActive)}
              className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors duration-300 ${pinActive ? "bg-indigo-600" : "bg-slate-200"}`}
            >
              <motion.div
                animate={{ x: pinActive ? 22 : 2 }}
                className="absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm"
              />
            </div>
          }
        />

        {/* Biometrics Config (Placeholder for local auth) */}
        <SettingsItem
          icon={ShieldCheck}
          title="Biometric Unlock"
          description="Use FaceID or Fingerprint for quick access"
          action={
            <button className="text-[10px] font-bold tracking-widest text-slate-400 uppercase hover:text-indigo-600">
              Configure
            </button>
          }
        />

        {/* Notifications */}
        <SettingsItem
          icon={BellRing}
          title="Push Notifications"
          description="Get alerts for new expenses and settlements"
          action={
            <div
              onClick={() => setPushNotifs(!pushNotifs)}
              className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors duration-300 ${pushNotifs ? "bg-indigo-600" : "bg-slate-200"}`}
            >
              <motion.div
                animate={{ x: pushNotifs ? 22 : 2 }}
                className="absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm"
              />
            </div>
          }
        />

        {/* Currency/Locale */}
        <SettingsItem
          icon={Globe}
          title="Currency"
          description="Set your primary spending currency"
          action={
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              INR (₹) <ChevronRight size={14} className="text-slate-300" />
            </div>
          }
        />

        {/* Danger Zone */}
        <div className="mt-8 border-t border-slate-100 pt-8">
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
        {pinActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4"
          >
            <p className="text-xs leading-relaxed font-bold text-indigo-900">
              PIN protection is enabled. You'll be prompted to enter your PIN
              every time the app comes to the foreground.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SettingsSection;
