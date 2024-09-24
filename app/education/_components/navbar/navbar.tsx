import AuthButtonClient from "@/components/auth-button/auth-button.client";
import BrandLogo from "@/components/brand-logo";
import useAuth from "@/hooks/use-auth";
import { cn } from "@nextui-org/react";
import Link from "next/link";

const NavBarDesktop = () => {
  const { user } = useAuth();
  const role = user?.role;
  return (
    <section className="flex items-center justify-between p-12">
      <BrandLogo iconSize={56} textSize="5xl" className="text-white" />
      <nav>
        <ul className="flex items-center gap-4">
          <Link href={"/shop"}>
            <li className="cursor-pointer font-normal text-white transition-all hover:text-highland-300">
              Shop
            </li>
          </Link>
          <Link href={`${role === "admin" ? "/dashboard" : "/user/dashboard"}`}>
            <li className="cursor-pointer font-normal text-white transition-all hover:text-highland-300">
              Dashboard
            </li>
          </Link>
          <Link href={"/education"}>
            <li className="cursor-pointer font-normal text-white transition-all hover:text-highland-300">
              Education
            </li>
          </Link>
          <Link href={"/team"}>
            <li className="cursor-pointer font-normal text-white transition-all hover:text-highland-300">
              About Us
            </li>
          </Link>
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
