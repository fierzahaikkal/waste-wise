import React from "react";

export default function Show({
  children,
  fallback,
  when,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  when: boolean;
}) {
  if (when) {
    return children;
  }
  if (!when && fallback) {
    return fallback;
  }
  return null;
}
