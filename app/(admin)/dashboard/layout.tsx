"use client";

import React, { useEffect, useState } from "react";
import { Layout } from "../_layout/dashboard-layout";
import useAuth from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

const DashboardPage = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [authState, setAuthState] = useState<"loading" | "authorized" | "unauthorized">("loading");

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (!isLoading) {
      if (user?.role === undefined) {
        // Wait a bit for the role to be fetched
        timeoutId = setTimeout(() => {
          if (user?.role === undefined) {
            console.error("User role is undefined after timeout");
            setAuthState("unauthorized");
            router.push("/");
          }
        }, 2000); // Adjust this timeout as needed
      } else if (user.role === "admin" || user.role === "master") {
        setAuthState("authorized");
      } else {
        setAuthState("unauthorized");
        router.push("/");
      }
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [user, isLoading, router]);

  useEffect(() => {}, [user?.role]);

  if (authState === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-20 w-20 animate-ping rounded-full bg-highland-400" />
      </div>
    );
  }

  return authState === "authorized" ? <Layout>{children}</Layout> : null;
};

export default DashboardPage;
