"use client";

import React, { useEffect } from "react";
import { Layout } from "../_layout/dashboard-layout";
import useAuth from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

const DashboardPage = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.role !== "admin") {
      router.push("/");
    } else {
      router.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.role]);

  return user?.role === "admin" ? (
    <Layout>{children}</Layout>
  ) : (
    <div className="flex h-screen items-center justify-center">
      <div className="h-20 w-20 animate-ping rounded-full bg-highland-400" />
    </div>
  );
};

export default DashboardPage;
