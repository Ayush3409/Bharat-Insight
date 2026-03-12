"use client";

import { useStore, departments } from "@/store/useStore";

export default function Header() {
  const { currentDepartment, userRole, setDepartment, setUserRole } = useStore();

  return (
    <header className="glass border-b border-white/10 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Bharat Insight</h1>
          
          <select
            value={currentDepartment.id}
            onChange={(e) => {
              const dept = departments.find((d) => d.id === e.target.value);
              if (dept) setDepartment(dept);
            }}
            className="glass px-4 py-2 rounded-lg"
            style={{ borderColor: currentDepartment.theme }}
          >
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.icon} {dept.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4">
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value as any)}
            className="glass px-4 py-2 rounded-lg"
          >
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>

          <button className="glass px-4 py-2 rounded-lg hover:bg-white/10">
            <span className="text-sm">Cmd+K</span>
          </button>
        </div>
      </div>
    </header>
  );
}
