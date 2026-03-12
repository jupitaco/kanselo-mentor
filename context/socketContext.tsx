"use client";

import { createContext, FC, ReactNode, useContext } from "react";
import { Socket } from "socket.io-client";
import useWebSocket from "@/hooks/useSocket";
import { useAuthContext } from "./authContext";

type SocketContextType = {
  connectSocket: Socket | null;
};

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { currentUserData } = useAuthContext();
  const { connectSocket } = useWebSocket(currentUserData?._id);

  return (
    <SocketContext.Provider value={{ connectSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within a SocketProvider");
  }
  return context;
};
