"use client";
import { UserData } from "@/types/auths";
import { createContext, FC, ReactNode, useContext, useState } from "react";
import { useAuthContext } from "./authContext";

// Define the type for context
type SettingsContextType = {
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  formData: Partial<UserData>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<UserData>>>;
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export const SettingsProvider: FC<{
  userData?: UserData;
  children: ReactNode;
}> = ({ userData, children }) => {
  const [edit, setEdit] = useState(false);

  const [formData, setFormData] = useState<Partial<UserData>>({
    fullName: userData?.fullName || "",
    email: userData?.email || "",
    profilePhoto: userData?.profilePhoto || "",
    phoneNumber: userData?.phoneNumber || "",
    country: userData?.country || "",
    state: userData?.state || "",
    city: userData?.city || "",
  });

  return (
    <SettingsContext.Provider value={{ edit, setEdit, formData, setFormData }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error(
      "useSettingsContext must be used within a SettingsProvider",
    );
  }
  return context;
};
