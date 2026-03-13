// useWebSocket.js
import { initSocketConnections } from "@/libs/webSocket";
import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";

const useWebSocket = (userId?: string) => {
  const [connectSocket, setConnectSocket] = useState<Socket | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const userIdRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!userId) return;

    const existingSocket = socketRef.current;
    const previousUserId = userIdRef.current;

    if (existingSocket && previousUserId === userId) {
      if (existingSocket.disconnected) {
        existingSocket.connect();
      }
      setConnectSocket(existingSocket);
      return;
    }

    // disconnect on logout
    if (existingSocket && previousUserId && previousUserId !== userId) {
      existingSocket.close();
    }

    const newSocket = initSocketConnections(userId);
    socketRef.current = newSocket;
    userIdRef.current = userId;
    setConnectSocket(newSocket);
  }, [userId]);

  return { connectSocket };
};

export default useWebSocket;
