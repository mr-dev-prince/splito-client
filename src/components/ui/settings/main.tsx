import React, { useState } from "react";
import Automation from "./automation";
import Security from "./security";
import Notification from "./notification";

export interface ISettings {
  autoSettle: boolean;
  biometrics: boolean;
  stealthMode: boolean;
  pushNotifications: boolean;
  emailDaily: boolean;
  smartCategorize: boolean;
}

const SettingsTab: React.FC = () => {
  const [settings, setSettings] = useState<ISettings>({
    autoSettle: true,
    biometrics: false,
    stealthMode: false,
    pushNotifications: true,
    emailDaily: false,
    smartCategorize: true,
  });

  const toggle = (key: keyof ISettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="h-screen space-y-6 rounded-xl border bg-white p-4 shadow-2xl">
      <header className="mb-4">
        <h2 className="text-3xl font-bold tracking-tight text-blue-950">
          System Settings
        </h2>
        <p className="mt-1 text-gray-500">
          Configure your automation and security preferences.
        </p>
      </header>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Automation settings={settings} toggle={toggle} />
        <Security settings={settings} toggle={toggle} />
        <Notification settings={settings} toggle={toggle} />
      </div>

      <div className="flex justify-end pt-4">
        <button className="rounded-xl bg-blue-600 px-8 py-3 font-bold text-white shadow-lg shadow-blue-900/40 transition-all hover:bg-blue-500 active:scale-95">
          Apply Configuration
        </button>
      </div>
    </div>
  );
};

export default SettingsTab;
