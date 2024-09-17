/* eslint-disable react-server-components/use-client */
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
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_60%_60%_at_50%_-20%,#cad8c2,#ffff)]">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="overflow-hidden">
            <div className="bg-sage-600 text-center">
              <h2 className="text-3xl font-bold">Hi There!</h2>
              <p className="text-sage-200">Please sign in to your account</p>
            </div>
            <form className="space-y-6 p-8" action={signIn}>
              <div className="flex items-center justify-center">
                <Mail className="left-3 top-1/2 mr-4 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                <Input
                  isRequired
                  variant="bordered"
                  description="Enter your registered email"
                  name="email"
                  id="email"
                  type="email"
                  label="Email"
                  className="w-full"
                />
              </div>
              <div className="flex items-center justify-center">
                <Lock className="left-3 top-1/2 mr-4 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                <Input
                  isRequired
                  variant="bordered"
                  description="Fill the blank with your password"
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  className="w-full"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
                />
              </div>
              <Show when={!!searchParams?.message}>
                <p className="mt-4 text-danger-500">{searchParams.message}</p>
              </Show>
              <SubmitButton
                className="relative z-0 overflow-hidden rounded-lg bg-highland-400 from-highland-100 px-4 py-2 text-white transition-all duration-500 after:absolute after:inset-0 after:-z-10 after:translate-x-[-150%] after:translate-y-[150%] after:scale-[2.5] after:rounded-[100%] after:bg-gradient-to-l after:transition-transform after:duration-1000 hover:after:translate-x-[0%] hover:after:translate-y-[0%]"
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
    </div>
  );
}
