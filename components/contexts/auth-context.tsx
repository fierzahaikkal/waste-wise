"use client";

import { ADMIN_ID, AUTH_TOKEN_COOKIE, GOOGLE_USER_ID } from "@/utils/constant";
import { getErrorMessage } from "@/utils/get-error-msg";
import { createSupabaseClient } from "@/utils/supabase/client";
import { deleteCookie, getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

type User = {
  email: string;
  authUserID: string;
  role: string;
  publicUserID: string;
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

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     setIsLoading(true);
  //     try {
  //       const token = getCookie(AUTH_TOKEN_COOKIE);
  //       if (
  //         excludePages.includes(pathname) ||
  //         (pathname.startsWith("/blog/") && pathname.split("/").length === 3)
  //       ) {
  //         setIsAuthenticated(false);
  //         return;
  //       }
  //       if (!token) {
  //         setIsAuthenticated(false);
  //         router.replace("/login");
  //         return;
  //       }
  //       const { data, error } = await supabase.auth.getUser();
  //       if (error) {
  //         setIsAuthenticated(false);
  //         router.replace("/login");
  //         return;
  //       }

  //       // get public userId
  //       const { data: publicUserData, error: publicUserError } = await supabase
  //         .from("users")
  //         .select("id");

  //       if (publicUserError) {
  //         setIsAuthenticated(false);
  //         router.replace("/login");
  //         return;
  //       }

  //       const { data: adminData, error: adminError } = await supabase
  //         .from("users")
  //         .select("*")
  //         .eq("fk_user_id", data.user.id)
  //         .eq("fk_id_role", ADMIN_ID);

  //       if (adminError) {
  //         setIsAuthenticated(false);
  //         router.replace("/login");
  //         return;
  //       }

  //       setUser({
  //         email: data.user.email as string,
  //         authUserID: data.user.id,
  //         role: adminData.length > 0 ? "admin" : "user",
  //         publicUserID: publicUserData[0].id,
  //       });
  //       setIsAuthenticated(true);
  //     } catch (error) {
  //       setUser(null);
  //       setIsAuthenticated(false);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   checkAuth();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const onLogout = () => {
  //   try {
  //     deleteCookie(AUTH_TOKEN_COOKIE);
  //     setUser(null);
  //     setIsAuthenticated(false);
  //     router.replace("/login");
  //   } catch (error) {
  //     toast.error(getErrorMessage(error));
  //   }
  // };

  // return (
  //   <AuthContext.Provider
  //     // eslint-disable-next-line react/jsx-no-constructed-context-values
  //     value={{
  //       user,
  //       isAuthenticated,
  //       onLogout,
  //       isLoading,
  //     }}
  //   >
  //     {children}
  //   </AuthContext.Provider>
  // );

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const token = getCookie(AUTH_TOKEN_COOKIE);
        const sid = getCookie(GOOGLE_USER_ID);
        if (
          excludePages.includes(pathname) ||
          (pathname.startsWith("/blog/") && pathname.split("/").length === 3)
        ) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }
        if (!token && !sid) {
          setIsAuthenticated(false);
          router.replace("/login");
          setIsLoading(false);
          return;
        }
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          setIsAuthenticated(false);
          router.replace("/login");
          setIsLoading(false);
          return;
        }
        const { data: publicUserData, error: publicUserError } = await supabase
          .from("users")
          .select("id")
          .eq("fk_user_id", data.user.id)
          .single();
        if (publicUserError) {
          setIsAuthenticated(false);
          router.replace("/login");
          setIsLoading(false);
          return;
        }
        const { data: adminData, error: adminError } = await supabase
          .from("users")
          .select("*")
          .eq("fk_user_id", data.user.id)
          .eq("fk_id_role", ADMIN_ID)
          .single();
        if (adminError && adminError.code !== "PGRST116") {
          // No rows returned is not a fatal error
          setIsAuthenticated(false);
          router.replace("/login");
          setIsLoading(false);
          return;
        }
        setUser({
          email: data.user.email as string,
          authUserID: data.user.id,
          role: adminData.length > 0 ? "admin" : "user",
          publicUserID: publicUserData.id,
          sid: sid as string,
        });
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Auth check error:", error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [pathname, router]);

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

  const value = useMemo(
    () => ({
      user,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      isAuthenticated: !!user,
      onLogout,
      isLoading,
    }),
    [user, isAuthenticated, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
