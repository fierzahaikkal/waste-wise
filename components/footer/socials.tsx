import { Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

const Socials = () => {
  return (
    <div className="flex items-center gap-4">
      <Link href="/" className="grid place-items-center rounded-full bg-white p-3 leading-none">
        <Linkedin color="black" />
      </Link>
      <Link href="/" className="grid place-items-center rounded-full bg-white p-3 leading-none">
        <Twitter color="black" />
      </Link>
      <Link href="/" className="grid place-items-center rounded-full bg-white p-3 leading-none">
        <Instagram color="black" />
      </Link>
    </div>
  );
};

export default Socials;
