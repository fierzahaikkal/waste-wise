"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const FooterMobile = dynamic(() => import("./footer-mobile"), { ssr: false });
const FooterDesktop = dynamic(() => import("./footer-desktop"), { ssr: false });

const Footer: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{isMobile ? <FooterMobile /> : <FooterDesktop />}</>;
};

export default Footer;
