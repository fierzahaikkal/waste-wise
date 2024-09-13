import { AuthButtonClient } from "@/components/auth-button";
import BrandLogo from "@/components/brand-logo";
import Show from "@/components/elements/show";
import { cn } from "@nextui-org/react";
import React from "react";

type Props = {
  isSupabaseConnected: boolean;
};

const NavBar = (props: Props) => {
  const { isSupabaseConnected } = props;
  return (
    <section className="flex items-center justify-between p-12">
      <BrandLogo iconSize={56} textSize="5xl" className="text-white" />
      <nav>
        <ul className="flex items-center gap-4">
          <li className="cursor-pointer font-normal text-white transition-all hover:text-highland-300">
            Services
          </li>
          <li className="cursor-pointer font-normal text-white transition-all hover:text-highland-300">
            Education
          </li>
          <li className="cursor-pointer font-normal text-white transition-all hover:text-highland-300">
            About Us
          </li>
          <li>
            <Show when={isSupabaseConnected}>
              <div className={cn("flex items-center gap-2")}>
                <AuthButtonClient isSecondary />
              </div>
            </Show>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default NavBar;
