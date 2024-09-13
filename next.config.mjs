import { withHydrationOverlay } from "@builder.io/react-hydration-overlay/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
    ],
  },
};

export default withHydrationOverlay({
  appRootSelector: "main",
})(nextConfig);
