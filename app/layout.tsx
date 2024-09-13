import { Poppins } from "next/font/google";
import "./globals.css";
import UIProvider from "@/components/NextUIProvider";
import React from "react";
import ReactQueryProvider from "@/components/contexts/react-query";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "WasteWise: Recycling Waste to Wealth",
  description:
    "WasteWise is a platform that connects waste collectors with recycling companies to create a circular economy.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <div id="nav-portal" />
        <ReactQueryProvider>
          <UIProvider>
            <main>{children}</main>
          </UIProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
