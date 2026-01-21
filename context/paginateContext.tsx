"use client";
import usePagination, { UsePaginateData } from "@/hooks/usePagination";
import React, { Dispatch, SetStateAction, useState } from "react";
import { createContext, FC, ReactNode, useContext } from "react";

type othersdata = {
  userId?: string;
  children: ReactNode;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
};

// Define the type for the context
type PaginationContextType = ReturnType<typeof usePagination> & othersdata;

// Create the context
const PaginationContext = createContext<PaginationContextType | undefined>(
  undefined,
);

// Define the provider component
export const PaginationProvider: FC<
  Partial<othersdata> & { data: UsePaginateData }
> = ({ data, userId, children }) => {
  const pagination = usePagination(data);
  const [query, setQuery] = useState<string>("");

  const val = { userId, children, query, setQuery, ...pagination };

  return (
    <PaginationContext.Provider value={val}>
      {children}
    </PaginationContext.Provider>
  );
};

// Custom hook to consume the context
export const usePaginationContext = (): PaginationContextType => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error(
      "usePaginationContext must be used within a PaginationProvider",
    );
  }
  return context;
};
