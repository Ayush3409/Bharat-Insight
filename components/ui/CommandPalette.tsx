"use client";

import { useState } from "react";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";

const commands = [
  { id: "home", label: "Go to Home", action: "/" },
  { id: "dashboard", label: "Go to Dashboard", action: "/dashboard" },
  { id: "health", label: "Switch to Health", action: "dept:health" },
  { id: "agriculture", label: "Switch to Agriculture", action: "dept:agriculture" },
  { id: "education", label: "Switch to Education", action: "dept:education" },
];

export default function CommandPalette() {
  const [search, setSearch] = useState("");
  const { toggleCommandPalette, setDepartment } = useStore();
  const router = useRouter();

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (action: string) => {
    if (action.startsWith("dept:")) {
      const deptId = action.split(":")[1];
      const dept = useStore.getState().currentDepartment;
      // Switch department logic here
    } else {
      router.push(action);
    }
    toggleCommandPalette();
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center pt-32"
      onClick={toggleCommandPalette}
    >
      <div
        className="glass rounded-xl w-full max-w-2xl p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Type a command..."
          className="w-full glass px-4 py-3 rounded-lg mb-4"
          autoFocus
        />

        <div className="space-y-2">
          {filteredCommands.map((cmd) => (
            <button
              key={cmd.id}
              onClick={() => handleSelect(cmd.action)}
              className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 transition"
            >
              {cmd.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
