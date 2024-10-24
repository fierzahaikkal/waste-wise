import { AuthContextProvider } from "@/components/contexts/auth-context";
import ReactQueryProvider from "@/components/contexts/react-query";
import UIProvider from "@/components/NextUIProvider";
import { Poppins } from "next/font/google";
import React from "react";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import { HydrationOverlay } from "@builder.io/react-hydration-overlay";
import ProgressBar from "./_components/nprogress";

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
      <script src="https://accounts.google.com/gsi/client" async />
      <body>
        <HydrationOverlay>
          <ReactQueryProvider>
            <AuthContextProvider>
              <div id="nav-portal" />
              <div id="modal" />
              <UIProvider>
                <main>
                  {children}
                  <ProgressBar />
                  <ToastContainer />
                </main>
              </UIProvider>
            </AuthContextProvider>
          </ReactQueryProvider>
        </HydrationOverlay>
      </body>
    </html>
  );
}
