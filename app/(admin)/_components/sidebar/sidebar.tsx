/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

"use client";

import { BoxIcon, HomeIcon, TvIcon, UserIcon } from "lucide-react";
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
                href="/dashboard/waste-bank"
                isActive={pathname === "/dashboard/waste-bank"}
                title="Waste Bank"
                icon={<TvIcon />}
              />
              <SidebarItem
                href="/dashboard/orders"
                isActive={pathname === "/dashboard/orders"}
                title="Customer Orders"
                icon={<UserIcon />}
              />
              <SidebarItem
                href="/dashboard/products"
                isActive={pathname === "/dashboard/products"}
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
