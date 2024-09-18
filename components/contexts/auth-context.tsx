"use client";

import { ADMIN_ID, AUTH_TOKEN_COOKIE } from "@/utils/constant";
import { getErrorMessage } from "@/utils/get-error-msg";
import { createSupabaseClient } from "@/utils/supabase/client";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

type User = {
  email: string;
  authUserID: string;
  role: string;
  publicUserID: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  onLogout: () => void;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);
const supabase = createSupabaseClient();

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const token = getCookie(AUTH_TOKEN_COOKIE);
        if (!token) {
          setIsAuthenticated(false);
          router.replace("/login");
          return;
        }
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          setIsAuthenticated(false);
          router.replace("/login");
          return;
        }

        // get public userId
        const { data: publicUserData, error: publicUserError } = await supabase
          .from("users")
          .select("id");

        if (publicUserError) {
          setIsAuthenticated(false);
          router.replace("/login");
          return;
        }

        const { data: adminData, error: adminError } = await supabase
          .from("users")
          .select("*")
          .eq("fk_user_id", data.user.id)
          .eq("fk_id_role", ADMIN_ID);

        if (adminError) {
          setIsAuthenticated(false);
          router.replace("/login");
          return;
        }

        setUser({
          email: data.user.email as string,
          authUserID: data.user.id,
          role: adminData.length > 0 ? "admin" : "user",
          publicUserID: publicUserData[0].id,
        });
        setIsAuthenticated(true);
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
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
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
