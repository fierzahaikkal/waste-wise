import { withHydrationOverlay } from "@builder.io/react-hydration-overlay/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
      {
        protocol: "https",
        hostname: "nextui.org",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "www.toadandco.com",
      },
      {
        protocol: "https",
        hostname: "pelacase.com",
      },
      {
        protocol: "https",
        hostname: "keikofuroshiki.com",
      },
      {
        protocol: "https",
        hostname: "images.squarespace-cdn.com",
      },
      {
        protocol: "https",
        hostname: "saola.com",
      },
      {
        protocol: "https",
        hostname: "kansodesigns.co",
      },
      {
        protocol: "https",
        hostname: "toadandco.com",
      },
      {
        protocol: "https",
        hostname: "www.peacewiththewild.co.uk",
      },
      {
        protocol: "https",
        hostname: "dev-to-uploads.s3.amazonaws.com",
      },
    ],
  },
};

const config =
  process.env.NODE_ENV === "development"
    ? withHydrationOverlay({
        appRootSelector: "main",
      })(nextConfig)
    : nextConfig;

export default config;
