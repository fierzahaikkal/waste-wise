import ReactDOM from "react-dom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const NavbarMobile = ({ isOpen, onClose }: Props) => {
  if (!isOpen) return null;

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
      <div className="relative z-[120] h-full w-64 translate-x-0 transform bg-white p-4 shadow-lg transition-transform">
        <button
          className="absolute right-4 top-4 font-bold text-black"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <nav className="mt-8">
          <ul>
            <li className="mb-4">
              <a href="/" className="text-lg">
                Home
              </a>
            </li>
            <li className="mb-4">
              <a href="/about" className="text-lg">
                About
              </a>
            </li>
            <li className="mb-4">
              <a href="/services" className="text-lg">
                Services
              </a>
            </li>
            <li>
              <a href="/contact" className="text-lg">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>,
    document.getElementById("nav-portal")!
  );
};

export default NavbarMobile;
