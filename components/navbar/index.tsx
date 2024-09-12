"use client";

import useDisclosure from "@/hooks/use-disclosure";
import { Menu } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import ClientOnly from "../elements/client-only";
import Show from "../elements/show";
import NavbarDesktop from "./navbar-desktop";
import NavbarMobile from "./navbar-mobile";

type Props = {
  isSupabaseConnected: boolean;
};

export default function Navbar(props: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure(false);
  const mobile = useMediaQuery("(max-width: 768px)");
  const { isSupabaseConnected } = props;

  return (
    <ClientOnly>
      <Show when={mobile} fallback={<NavbarDesktop isSupabaseConnected={isSupabaseConnected} />}>
        <div className="flex w-full flex-row items-center justify-between p-8">
          <p className="text-3xl font-bold">Waste Wise</p>
          <button className="rounded-lg border border-slate-950 p-2" onClick={onOpen}>
            <Menu />
          </button>
        </div>
        <NavbarMobile isOpen={isOpen} onClose={onClose} />
      </Show>
    </ClientOnly>
  );
}
