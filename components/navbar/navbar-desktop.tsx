import Link from "next/link";
import NavLinks from "./nav-links";
import Image from "next/image";
import Logo from "@/public/waste-wise-logo.svg";

export default function NavbarDesktop() {
  return (
    <section className="relative z-[99] flex items-center justify-between pl-12 pr-12 pt-12">
      <Link href="/" className="flex items-center justify-center">
        <Image src={Logo} alt="logo" width={100} height={100} />
        <p className="text-5xl font-bold">WasteWise</p>
      </Link>
      <NavLinks />
    </section>
  );
}
