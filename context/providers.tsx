"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider } from "./modalContext";
import { Suspense } from "react";
import { AuthProvider } from "./authContext";

const queryClient = new QueryClient();
export const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ModalProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </ModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
