import AuthButtonClient from "@/components/auth-button/auth-button.client";
import BrandLogo from "@/components/brand-logo";
import { cn } from "@nextui-org/react";
import Link from "next/link";

const NavBarDesktop = () => {
  return (
    <section className="flex items-center justify-between p-12">
      <BrandLogo iconSize={56} textSize="5xl" className="text-white" />
      <nav>
        <ul className="flex items-center gap-4">
          <li className="cursor-pointer font-normal text-white transition-all hover:text-highland-300">
            <Link href={"/shop"}>Shop</Link>
          </li>
          <li className="cursor-pointer font-normal text-white transition-all hover:text-highland-300">
            <Link href={"/education"}>Education</Link>
          </li>
          <li className="cursor-pointer font-normal text-white transition-all hover:text-highland-300">
            <Link href={"/team"}>About Us</Link>
          </li>
          <li>
            <div className={cn("flex items-center gap-2")}>
              <AuthButtonClient />
            </div>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default NavBarDesktop;
