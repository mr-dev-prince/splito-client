import { Send } from "lucide-react";
import React from "react";

const Chats: React.FC = () => {
  return (
    <div className="flex h-105 flex-col rounded-2xl bg-white shadow-sm">
      <div className="border-b p-4">
        <p className="text-sm font-semibold text-gray-800">Group chat</p>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto p-4 text-sm text-gray-600">
        <p>
          <b>Rahul:</b> Who paid for lunch?
        </p>
        <p>
          <b>You:</b> I did.
        </p>
      </div>
      <div className="flex items-center gap-2 border-t p-3">
        <input
          placeholder="Type a message"
          className="flex-1 rounded-xl border px-3 py-2 text-sm"
        />
        <button className="rounded-xl bg-blue-600 p-2 text-white">
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default Chats;
