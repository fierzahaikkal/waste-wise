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
        <div className="space-y-4">
          <SubTitle text="About Us" className="text-base font-medium" />
          <p className="text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus luctus ante eget
            magna ullamcorper placerat. Nam lobortis est at sapien suscipit porta. Donec vel felis
            fringilla, dictum enim id, tincidunt orci. Donec interdum id nisi sed malesuada. Fusce
            leo nulla, tincidunt nec laoreet at, vulputate nec nunc. Interdum et malesuada fames ac
            ante ipsum primis in faucibus. Suspendisse potenti.
          </p>
        </div>
        <form className="flex w-full flex-col items-center space-y-4 rounded-xl bg-[#292A32] px-6 py-10">
          <Input
            size="lg"
            placeholder="Email"
            name="email"
            variant="bordered"
            className="w-full border-gray-400"
          />
          <Button className="font-regular w-full bg-highland-400 px-6 py-4">
            Subscribe to News
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
