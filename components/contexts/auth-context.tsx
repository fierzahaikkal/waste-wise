"use client";

import { ADMIN_ID, AUTH_TOKEN_COOKIE, GOOGLE_USER_ID } from "@/utils/constant";
import { getErrorMessage } from "@/utils/get-error-msg";
import { createSupabaseClient } from "@/utils/supabase/client";
import { deleteCookie, getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

// User type based on the ERD
type User = {
  email: string;
  authUserID: string;
  role: string;
  sid: string;
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
  const pathname = usePathname();
  const excludePages = ["/", "/education", "/blog/", "/team"];

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const token = getCookie(AUTH_TOKEN_COOKIE);
        const sid = getCookie(GOOGLE_USER_ID);

        // Bypass authentication for specific pages
        if (
          excludePages.includes(pathname) ||
          (pathname.startsWith("/blog/") && pathname.split("/").length === 3)
        ) {
          setIsAuthenticated(false);
          return;
        }

        // Redirect to login if no token or sid found
        if (!token && !sid) {
          setIsAuthenticated(false);
          router.replace("/login");
          return;
        }

        const { data: authData, error: authError } = await supabase.auth.getUser();
        if (authError || !authData.user) {
          setIsAuthenticated(false);
          router.replace("/login");
          return;
        }

        // Fetch user data from the "users" table, including "roles" data
        const { data: usersData, error: usersError } = await supabase
          .from("users")
          .select(
            `
            fk_user_id, 
            fk_id_role
          `
          )
          .eq("fk_user_id", authData.user.id)
          .single(); // Ensures we get a single user record

        if (usersError || !usersData) {
          setIsAuthenticated(false);
          router.replace("/login");
          return;
        }

        // Access the role from the usersData.roles array
        const currentRole = usersData.fk_id_role === ADMIN_ID ? "master" : "basic";
        setUser({
          email: authData.user.email as string,
          authUserID: authData.user.id,
          role: currentRole,
          sid: sid as string,
        });

        setIsAuthenticated(true);
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
        toast.error(getErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, user]);

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
