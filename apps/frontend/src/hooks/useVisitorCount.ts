"use client";

import { useEffect, useState } from "react";
import { getSocket } from "@/lib/socket";

export function useVisitorCount() {
  const [count, setCount] = useState<number | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = getSocket();

    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);
    const onCount = (next: number) => setCount(next);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("visitors:count", onCount);

    if (socket.connected) setConnected(true);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("visitors:count", onCount);
    };
  }, []);

  return { count, connected };
}
