import { AUTH_TOKEN_COOKIE } from "@/utils/constant";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function Protected({ children }: { children: React.ReactNode }) {
  const cookueStore = cookies();
  const token = cookueStore.get(AUTH_TOKEN_COOKIE);
  if (token) {
    return redirect("/");
  }
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}
