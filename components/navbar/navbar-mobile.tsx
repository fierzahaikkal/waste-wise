"use client";

import useAuth from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import ReactDOM from "react-dom";
import BrandLogo from "../brand-logo";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const NavbarMobile = ({ isOpen, onClose }: Props) => {
  const { onLogout, isAuthenticated } = useAuth();
  const router = useRouter();
  if (!isOpen) return null;

  const onLogin = () => {
    return router.push("/login");
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[100] bg-black opacity-50"
        role="button"
        tabIndex={0}
        onClick={onClose}
        onKeyDown={e => e.key === "Enter" && onClose()}
      />

      {/* Sidebar */}
      <div className="relative z-[120] h-full w-64 bg-white p-6 shadow-lg transition-transform">
        {/* Close Button */}
        <button
          className="absolute right-4 top-4 font-bold text-black"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        {/* Brand Logo */}
        <div className="mb-8 flex items-center justify-center">
          <BrandLogo iconSize={24} textSize="text-2xl" />
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="space-y-6">
            <li>
              <a href="/" className="text-lg font-semibold text-gray-800 hover:text-gray-500">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="text-lg font-semibold text-gray-800 hover:text-gray-500">
                About
              </a>
            </li>
            <li>
              <a
                href="/services"
                className="text-lg font-semibold text-gray-800 hover:text-gray-500"
              >
                Services
              </a>
            </li>
          </ul>
        </nav>

        {/* Login/Logout Button */}
        <div className="absolute bottom-8 left-0 w-full px-6">
          <button
            onClick={isAuthenticated ? onLogout : onLogin}
            className="w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600"
          >
            {isAuthenticated ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("nav-portal")!
  );
};

export default NavbarMobile;
