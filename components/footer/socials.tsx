import { Instagram, Linkedin, MapPinned, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

const Socials = () => {
  return (
    <div className="flex items-center gap-4">
      <Link
        href="https://maps.app.goo.gl/efakfH7KtxFFGz15A?g_st=com.google.maps.preview.copy"
        rel="noopener noreferrer"
        target="_blank"
        className="grid place-items-center rounded-full bg-white p-3 leading-none"
      >
        <MapPinned color="black" />
      </Link>
      <Link
        href="http://instagram.com/wastewise12"
        rel="noopener noreferrer"
        target="_blank"
        className="grid place-items-center rounded-full bg-white p-3 leading-none"
      >
        <Instagram color="black" />
      </Link>
    </div>
  );
};

export default Socials;
