"use client";

import React, { useEffect, useState } from "react";

/**
 * ClientOnly is a React component that ensures its children are only rendered on the client-side.
 * This prevents hydration errors in server-side rendering (SSR) scenarios only if you expect the hydration.
 * @see https://arc.net/l/quote/pucnfesp
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The children to be rendered.
 * @returns {React.ReactNode | null} - Returns the children if running on the client-side, otherwise returns null.
 */
const ClientOnly = ({ children }: { children: React.ReactNode }): React.ReactNode | null => {
  const [isClient, setIsClient] = useState(false);

  // useEffect hook to set isClient state to true when component is mounted on the client-side.
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Render children only if running on the client-side, otherwise return null.
  return isClient ? children : null;
};

export default ClientOnly;
