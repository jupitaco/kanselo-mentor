import { io } from "socket.io-client";

export const initSocketConnections = (userId: string) => {
  return io("kanselo-v1-76e625771f1e.herokuapp.com/presence", {
    query: {
      userId: userId,
    },
  });
};
