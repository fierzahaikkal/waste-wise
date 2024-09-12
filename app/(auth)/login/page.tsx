import Show from "@/components/elements/show";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { Input } from "@nextui-org/input";
import { Lock, Mail } from "lucide-react";
import { redirect } from "next/navigation";
import { SubmitButton } from "../submit-button";
import { cookies } from "next/headers";
import { AUTH_TOKEN_COOKIE } from "@/utils/constant";
import Link from "next/link";

export default function Login({ searchParams }: { searchParams: { message: string } }) {
  const cookueStore = cookies();
  const token = cookueStore.get(AUTH_TOKEN_COOKIE);
  if (token) {
    return redirect("/");
  }

  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createSupabaseServerClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect(`/login?message=${error.message}`);
    }

    return redirect("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="overflow-hidden rounded-lg bg-white shadow-lg">
          <div className="bg-sage-600 p-8 text-center">
            <h2 className="text-3xl font-bold">Welcome Back</h2>
            <p className="text-sage-200">Please sign in to your account</p>
          </div>
          <form className="space-y-6 p-8" action={signIn}>
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
              Sign In
            </SubmitButton>
          </form>
          <div className="px-8 pb-8 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-sage-600 hover:text-sage-800 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
