"use server";

import { createSupabaseServerClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const signOut = async () => {
  const supabase = createSupabaseServerClient();
  await supabase.auth.signOut();
  return redirect("/login");
};
