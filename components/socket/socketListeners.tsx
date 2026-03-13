"use client";

import { useEffect } from "react";
import { useSocketContext } from "@/context/socketContext";
import { useModalContext } from "@/context/modalContext";

const SocketListeners = () => {
  const { connectSocket } = useSocketContext();
  const { openModal, setGetData } = useModalContext();

  useEffect(() => {
    if (!connectSocket) return;

    const handleBookingRequest = (payload: Record<string, unknown>) => {
      setGetData(payload);
      openModal("booking-request");
    };

    connectSocket.on("booking:request", handleBookingRequest);

    return () => {
      connectSocket.off("booking:request", handleBookingRequest);
    };
  }, [connectSocket, openModal, setGetData]);

  return null;
};

export default SocketListeners;
