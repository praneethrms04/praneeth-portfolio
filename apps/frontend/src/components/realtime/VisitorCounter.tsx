"use client";

import { useVisitorCount } from "@/hooks/useVisitorCount";

export default function VisitorCounter() {
  const { count, connected } = useVisitorCount();

  return (
    <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
      <span className="relative flex h-2 w-2">
        {connected && (
          <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
        )}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${
            connected ? "bg-green-500" : "bg-gray-500"
          }`}
        />
      </span>
      <span className="text-gray-300">
        {count === null ? (
          <span className="text-gray-500">connecting…</span>
        ) : (
          <>
            <span className="text-white font-semibold">{count}</span>{" "}
            <span className="text-gray-400">
              {count === 1 ? "visitor" : "visitors"} online
            </span>
          </>
        )}
      </span>
    </div>
  );
}
