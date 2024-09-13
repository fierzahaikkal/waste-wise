"use client";

import { AUTH_TOKEN_COOKIE } from "@/utils/constant";
import { getErrorMessage } from "@/utils/get-error-msg";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

type User = {
  email: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  onLogout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = getCookie(AUTH_TOKEN_COOKIE);
        if (!token) {
          setIsAuthenticated(false);
          router.replace("/login");
          return;
        }
        setIsAuthenticated(true);
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLogout = () => {
    try {
      deleteCookie(AUTH_TOKEN_COOKIE);
      setUser(null);
      setIsAuthenticated(false);
      router.replace("/login");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        user,
        isAuthenticated,
        onLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
