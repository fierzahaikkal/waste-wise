/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

"use client";

import React from "react";
import { useSidebarContext } from "../../_contexts/sidebar-context";
import { StyledBurgerButton } from "./navbar.styles";

export const BurguerButton = () => {
  const { setCollapsed } = useSidebarContext();

  return (
    <div
      className={StyledBurgerButton()}
      // open={collapsed}
      onClick={setCollapsed}
    >
      <div />
      <div />
    </div>
  );
};
