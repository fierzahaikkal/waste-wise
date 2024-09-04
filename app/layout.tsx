import { Poppins } from "next/font/google";
import "./globals.css";
import UIProvider from "@/components/NextUIProvider";
import React from "react";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="bg-background text-foreground">
        <UIProvider>
          <main className="flex min-h-screen flex-col items-center">{children}</main>
        </UIProvider>
      </body>
    </html>
  );
}
