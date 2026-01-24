import { Zap } from "lucide-react";
import React from "react";
import CustomSwitch from "../custom-switch";
import type { ISettings } from "./main";

interface AutomationProps {
  settings: {
    autoSettle: boolean;
    smartCategorize: boolean;
    emailDaily: boolean;
  };
  toggle: (key: keyof ISettings) => void;
}

const Automation: React.FC<AutomationProps> = ({ settings, toggle }) => {
  return (
    <section className="space-y-6 rounded-xl border border-gray-800 bg-[#1A1C1E] p-4">
      <div className="mb-2 flex items-center gap-3">
        <div className="rounded-lg bg-blue-500/10 p-2 text-blue-400">
          <Zap size={20} />
        </div>
        <h3 className="font-bold text-gray-100">Automation</h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-200">
              Auto-Settle Small Debts
            </p>
            <p className="text-xs text-gray-500">
              Instantly settle amounts under $5.00
            </p>
          </div>
          <CustomSwitch
            enabled={settings.autoSettle}
            onChange={() => toggle("autoSettle")}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-200">
              AI Categorization
            </p>
            <p className="text-xs text-gray-500">
              Automatically tag expenses using ML
            </p>
          </div>
          <CustomSwitch
            enabled={settings.smartCategorize}
            onChange={() => toggle("smartCategorize")}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-200">
              Daily Summary Emails
            </p>
            <p className="text-xs text-gray-500">
              Receive a daily summary of your account activity
            </p>
          </div>
          <CustomSwitch
            enabled={settings.emailDaily}
            onChange={() => toggle("emailDaily")}
          />
        </div>
      </div>
    </section>
  );
};

export default Automation;
