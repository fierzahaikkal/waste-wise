"use client";

import useAuth from "@/hooks/use-auth";
import { cn } from "@/utils/cn";
import Link from "next/link";
import AuthButtonClient from "../auth-button/auth-button.client";
import { useEffect, useState } from "react";

const NavLinks = () => {
  const { user } = useAuth();
  const [, setIsReady] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    setIsReady(true);
    setUserRole(user.role);
  }, [user]);

  return (
    <nav>
      <ul className="flex items-center gap-4">
        <Link href={"/shop"}>
          <li className="cursor-pointer font-normal transition-all hover:text-highland-300">
            Toko
          </li>
        </Link>
        <Link
          href={`${userRole === "master" || userRole === "admin" ? "/dashboard/waste-bank" : "/user/dashboard/waste-bank"}`}
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
