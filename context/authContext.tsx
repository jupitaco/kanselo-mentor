"use client";
import { UserData } from "@/types/auths";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type userDataType = {
  code: string;
  email: string;
  id: string;
};

// Define the type for context
type AuthContextType = {
  userData: userDataType;
  setUserData: React.Dispatch<React.SetStateAction<userDataType>>;
  currentUserData: UserData;
  setCurrentUserData: React.Dispatch<React.SetStateAction<UserData>>;
  isClicked: boolean;
  handleToggle: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUserData, setCurrentUserData] = useState<UserData>(
    {} as UserData,
  );
  const [isClicked, setIsClicked] = useState(false);

  const [userData, setUserData] = useState<userDataType>(() => {
    // Load user data from localStorage if available
    const storedUserData =
      typeof window !== "undefined" ? localStorage.getItem("userData") : null;
    return storedUserData ? JSON.parse(storedUserData) : ({} as userDataType);
  });

  useEffect(() => {
    // Save user data to localStorage whenever it changes
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  const handleToggle = () => {
    setIsClicked(!isClicked);
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        currentUserData,
        setCurrentUserData,
        isClicked,
        handleToggle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};
