import Link from "next/link";
import BrandLogo from "../brand-logo";
import Socials from "./socials";
import SubTitle from "@/app/_components/subtitle";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

const FooterDesktop = () => {
  return (
    <footer className="mx-auto w-[90%] rounded-tl-xl rounded-tr-xl bg-[#191A23] px-10 py-14 text-white">
      {/* top */}
      <section className="mb-12 flex items-center justify-between">
        <BrandLogo iconSize={56} textSize="text-5xl" />
        {/* nav */}
        <nav className="flex items-center gap-4">
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
      <div className="flex items-center justify-between">
        <div className="space-y-4">
          <SubTitle text="about us:" className="text-base font-medium" />
          <article className="space-y-2 px-2">
            <p className="capitalize">email: info@wastewise.com</p>
            <p className="capitalize">phone: +62 888-888-888</p>
            <p className="capitalize">address: 123 Main Street, Anytown USA 12345</p>
          </article>
        </div>
        <form className="flex w-[30rem] items-center space-x-2 rounded-xl bg-[#292A32] px-10 py-16">
          <Input size="lg" placeholder="Email" name="email" variant="bordered" />
          <Button className="bg-highland-400 px-10 py-8 font-semibold capitalize">
            Subcribe to news
          </Button>
        </form>
      </div>
      <div className="mt-8 flex items-center gap-x-4 border-t border-gray-300 pt-6">
        <p className="text-gray-400">© 2024 WasteWise. All rights reserved.</p>
        <p className="text-gray-400">Privacy Policy</p>
      </div>
    </footer>
  );
};

export default FooterDesktop;
