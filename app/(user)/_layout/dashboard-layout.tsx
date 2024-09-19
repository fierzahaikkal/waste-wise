/* eslint-disable react/jsx-no-constructed-context-values */

"use client";

import React from "react";
import { SidebarContext } from "../_contexts/sidebar-context";
import { NavbarWrapper } from "../_components/navbar/navbar";
import { useLockedBody } from "@/hooks/use-locked-body";
import { SidebarWrapper } from "../_components/sidebar/sidebar";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [, setLocked] = useLockedBody(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };

  return (
    <SidebarContext.Provider
      value={{
        collapsed: sidebarOpen,
        setCollapsed: handleToggleSidebar,
      }}
    >
      <section className="flex">
        <SidebarWrapper />
        <NavbarWrapper>{children}</NavbarWrapper>
      </section>
    </SidebarContext.Provider>
  );
};
