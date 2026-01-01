import { ChevronRight, ClipboardClock } from "lucide-react";
import React from "react";

interface Settlement {
  id: number;
  name: string;
  amount: number;
  type: "owe" | "owed";
}

const SETTLEMENTS: Settlement[] = [
  { id: 1, name: "Mike", amount: 50, type: "owe" },
  { id: 2, name: "Jane", amount: 120, type: "owed" },
  { id: 3, name: "Alex", amount: 15, type: "owe" },
];

const Pending: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-xl font-semibold text-blue-950">
          <ClipboardClock size={20} className="text-blue-950" /> Pending
        </h3>
        <button className="text-sm text-blue-950 hover:text-blue-500 hover:underline">
          View All
        </button>
      </div>
      <div className="space-y-3">
        {SETTLEMENTS.map((person) => (
          <div
            key={person.id}
            className="flex items-center justify-between rounded-2xl border border-gray-800 bg-[#1A1C1E] p-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-tr from-gray-700 to-gray-600 text-sm font-bold">
                {person.name[0]}
              </div>
              <div>
                <p className="text-sm font-medium">{person.name}</p>
                <p className="text-xs text-gray-500">
                  {person.type === "owe" ? "You owe" : "Owes you"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-sm font-bold ${person.type === "owed" ? "text-blue-400" : "text-gray-400"}`}
              >
                ${person.amount}
              </span>
              <button className="rounded-lg p-2 text-blue-500 transition-colors hover:bg-gray-800">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pending;
