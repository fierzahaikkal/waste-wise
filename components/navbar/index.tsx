"use client";

import useDisclosure from "@/hooks/use-disclosure";
import { Menu } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import ClientOnly from "../elements/client-only";
import Show from "../elements/show";
import NavbarDesktop from "./navbar-desktop";
import NavbarMobile from "./navbar-mobile";
import { useEffect, useState } from "react";
import { createSupabaseClient as supabaseClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import ModalUserForm from "@/app/_components/modal-user-form";

export default function Navbar() {
  const { isOpen, onClose, onOpen } = useDisclosure(false);
  const mobile = useMediaQuery("(max-width: 768px)");

  const [user, setUser] = useState<User | null>(null);
  const supabase = supabaseClient();

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser();

        if (authUser) {
          const { data: userData, error: userError } = await supabase
            .from("users")
            .select(
              `
              *,
              roles (
                nama_role
              )
            `
            )
            .eq("fk_user_id", authUser.id)
            .single();

          if (userError) {
            throw userError;
          }

          if (userData) {
            const customUser: User = {
              ...authUser,
              ...userData,
              role: userData.roles?.nama_role || "user", // Set the role
            };
            setUser(customUser);
          } else {
            setUser(authUser);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUser();
  }, [supabase]);

  return (
    <ClientOnly>
      <ModalUserForm user={user} />
      <Show when={mobile} fallback={<NavbarDesktop />}>
        <div className="relative z-[110] flex w-full flex-row items-center justify-between p-8">
          <p className="text-3xl font-bold">Waste Wise</p>
          <ModalUserForm user={user} />
          <button className="rounded-lg bg-slate-100 p-2" onClick={onOpen}>
            <Menu className="text-slate-600" />
          </button>
        </div>
        <NavbarMobile user={user} isOpen={isOpen} onClose={onClose} />
      </Show>
    </ClientOnly>
  );
}
