// useWebSocket.js
import { initSocketConnections } from "@/libs/webSocket";
import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";

const useWebSocket = (userId?: string) => {
  const [connectSocket, setConnectSocket] = useState<Socket | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!userId) {
      return;
    }

    if (socketRef.current) {
      setConnectSocket(socketRef.current);
      return;
    }

    const newSocket = initSocketConnections(userId);
    socketRef.current = newSocket;
    setConnectSocket(newSocket);
  }, [userId]);

  return { connectSocket };
};

export default useWebSocket;
