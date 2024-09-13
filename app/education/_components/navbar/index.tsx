"use client";

import ClientOnly from "@/components/elements/client-only";
import Show from "@/components/elements/show";
import NavbarMobile from "@/components/navbar/navbar-mobile";
import { Menu } from "lucide-react";
import NavBarDesktop from "./navbar";
import useDisclosure from "@/hooks/use-disclosure";
import { useMediaQuery } from "usehooks-ts";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure(false);
  const mobile = useMediaQuery("(max-width: 768px)");

  return (
    <ClientOnly>
      <Show when={mobile} fallback={<NavBarDesktop />}>
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
