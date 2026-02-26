import { useEffect, useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { FaWhatsapp } from "react-icons/fa";
import {
  X,
  Home,
  Map,
  Info,
  Phone,
  MapPin,
  ChevronRight,
} from "lucide-react";

export default function GuestLayout({ children }) {
  const [open, setOpen] = useState(false);

  const whatsappNumber = "261325572786";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello%20I%20am%20interested%20in%20your%20excursions`;

  // Close on ESC + lock scroll when open
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    if (open) {
      window.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* HEADER */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-blue-950/90 text-white backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Brand */}
            <Link href={route("welcome")} className="flex items-center gap-2">
              <ApplicationLogo className="h-10 w-auto object-contain" />
              <div className="leading-tight">
                <p className="text-lg font-extrabold">OZATour</p>
                <p className="text-xs text-white/70 hidden sm:block">
                  Explore Antsiranana
                </p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
              <Link
                href={route("welcome")}
                className="flex items-center gap-2 hover:text-blue-200 transition"
              >
                <Home className="h-4 w-4" />
                Home
              </Link>

              <Link
                href={route("excursions.clientIndex")}
                className="flex items-center gap-2 hover:text-blue-200 transition"
              >
                <Map className="h-4 w-4" />
                Excursions
              </Link>

              <Link
                href={route("apropos")}
                className="flex items-center gap-2 hover:text-blue-200 transition"
              >
                <Info className="h-4 w-4" />
                About
              </Link>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 hover:scale-105 transition-all duration-300 shadow-lg"
                aria-label="Contact on WhatsApp"
              >
                <Phone className="h-4 w-4 text-white" />
                <span className="text-white text-sm font-bold hidden lg:block">
                  WhatsApp
                </span>
              </a>
            </nav>

            {/* Mobile button */}
            <button
              onClick={() => setOpen(true)}
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
        </div>

        {/* MOBILE DRAWER */}
        <div
          className={[
            "md:hidden fixed inset-0 z-[60] transition-opacity duration-300",
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none",
          ].join(" ")}
        >
          {/* dark background */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />

          {/* Panel right */}
          <div
            className={[
              "absolute right-0 top-0 h-full w-[85%] max-w-sm bg-blue-950 text-white",
              "border-l border-white/10 shadow-2xl",
              "transform transition-transform duration-300 ease-out",
              open ? "translate-x-0" : "translate-x-full",
            ].join(" ")}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ApplicationLogo className="h-9 w-auto object-contain" />
                <div className="leading-tight">
                  <p className="text-base font-extrabold">OZATour</p>
                  <p className="text-[11px] text-white/70">Menu</p>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-xl bg-white/10 p-2 hover:bg-white/20 transition"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Links */}
            <div className="px-4 py-5 space-y-3 bg-blue-950">
              <Link
                href={route("welcome")}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 bg-white/5 hover:bg-white/10 transition"
                onClick={() => setOpen(false)}
              >
                <Home className="h-5 w-5" />
                Home
              </Link>

              <Link
                href={route("excursions.clientIndex")}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 bg-white/5 hover:bg-white/10 transition"
                onClick={() => setOpen(false)}
              >
                <Map className="h-5 w-5" />
                Excursions
              </Link>

              <Link
                href={route("apropos")}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 bg-white/5 hover:bg-white/10 transition"
                onClick={() => setOpen(false)}
              >
                <Info className="h-5 w-5" />
                About
              </Link>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl px-4 py-3 bg-[#25D366] transition text-white font-bold shadow-lg"
                onClick={() => setOpen(false)}
              >
                <Phone className="h-5 w-5" />
                WhatsApp
              </a>
            </div>

            {/* Small footer inside drawer */}
            <div className="mt-auto px-4 pb-6 text-xs text-white/60">
              Tap outside to close • Press ESC
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 pt-16">{children}</main>

      {/* FOOTER */}
      <footer className="bg-blue-950 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-extrabold">OZATour</h3>
            <p className="mt-3 text-sm text-white/80">
              Discover the beauty of Antsiranana with professional guides and
              authentic local experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li>
                <Link
                  href={route("welcome")}
                  className="flex items-center gap-2 hover:text-white transition"
                >
                  <ChevronRight className="h-4 w-4" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={route("excursions.clientIndex")}
                  className="flex items-center gap-2 hover:text-white transition"
                >
                  <ChevronRight className="h-4 w-4" />
                  Excursions
                </Link>
              </li>
              <li>
                <Link
                  href={route("apropos")}
                  className="flex items-center gap-2 hover:text-white transition"
                >
                  <ChevronRight className="h-4 w-4" />
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] px-4 py-2 rounded-full hover:scale-105 transition"
            >
              <FaWhatsapp className="h-4 w-4 text-white" />
              WhatsApp
            </a>

            <p className="mt-4 flex items-center gap-2 text-sm text-white/70">
              <MapPin className="h-4 w-4" />
              Antsiranana, Madagascar
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 text-center py-4 text-xs text-white/60">
          © {new Date().getFullYear()} OZATour. All rights reserved. <br />
          Website created by{" "}
          <span className="font-semibold text-white">
            MAZAVAMANANA Zeppélin Tiavy
          </span>
          .
        </div>
      </footer>
    </div>
  );
}