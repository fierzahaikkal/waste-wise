import React from "react";

const FooterMobile = () => {
  return (
    <footer className="mx-auto w-[70%] rounded-lg bg-black px-6 py-8 text-white lg:w-[80%]">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Section 1 */}
        <div>
          <h3 className="mb-4 text-lg font-bold text-[#749567]">About Us</h3>
          <p className="text-gray-400">
            We are a dedicated team providing the best services in the industry. Join us on our
            journey to make the world greener!
          </p>
        </div>

        {/* Section 2 */}
        <div>
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
        </div>

        {/* Section 3 */}
        <div>
          <h3 className="mb-4 text-lg font-bold text-[#749567]">Subscribe to Our Newsletter</h3>
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-md bg-gray-800 p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#749567]"
            />
            <button
              type="submit"
              className="w-full rounded-md bg-[#749567] px-4 py-2 text-white transition-all duration-300 hover:bg-[#567755]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-6 text-center">
        <p className="text-gray-400">© 2024 GreenWorld. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default FooterMobile;
