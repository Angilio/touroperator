import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
  const [open, setOpen] = useState(false);

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
                <p className="text-lg font-extrabold">MadaTour</p>
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
              <Link href={route("apropos")} className="hover:text-blue-200 transition">
                About
              </Link>
              <Link href={route("contact")} className="hover:text-blue-200 transition">
                Contact
              </Link>
              <Link
                href={route("login")}
                className="rounded-full bg-white/10 px-4 py-2 hover:bg-white/20 transition"
              >
                Login
              </Link>
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
                  href={route("apropos")}
                  className="block rounded-xl px-3 py-2 hover:bg-white/10"
                  onClick={() => setOpen(false)}
                >
                  About
                </Link>
                <Link
                  href={route("contact")}
                  className="block rounded-xl px-3 py-2 hover:bg-white/10"
                  onClick={() => setOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href={route("login")}
                  className="block rounded-xl px-3 py-2 hover:bg-white/10"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* MAIN (padding top pour header fixe) */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}