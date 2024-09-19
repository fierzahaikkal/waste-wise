import { Recycle } from "lucide-react";
import Link from "next/link";
import NavLinks from "./nav-links";

export default function NavbarDesktop() {
  return (
    <section className="relative z-[99] flex items-center justify-between pl-12 pr-12 pt-12">
      <Link href="/" className="flex items-center justify-center space-x-4">
        <Recycle color="#a4bc99" size={56} className="text-5xl font-bold" />
        <p className="text-5xl font-bold">WasteWise</p>
      </Link>
      <NavLinks />
    </section>
  );
}
