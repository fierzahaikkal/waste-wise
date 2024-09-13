import AuthButtonClient from "@/components/auth-button/auth-button.client";
import BrandLogo from "@/components/brand-logo";
import { cn } from "@nextui-org/react";

const NavBarDesktop = () => {
  return (
    <section className="flex items-center justify-between p-12">
      <BrandLogo iconSize={56} textSize="5xl" className="text-white" />
      <nav>
        <ul className="flex items-center gap-4">
          <li className="cursor-pointer font-normal text-white transition-all hover:text-highland-300">
            Services
          </li>
          <li className="cursor-pointer font-normal text-white transition-all hover:text-highland-300">
            Education
          </li>
          <li className="cursor-pointer font-normal text-white transition-all hover:text-highland-300">
            About Us
          </li>
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
