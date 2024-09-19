"use client";

import React, { useEffect, useState } from "react";
import { Layout } from "../_layout/dashboard-layout";
import useAuth from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

const DashboardPage = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (!isLoading) {
      if (user?.role === "admin") {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
        router.push("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.role, isLoading]);

  if (isLoading || isAuthorized === null) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-20 w-20 animate-ping rounded-full bg-highland-400" />
      </div>
    );
  }

  return isAuthorized ? <Layout>{children}</Layout> : null;
};

export default DashboardPage;
