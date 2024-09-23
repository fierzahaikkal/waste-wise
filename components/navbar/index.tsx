"use client";

import useDisclosure from "@/hooks/use-disclosure";
import { Menu } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import ClientOnly from "../elements/client-only";
import Show from "../elements/show";
import NavbarDesktop from "./navbar-desktop";
import NavbarMobile from "./navbar-mobile";

export default function Navbar() {
  const { isOpen, onClose, onOpen } = useDisclosure(false);
  const mobile = useMediaQuery("(max-width: 768px)");

  return (
    <ClientOnly>
      <Show when={mobile} fallback={<NavbarDesktop />}>
        <div className="relative z-[110] flex w-full flex-row items-center justify-between p-8">
          <p className="text-3xl font-bold">Waste Wise</p>
          <button className="rounded-lg bg-slate-100 p-2" onClick={onOpen}>
            <Menu className="text-slate-600" />
          </button>
        </div>
        <NavbarMobile isOpen={isOpen} onClose={onClose} />
      </Show>
    </ClientOnly>
  );
}
