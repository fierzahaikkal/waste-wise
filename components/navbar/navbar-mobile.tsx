"use client";

import useAuth from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import ReactDOM from "react-dom";
import BrandLogo from "../brand-logo";
import Link from "next/link";
import { BookOpen, Building, LayoutDashboard, ShoppingCart, X } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const NavbarMobile = ({ isOpen, onClose }: Props) => {
  const { onLogout, user } = useAuth();
  const role = user?.role;
  const router = useRouter();
  if (!isOpen) return null;

  const onLogin = () => {
    return router.push("/login");
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[120] flex">
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[100] bg-black opacity-50"
        role="button"
        tabIndex={0}
        onClick={onClose}
        onKeyDown={e => e.key === "Enter" && onClose()}
      />

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 z-[120] h-full w-64 transform bg-white p-6 shadow-lg transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute right-4 top-4 font-bold text-black"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Brand Logo */}
        <div className="mb-8 flex items-center justify-center">
          <BrandLogo iconSize={24} textSize="text-2xl" />
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="space-y-6">
            <li>
              <Link
                href={"/shop"}
                className="flex items-center gap-x-3 text-lg font-semibold text-gray-800 hover:text-gray-500"
              >
                <ShoppingCart className="h-5 w-5" /> Shop
              </Link>
            </li>
            <li>
              <Link
                href={`${role === "master" ? "/dashboard" : "/user/dashboard"}`}
                className="flex items-center gap-x-3 text-lg font-semibold text-gray-800 hover:text-gray-500"
              >
                <LayoutDashboard className="h-5 w-5" /> Dashboard
              </Link>
            </li>
            <li>
              <Link
                href={"/education"}
                className="flex items-center gap-x-3 text-lg font-semibold text-gray-800 hover:text-gray-500"
              >
                <BookOpen className="h-5 w-5" /> Education
              </Link>
            </li>
            <li>
              <Link
                href={"/team"}
                className="flex items-center gap-x-3 text-lg font-semibold text-gray-800 hover:text-gray-500"
              >
                <Building className="h-5 w-5" />
                About Us
              </Link>
            </li>
          </ul>
        </nav>

        {/* Login/Logout Button */}
        <div className="absolute bottom-8 left-0 w-full px-6">
          <button
            onClick={user ? onLogout : onLogin}
            className="w-full rounded-md bg-highland-500 py-2 text-white hover:bg-highland-600"
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("nav-portal")!
  );
};

export default NavbarMobile;
