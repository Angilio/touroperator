import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { FaWhatsapp } from "react-icons/fa";

export default function GuestLayout({ children }) {
  const [open, setOpen] = useState(false);

  const whatsappNumber = "261325572786";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello%20I%20am%20interested%20in%20your%20excursions`;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* HEADER */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-blue-950/90 text-white backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Brand */}
            <Link href={route("welcome")} className="flex items-center gap-2">
              <ApplicationLogo className="h-10 w-10 fill-current text-white" />
              <div className="leading-tight">
                <p className="text-lg font-extrabold">OZATour</p>
                <p className="text-xs text-white/70 hidden sm:block">
                  Explore Antsiranana
                </p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
              <Link href={route("welcome")} className="hover:text-blue-200 transition">
                Home
              </Link>

              <Link href={route("excursions.clientIndex")} className="hover:text-blue-200 transition">
                Excursions
              </Link>

              <Link href={route("apropos")} className="hover:text-blue-200 transition">
                About
              </Link>

              {/* WhatsApp only */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 hover:scale-105 transition-all duration-300 shadow-lg"
                aria-label="Contact on WhatsApp"
              >
                <FaWhatsapp className="h-5 w-5 text-white" />
                <span className="text-white text-sm font-bold hidden lg:block">
                  WhatsApp
                </span>
              </a>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden rounded-xl bg-white/10 p-2 hover:bg-white/20 transition"
              aria-label="Open menu"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {open && (
            <div className="md:hidden mt-4">
              <div className="rounded-2xl bg-white/5 p-3 space-y-2 text-sm font-semibold">
                <Link
                  href={route("welcome")}
                  className="block rounded-xl px-3 py-2 hover:bg-white/10"
                  onClick={() => setOpen(false)}
                >
                  Home
                </Link>

                <Link
                  href={route("excursions.clientIndex")}
                  className="block rounded-xl px-3 py-2 hover:bg-white/10"
                  onClick={() => setOpen(false)}
                >
                  Excursions
                </Link>

                <Link
                  href={route("apropos")}
                  className="block rounded-xl px-3 py-2 hover:bg-white/10"
                  onClick={() => setOpen(false)}
                >
                  About
                </Link>

                {/* WhatsApp mobile */}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl px-3 py-2 bg-[#25D366] hover:scale-105 transition text-white"
                  onClick={() => setOpen(false)}
                >
                  <FaWhatsapp className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 pt-16">{children}</main>
    </div>
  );
}