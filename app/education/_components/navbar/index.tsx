"use client";

import ClientOnly from "@/components/elements/client-only";
import Show from "@/components/elements/show";
import NavbarMobile from "@/components/navbar/navbar-mobile";
import { Menu } from "lucide-react";
import NavBarDesktop from "./navbar";
import useDisclosure from "@/hooks/use-disclosure";
import { useMediaQuery } from "usehooks-ts";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createSupabaseClient as supabaseClient } from "@/utils/supabase/client";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure(false);
  const mobile = useMediaQuery("(max-width: 768px)");

  const [user, setUser] = useState<User | null>(null);
  const supabase = supabaseClient();

  useEffect(() => {
    // Get user on component mount
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ClientOnly>
      <Show when={mobile} fallback={<NavBarDesktop />}>
        <div className="flex w-full flex-row items-center justify-between p-8">
          <p className="text-3xl font-bold text-white">Waste Wise</p>
          <button className="rounded-lg bg-slate-100 p-2" onClick={onOpen}>
            <Menu className="text-slate-600" />
          </button>
        </div>
        <NavbarMobile user={user} isOpen={isOpen} onClose={onClose} />
      </Show>
    </ClientOnly>
  );
}
