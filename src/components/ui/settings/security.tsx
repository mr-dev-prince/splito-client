import { EyeOff, Fingerprint, ShieldCheck } from "lucide-react";
import React from "react";
import CustomSwitch from "../custom-switch";
import type { ISettings } from "./main";

interface SecurityProps {
  settings: {
    biometrics: boolean;
    stealthMode: boolean;
  };
  toggle: (key: keyof ISettings) => void;
}

const Security: React.FC<SecurityProps> = ({ settings, toggle }) => {
  return (
    <section className="space-y-6 rounded-xl border border-gray-800 bg-[#1A1C1E] p-4">
      <div className="mb-2 flex items-center gap-3">
        <div className="rounded-lg bg-blue-500/10 p-2 text-blue-400">
          <ShieldCheck size={20} />
        </div>
        <h3 className="font-bold text-gray-100">Security</h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Fingerprint size={18} className="text-gray-500" />
            <p className="text-sm font-medium text-gray-200">
              Biometric Unlock
            </p>
          </div>
          <CustomSwitch
            enabled={settings.biometrics}
            onChange={() => toggle("biometrics")}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <EyeOff size={18} className="text-gray-500" />
            <p className="text-sm font-medium text-gray-200">Stealth Mode</p>
          </div>
          <CustomSwitch
            enabled={settings.stealthMode}
            onChange={() => toggle("stealthMode")}
          />
        </div>

        <button className="mt-2 w-full rounded-xl bg-gray-800 py-2.5 text-xs font-bold tracking-widest text-gray-300 uppercase transition-all hover:bg-gray-700">
          Change Security PIN
        </button>
      </div>
    </section>
  );
};

export default Security;
