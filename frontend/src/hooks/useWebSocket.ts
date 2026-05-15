// src/hooks/useWebSocket.ts
import { useEffect, useRef, useState } from 'react';

import type { WSMessage } from '../types';

export function useWebSocket(runId: string) {
  const [lastMessage, setLastMessage] = useState<WSMessage | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!runId) return;
    
    const wsUrl = `${import.meta.env.VITE_WS_URL || 'ws://localhost:8000'}/workflows/ws/run/${runId}`;
    wsRef.current = new WebSocket(wsUrl);

    wsRef.current.onmessage = (ev) => {
      try {
        const data: WSMessage = JSON.parse(ev.data);
        setLastMessage(data);
      } catch (_) {
        // ignore malformed messages
      }
    };

    wsRef.current.onclose = () => {
      wsRef.current = null;
    };

    return () => {
      wsRef.current?.close();
    };
  }, [runId]);

  const sendMessage = (msg: object) => {
    wsRef.current?.send(JSON.stringify(msg));
  };

  return { lastMessage, sendMessage };
}
