"use client";

import React from "react";
import { useMediaQuery } from "usehooks-ts";
import FooterMobile from "./footer-mobile";
import FooterDesktop from "./footer-desktop";
import Show from "@elements/show";

const Footer = () => {
  const mobile = useMediaQuery("(max-width: 1024px)");

  return (
    <>
      <Show when={mobile}>
        <FooterMobile />
      </Show>
      <Show when={!mobile}>
        <FooterDesktop />
      </Show>
    </>
  );
};

export default Footer;
