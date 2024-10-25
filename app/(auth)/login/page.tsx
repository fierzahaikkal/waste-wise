import Show from "@/components/elements/show";
import { AUTH_TOKEN_COOKIE } from "@/utils/constant";
import { Input } from "@nextui-org/input";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SubmitButton } from "../submit-button";
import GoogleAuthButton from "./_google-auth";
import { signIn } from "./_actions";
import { Sprout } from "lucide-react";

export default function Login({ searchParams }: { searchParams: { message: string } }) {
  const cookieStore = cookies();
  const token = cookieStore.get(AUTH_TOKEN_COOKIE);
  if (token) {
    return redirect("/form-data");
  }

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1511189226387-984ec4ffea80?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="/">
              <span className="sr-only">Home</span>
              <Sprout className="h-10 w-10" />
            </a>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Selamat Datang di WasteWise
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Masuk atau daftarkan akun mu dan menjadi bagian dari agent of change!
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <Link
                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-highland-600 sm:size-20"
                href="/"
              >
                <span className="sr-only">Home</span>
                <Sprout className="h-8 w-10 sm:h-10" />
              </Link>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Hi Selamat Datang!
              </h1>
            </div>
            <p className="mt-4 leading-relaxed text-gray-500">
              Masuk atau daftarkan akun mu dan menjadi bagian dari agent of change!
            </p>

            <form action={signIn} className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <Input
                  isRequired
                  variant="bordered"
                  description="Masukkan email terdaftarmu"
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  className="w-full"
                />
              </div>

              <div className="col-span-6">
                <Input
                  isRequired
                  variant="bordered"
                  description="Isikan dengan password yang terdaftar"
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  className="w-full"
                />
              </div>
              <Show when={!!searchParams?.message}>
                <p className="col-span-6 mt-4 text-danger-500">{searchParams.message}</p>
              </Show>
              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <SubmitButton
                  className="inline-block w-full shrink-0 rounded-md border border-highland-600 bg-highland-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-highland-600 focus:outline-none focus:ring active:text-highland-500"
                  pendingText="Sign In..."
                  type="submit"
                >
                  Masuk
                </SubmitButton>
              </div>
              <div className="col-span-6 flex w-full items-center justify-center px-8 text-center">
                <p>or sign in with</p>
              </div>
              <div className="col-span-6 flex w-full items-center justify-center px-8 text-center">
                <GoogleAuthButton />
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}
