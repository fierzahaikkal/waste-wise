import Link from "next/link";
import BrandLogo from "../brand-logo";
import Socials from "./socials";
import SubTitle from "@/app/_components/subtitle";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

const FooterMobile = () => {
  return (
    <footer className="mx-auto w-[90%] rounded-tl-xl rounded-tr-xl bg-[#191A23] px-6 py-10 text-white">
      {/* top */}
      <section className="mb-8 flex flex-col items-center space-y-6">
        <BrandLogo iconSize={48} textSize="text-4xl" />
        {/* nav */}
        <nav className="flex flex-col items-center space-y-3">
          <Link
            className="font-light underline transition-all hover:text-highland-300"
            href={"/services"}
          >
            Services
          </Link>
          <Link
            className="font-light underline transition-all hover:text-highland-300"
            href={"/education"}
          >
            Education
          </Link>
          <Link
            className="font-light underline transition-all hover:text-highland-300"
            href={"/about"}
          >
            About us
          </Link>
        </nav>
        {/* social */}
        <div>
          <Socials />
        </div>
      </section>
      {/* mid */}
      <div className="flex flex-col items-center space-y-6">
        <div className="space-y-4 text-center">
          <SubTitle text="about us:" className="text-base font-medium" />
          <article className="space-y-2 px-2">
            <p className="capitalize">email: info@wastewise.com</p>
            <p className="capitalize">phone: +62 888-888-888</p>
            <p className="capitalize">address: 123 Main Street, Anytown USA 12345</p>
          </article>
        </div>
        <form className="flex w-full flex-col items-center space-y-4 rounded-xl bg-[#292A32] px-6 py-10">
          <Input size="lg" placeholder="Email" name="email" variant="bordered" className="w-full" />
          <Button className="w-full bg-highland-400 px-6 py-4 font-semibold capitalize">
            Subscribe to news
          </Button>
        </form>
      </div>
      <div className="mt-6 flex flex-col items-center space-y-2 border-t border-gray-300 pt-6 text-center">
        <p className="text-gray-400">© 2024 WasteWise. All rights reserved.</p>
        <p className="text-gray-400">Privacy Policy</p>
      </div>
    </footer>
  );
};

export default FooterMobile;
