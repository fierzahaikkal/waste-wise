import Link from "next/link";
import BrandLogo from "../brand-logo";
import Socials from "./socials";

const FooterDesktop = () => {
  return (
    <footer className="mx-auto w-[90%] rounded-t-[45px] bg-[#191A23] px-10 py-14 text-white">
      {/* top */}
      <section className="mb-12 flex items-center justify-between">
        <BrandLogo iconSize={56} textSize="text-5xl" />
        {/* nav */}
        <nav className="flex items-center gap-16">
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
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Section 1 */}
        <div>
          <h3 className="mb-4 text-lg font-bold text-[#749567]">About Us</h3>
          <p className="text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus luctus ante eget
            magna ullamcorper placerat. Nam lobortis est at sapien suscipit porta. Donec vel felis
            fringilla, dictum enim id, tincidunt orci. Donec interdum id nisi sed malesuada. Fusce
            leo nulla, tincidunt nec laoreet at, vulputate nec nunc. Interdum et malesuada fames ac
            ante ipsum primis in faucibus. Suspendisse potenti.
          </p>
        </div>

        {/* Section 2 */}
        {/* <div>
          <h3 className="mb-4 text-lg font-bold text-[#749567]">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-[#749567]">
                Home
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-[#749567]">
                Services
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-[#749567]">
                Blog
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-[#749567]">
                Contact
              </a>
            </li>
          </ul>
        </div> */}

        {/* Section 3 */}
        <div className="place-content-center rounded-xl bg-gray-700 px-8 py-6">
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
      <div className="mt-8 border-t border-gray-700 pt-6 text-center">
        <p className="text-gray-400">© 2024 WasteWise. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default FooterDesktop;
