/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

"use client";

import { BotMessageSquare, BoxIcon, HomeIcon, TvIcon, Wallet } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSidebarContext } from "../../_contexts/sidebar-context";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { Sidebar } from "./sidebar.styles";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="sticky top-0 z-[20] h-screen">
      {collapsed ? <div className={Sidebar.Overlay()} onClick={setCollapsed} /> : null}
      <div
        className={Sidebar({
          collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <h1 className="text-2xl font-medium">WasteWise</h1>
        </div>
        <div className="flex h-full flex-col justify-between">
          <div className={Sidebar.Body()}>
            <SidebarItem title="Home" icon={<HomeIcon />} isActive={pathname === "/"} href="/" />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                href="/user/dashboard/waste-bank"
                isActive={pathname === "/user/dashboard/waste-bank"}
                title="Waste Bank"
                icon={<TvIcon />}
              />
              <SidebarItem
                isActive={pathname === "/user/dashboard/purchases"}
                href={"/user/dashboard/purchases"}
                title="My Purchases"
                icon={<Wallet />}
              />
              <SidebarItem
                isActive={pathname === "/user/dashboard/chat"}
                href={"/user/dashboard/chat"}
                title="AI Virtual Assistant"
                icon={<BotMessageSquare />}
              />
              <SidebarItem
                isActive={pathname === "/products"}
                title="Products"
                icon={<BoxIcon />}
              />
            </SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};
