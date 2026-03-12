"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider } from "./modalContext";
import { Suspense } from "react";
import { AuthProvider } from "./authContext";
import { SocketProvider } from "./socketContext";
import SocketListeners from "@/components/socket/socketListeners";
import BookingRequestModal from "@/components/main/booking/bookingRequestModal";

const queryClient = new QueryClient();
export const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SocketProvider>
          <ModalProvider>
            <SocketListeners />
            <BookingRequestModal />
            <Suspense fallback={null}>{children}</Suspense>
          </ModalProvider>
        </SocketProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
