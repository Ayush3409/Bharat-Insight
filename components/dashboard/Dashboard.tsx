"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/store/useStore";
import Header from "./Header";
import DataGrid from "./DataGrid";
import AIPanel from "./AIPanel";
import CommandPalette from "../ui/CommandPalette";

export default function Dashboard() {
  const { commandPaletteOpen } = useStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        useStore.getState().toggleCommandPalette();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="flex">
        <div className="flex-1 p-6">
          <DataGrid />
        </div>
        <AIPanel />
      </div>
      {commandPaletteOpen && <CommandPalette />}
    </div>
  );
}
