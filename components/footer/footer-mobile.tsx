import Link from "next/link";
import BrandLogo from "../brand-logo";
import Socials from "./socials";
import SubTitle from "@/app/_components/subtitle";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import useAuth from "@/hooks/use-auth";

const FooterMobile = () => {
  const { user } = useAuth();
  const role = user?.role;
  return (
    <footer className="mx-auto w-[90%] rounded-tl-xl rounded-tr-xl bg-[#191A23] px-6 py-10 text-white">
      {/* top */}
      <section className="mb-8 flex flex-col items-center space-y-6">
        <BrandLogo iconSize={48} textSize="text-4xl" />
        {/* nav */}
        <nav className="flex flex-col items-center space-y-3">
          <Link
            className="font-light underline transition-all hover:text-highland-300"
            href={"/shop"}
          >
            Toko
          </Link>
          <Link
            className="font-light underline transition-all hover:text-highland-300"
            href={`${role === "admin" ? "/dashboard" : "/user/dashboard"}`}
          >
            Dashboar
          </Link>
          <Link
            className="font-light underline transition-all hover:text-highland-300"
            href={"/education"}
          >
            Edukasi
          </Link>
          <Link
            className="font-light underline transition-all hover:text-highland-300"
            href={"/team"}
          >
            Tentang Kami
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
          <SubTitle text="Tentang Kami" className="text-base font-medium" />
          <p className="text-gray-400">
            WasteWise adalah platform bank sampah digital yang membantu Anda mengubah sampah rumah
            tangga menjadi nilai ekonomis. Dengan layanan pengelolaan sampah yang efektif dan ramah
            lingkungan, kami mendukung gaya hidup berkelanjutan. Daftar sekarang dan mulailah
            berkontribusi untuk lingkungan lebih bersih dan masa depan hijau!
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
