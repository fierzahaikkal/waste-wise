"use client";

import React from "react";
import { Layout } from "../../_layout/dashboard-layout";

const DashboardPage = ({ children }: { children: React.ReactNode }) => {
  return <Layout>{children}</Layout>;
};

export default DashboardPage;
