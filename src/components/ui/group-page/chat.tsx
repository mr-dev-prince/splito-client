import React from "react";
import { Send } from "lucide-react";
import { notifyInfo } from "@/lib/toast";

const Chats: React.FC = () => {
  return (
    <div className="flex h-105 flex-col rounded-xl border border-gray-200 bg-white">
      <div className="border-b p-4">
        <p className="text-sm font-semibold text-gray-800">Group chat</p>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto p-4 text-sm text-gray-600">
        <p>
          <b>User :</b> Is this feature available now?
        </p>
        <p>
          <b>Developer :</b> Not yet.
        </p>
      </div>
      <div className="flex items-center gap-2 border-t p-3">
        <input
          placeholder="This feature is coming soon..."
          className="flex-1 rounded-xl border px-3 py-2 text-sm"
        />
        <button
          onClick={() => notifyInfo("Group chat feature coming soon...")}
          className="rounded-xl bg-blue-600 p-2 text-white"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default Chats;
