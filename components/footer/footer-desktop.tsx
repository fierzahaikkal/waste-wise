import Link from "next/link";
import BrandLogo from "../brand-logo";
import Socials from "./socials";
import useAuth from "@/hooks/use-auth";

const FooterDesktop = () => {
  const { user } = useAuth();
  const role = user?.role;
  return (
    <footer className="mx-auto w-[90%] rounded-t-[45px] bg-[#191A23] px-10 py-14 text-white">
      {/* top */}
      <section className="mb-12 flex items-center justify-between">
        <BrandLogo iconSize={56} textSize="text-5xl" />
        {/* nav */}
        <nav className="flex items-center gap-16">
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
            Dashboard
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
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Section 1 */}
        <div>
          <h3 className="mb-4 text-lg font-bold text-[#749567]">Tentang Kami</h3>
          <p className="text-gray-400">
            WasteWise adalah platform bank sampah digital yang membantu Anda mengubah sampah rumah
            tangga menjadi nilai ekonomis. Dengan layanan pengelolaan sampah yang efektif dan ramah
            lingkungan, kami mendukung gaya hidup berkelanjutan. Daftar sekarang dan mulailah
            berkontribusi untuk lingkungan lebih bersih dan masa depan hijau!
          </p>
        </div>

        {/* Section 3 */}
        <div className="place-content-center rounded-xl bg-[#292A32] px-8 py-6">
          <form className="flex items-center justify-center gap-x-6">
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-lg bg-gray-800 px-4 py-3 text-white ring-1 ring-gray-400 focus:outline-none focus:ring-2 focus:ring-[#749567]"
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-[#749567] px-4 py-3 text-black transition-all duration-300 hover:bg-[#567755]"
            >
              Subscribe to News
            </button>
          </form>
        </div>
      </div>
      <div className="mt-8 flex items-center gap-x-4 border-t border-gray-300 pt-6">
        <p className="text-gray-400">© 2024 WasteWise. All rights reserved.</p>
        <p className="text-gray-400">Privacy Policy</p>
      </div>
    </footer>
  );
};

export default FooterDesktop;
