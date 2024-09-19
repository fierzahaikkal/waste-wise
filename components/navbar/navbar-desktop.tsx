import { cn } from "@/utils/cn";
import AuthButtonClient from "../auth-button/auth-button.client";
import Show from "../elements/show";
import { Recycle } from "lucide-react";
import Link from "next/link";

type NavbarDesktopProps = {
  isSupabaseConnected: boolean;
};

export default function NavbarDesktop(props: NavbarDesktopProps) {
  const { isSupabaseConnected } = props;
  return (
    <section className="flex items-center justify-between pl-12 pr-12 pt-12">
      <Link href="/" className="flex items-center justify-center space-x-4">
        <Recycle color="#a4bc99" size={56} className="text-5xl font-bold" />
        <p className="text-5xl font-bold">WasteWise</p>
      </Link>
      <nav>
        <ul className="flex items-center gap-4">
          <li className="cursor-pointer font-normal transition-all hover:text-highland-300">
            <Link href={"/shop"}>Shop</Link>
          </li>
          <li className="cursor-pointer font-normal transition-all hover:text-highland-300">
            <Link href={"/education"}>Education</Link>
          </li>
          <li className="cursor-pointer font-normal transition-all hover:text-highland-300">
            <Link href={"/team"}>About Us</Link>
          </li>
          <li>
            <Show when={isSupabaseConnected}>
              <div className={cn("flex items-center gap-2")}>
                <AuthButtonClient />
              </div>
            </Show>
          </li>
        </ul>
      </nav>
    </section>
  );
}
