import { Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

const Socials = () => {
  return (
    <div className="flex items-center gap-4">
      <Link href="/" className="grid place-items-center p-1">
        <Linkedin color="white" />
      </Link>
      <Link href="/" className="grid place-items-center p-1">
        <Twitter color="white" />
      </Link>
      <Link href="/" className="grid place-items-center p-1">
        <Instagram color="white" />
      </Link>
    </div>
  );
};

export default Socials;
