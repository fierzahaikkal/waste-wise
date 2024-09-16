/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

"use client";

import React from "react";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Tooltip } from "@nextui-org/react";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { usePathname } from "next/navigation";
import { useSidebarContext } from "../../_contexts/sidebar-context";
import {
  AlarmClockPlusIcon,
  AxeIcon,
  BoxIcon,
  FilterIcon,
  HomeIcon,
  Settings2Icon,
  TvIcon,
  UserIcon,
} from "lucide-react";

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
          <h1>Waste Wise</h1>
        </div>
        <div className="flex h-full flex-col justify-between">
          <div className={Sidebar.Body()}>
            <SidebarItem title="Home" icon={<HomeIcon />} isActive={pathname === "/"} href="/" />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                isActive={pathname === "/accounts"}
                title="Accounts"
                icon={<AlarmClockPlusIcon />}
                href="accounts"
              />
              <SidebarItem isActive={pathname === "/payments"} title="Payments" icon={<TvIcon />} />
              <CollapseItems
                icon={<AxeIcon />}
                items={["Banks Accounts", "Credit Cards", "Loans"]}
                title="Balances"
              />
              <SidebarItem
                isActive={pathname === "/customers"}
                title="Customers"
                icon={<UserIcon />}
              />
              <SidebarItem
                isActive={pathname === "/products"}
                title="Products"
                icon={<BoxIcon />}
              />
              <SidebarItem isActive={pathname === "/reports"} title="Reports" icon={<BoxIcon />} />
            </SidebarMenu>

            <SidebarMenu title="General">
              <SidebarItem
                isActive={pathname === "/developers"}
                title="Developers"
                icon={<BoxIcon />}
              />
              <SidebarItem
                isActive={pathname === "/view"}
                title="View Test Data"
                icon={<BoxIcon />}
              />
              <SidebarItem
                isActive={pathname === "/settings"}
                title="Settings"
                icon={<Settings2Icon />}
              />
            </SidebarMenu>

            <SidebarMenu title="Updates">
              <SidebarItem
                isActive={pathname === "/changelog"}
                title="Changelog"
                icon={<BoxIcon />}
              />
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}>
            <Tooltip content={"Settings"} color="primary">
              <div className="max-w-fit">
                <BoxIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Adjustments"} color="primary">
              <div className="max-w-fit">
                <FilterIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Profile"} color="primary">
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" size="sm" />
            </Tooltip>
          </div>
        </div>
      </div>
    </aside>
  );
};
