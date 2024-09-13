import { createSupabaseServerClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function Protected({ children }: { children: React.ReactNode }) {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}
