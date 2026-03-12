import { create } from "zustand";

export type UserRole = "admin" | "viewer";

export interface Department {
  id: string;
  name: string;
  theme: string;
  icon: string;
}

interface AppState {
  currentDepartment: Department;
  userRole: UserRole;
  commandPaletteOpen: boolean;
  setDepartment: (dept: Department) => void;
  setUserRole: (role: UserRole) => void;
  toggleCommandPalette: () => void;
}

export const departments: Department[] = [
  { id: "health", name: "Ministry of Health", theme: "#10b981", icon: "🏥" },
  { id: "agriculture", name: "Ministry of Agriculture", theme: "#f59e0b", icon: "🌾" },
  { id: "education", name: "Ministry of Education", theme: "#3b82f6", icon: "📚" },
];

export const useStore = create<AppState>((set) => ({
  currentDepartment: departments[0],
  userRole: "admin",
  commandPaletteOpen: false,
  setDepartment: (dept) => set({ currentDepartment: dept }),
  setUserRole: (role) => set({ userRole: role }),
  toggleCommandPalette: () => set((state) => ({ commandPaletteOpen: !state.commandPaletteOpen })),
}));
