"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider } from "./modalContext";
import { Suspense } from "react";
import { AuthProvider } from "./authContext";
import { UserData } from "@/types/auths";

const queryClient = new QueryClient();
export const Providers = ({
  user,
  children,
}: Readonly<{
  user:UserData
  children: React.ReactNode;
}>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider user={user}>
        <ModalProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </ModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
