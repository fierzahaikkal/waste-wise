"use client";

import Show from "@/components/elements/show";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { Input } from "@nextui-org/input";
import { Lock, Mail } from "lucide-react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { AUTH_TOKEN_COOKIE } from "@/utils/constant";
import { SubmitButton } from "../submit-button";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default function SignUpPage({
  searchParams,
}: {
  searchParams: { loginSuccess: string; message: string };
}) {
  const cookueStore = cookies();
  const token = cookueStore.get(AUTH_TOKEN_COOKIE);
  if (token) {
    return redirect("/");
  }

  const signUp = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createSupabaseServerClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return redirect(`/signup?message=${error.message}`);
    }

    revalidatePath("/", "layout");
    return redirect(`/signup?loginSuccess=Check your email for a link to sign in.`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="overflow-hidden rounded-lg bg-white shadow-lg">
          <div className="bg-sage-600 p-8 text-center">
            <h2 className="text-3xl font-bold">Sign up</h2>
            <p className="text-sage-200">Please sign up to your account</p>
          </div>
          {searchParams?.loginSuccess ? (
            <div className="bg-sage-600 p-8 text-center">
              <p className="text-sage-200">{searchParams.loginSuccess}</p>
            </div>
          ) : (
            <form className="space-y-6 p-8" action={signUp}>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full pl-10"
                  />
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={"password"}
                    name="password"
                    placeholder="Enter your password"
                    className="w-full pl-10"
                  />
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
                  />
                </div>
              </div>
              <Show when={!!searchParams?.message}>
                <p className="mt-4 text-danger-500">{searchParams.message}</p>
              </Show>
              <SubmitButton
                className="rounded-lg bg-highland-400 px-4 py-2 text-white"
                type="submit"
                pendingText="Signing In..."
              >
                Sign Up
              </SubmitButton>
            </form>
          )}
          <div className="px-8 pb-8 text-center">
            <p className="text-sm text-gray-600">
              have an account?{" "}
              <Link href="/login" className="text-sage-600 hover:text-sage-800 font-medium">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
