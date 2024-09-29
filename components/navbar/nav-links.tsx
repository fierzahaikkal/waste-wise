"use client";

import { cn } from "@/utils/cn";
import Link from "next/link";
import useAuth from "@/hooks/use-auth";
import AuthButtonClient from "../auth-button/auth-button.client";

const NavLinks = () => {
  const { user } = useAuth();
  const role = user?.role;

  return (
    <nav>
      <ul className="flex items-center gap-4">
        <Link href={"/shop"}>
          <li className="cursor-pointer font-normal transition-all hover:text-highland-300">
            Toko
          </li>
        </Link>
        <Link
          href={`${role === "master" || role === "admin" ? "/dashboard/waste-bank" : "/user/dashboard/waste-bank"}`}
        >
          <li className="cursor-pointer font-normal transition-all hover:text-highland-300">
            Dashboard
          </li>
        </Link>
        <Link href={"/education"}>
          <li className="cursor-pointer font-normal transition-all hover:text-highland-300">
            Edukasi
          </li>
        </Link>
        <Link href={"/team"}>
          <li className="cursor-pointer font-normal transition-all hover:text-highland-300">
            Tentang Kami
          </li>
        </Link>
        <li>
          <div className={cn("flex items-center gap-2")}>
            <AuthButtonClient />
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default NavLinks;
