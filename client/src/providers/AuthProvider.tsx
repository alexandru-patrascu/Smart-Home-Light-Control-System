import React, { createContext, useContext, useState } from "react";
import { User } from "types";

interface AuthContextProps {
  isAuthenticated: boolean;
  loginUser: (data: User) => void;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    window.localStorage.getItem("user") ? true : false
  );

  const loginUser = (data: { username: string; password: string }) => {
    // Perform authentication logic
    setIsAuthenticated(true);
    const { password, ...rest } = data;
    window.localStorage.setItem("user", JSON.stringify(rest));
  };

  const logoutUser = () => {
    // Perform logout logic
    setIsAuthenticated(false);
    window.localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
