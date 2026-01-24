import { Bell } from "lucide-react";
import React from "react";
import CustomSwitch from "../custom-switch";
import CustomCheckbox from "../custom-checkbox";
import type { ISettings } from "./main";

interface NotificationProps {
  settings: {
    pushNotifications: boolean;
  };
  toggle: (key: keyof ISettings) => void;
}

const Notification: React.FC<NotificationProps> = ({ settings, toggle }) => {
  return (
    <section className="rounded-xl border border-gray-800 bg-[#1A1C1E] p-6 md:col-span-2">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-500/10 p-2 text-blue-400">
            <Bell size={20} />
          </div>
          <h3 className="font-bold text-gray-100">Notification Channels</h3>
        </div>
        <CustomSwitch
          enabled={settings.pushNotifications}
          onChange={() => toggle("pushNotifications")}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 border-t border-gray-800 pt-4 md:grid-cols-3">
        <CustomCheckbox
          checked={true}
          onChange={() => {}}
          label="Group Activity"
        />
        <CustomCheckbox
          checked={true}
          onChange={() => {}}
          label="Debt Reminders"
        />
        <CustomCheckbox
          checked={false}
          onChange={() => {}}
          label="Marketing & Tips"
        />
      </div>
    </section>
  );
};

export default Notification;
