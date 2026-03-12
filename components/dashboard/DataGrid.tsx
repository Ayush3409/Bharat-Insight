"use client";

import { useState, useMemo, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useQuery } from "@tanstack/react-query";
import Fuse from "fuse.js";
import { useStore } from "@/store/useStore";
import { DataRow } from "@/types";
import SkeletonLoader from "../ui/SkeletonLoader";

export default function DataGrid() {
  const { currentDepartment, userRole } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});

  const { data: rawData, isLoading } = useQuery({
    queryKey: ["data", currentDepartment.id],
    queryFn: async () => {
      const response = await fetch(`/api/data?dept=${currentDepartment.id}`);
      return response.json() as Promise<DataRow[]>;
    },
  });

  const columns = useMemo(() => {
    if (!rawData || rawData.length === 0) return [];
    return Object.keys(rawData[0]);
  }, [rawData]);

  const fuse = useMemo(() => {
    if (!rawData) return null;
    return new Fuse(rawData, {
      keys: columns,
      threshold: 0.3,
    });
  }, [rawData, columns]);

  const filteredData = useMemo(() => {
    if (!rawData) return [];
    
    let data = rawData;

    if (searchQuery && fuse) {
      data = fuse.search(searchQuery).map((result) => result.item);
    }

    Object.entries(filters).forEach(([column, value]) => {
      if (value) {
        data = data.filter((row) => String(row[column]).includes(value));
      }
    });

    return data;
  }, [rawData, searchQuery, filters, fuse]);

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: filteredData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 10,
  });

  if (isLoading) return <SkeletonLoader />;

  return (
    <div className="glass rounded-xl p-6">
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 glass px-4 py-2 rounded-lg"
        />
        {userRole === "admin" && (
          <button className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600">
            Add Row
          </button>
        )}
      </div>

      <div
        ref={parentRef}
        className="h-[600px] overflow-auto"
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = filteredData[virtualRow.index];
            return (
              <div
                key={virtualRow.index}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                className="flex gap-4 border-b border-white/10 items-center px-4"
              >
                {columns.map((col) => (
                  <div key={col} className="flex-1 truncate">
                    {String(row[col])}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-400">
        Showing {filteredData.length} rows
      </div>
    </div>
  );
}
