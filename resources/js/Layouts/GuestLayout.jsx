// resources/js/Layouts/GuestLayout.jsx

import { useEffect, useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { FaWhatsapp } from "react-icons/fa";
import ReactCountryFlag from "react-country-flag";
import {
  X,
  Home,
  Map,
  Info,
  Phone,
  MapPin,
  ChevronRight,
  Languages,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function GuestLayout({ children }) {
  const [open, setOpen] = useState(false); // ✅ drawer mobile
  const [langOpen, setLangOpen] = useState(false); // ✅ dropdown desktop

  const { t, i18n } = useTranslation();

  const whatsappNumber = "261343253904";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello%20I%20am%20interested%20in%20your%20excursions`;

  // Langue par défaut = en
  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved) {
      i18n.changeLanguage(saved);
    } else {
      localStorage.setItem("lang", "en");
      i18n.changeLanguage("en");
    }
  }, []);

  // ESC + lock scroll quand drawer ouvert
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setLangOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
    setLangOpen(false);
  };

  const currentFlag =
    {
      en: "GB",
      fr: "FR",
    }[i18n.language] || "GB";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* ================= HEADER ================= */}
      <header className="fixed top-0 z-50 w-full bg-blue-950/90 text-white backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Brand */}
            <Link href={route("welcome")} className="flex items-center gap-2">
              <ApplicationLogo className="h-10 w-auto object-contain" />
              <div className="leading-tight">
                <p className="text-lg font-extrabold">ObayaMadaTour</p>
                <p className="text-xs text-white/70 hidden sm:block">
                  {t("explore")}
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
                {t("home")}
              </Link>

              <Link
                href={route("excursions.clientIndex")}
                className="flex items-center gap-2 hover:text-blue-200 transition"
              >
                <Map className="h-4 w-4" />
                {t("excursions")}
              </Link>

              <Link
                href={route("apropos")}
                className="flex items-center gap-2 hover:text-blue-200 transition"
              >
                <Info className="h-4 w-4" />
                {t("about")}
              </Link>

              {/* Language Selector (desktop) */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setLangOpen((s) => !s)}
                  className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition"
                  aria-label="Change language"
                >
                  <Languages className="h-4 w-4" />
                  <ReactCountryFlag
                    countryCode={currentFlag}
                    svg
                    style={{ width: "1.2em", height: "1.2em" }}
                  />
                </button>

                {langOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-blue-950 rounded-xl shadow-xl ring-1 ring-white/10 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => changeLanguage("en")}
                      className="flex items-center gap-3 w-full px-4 py-3 hover:bg-white/10 transition"
                    >
                      <ReactCountryFlag countryCode="GB" svg style={{ width: "1.3em" }} />
                      English
                    </button>

                    <button
                      type="button"
                      onClick={() => changeLanguage("fr")}
                      className="flex items-center gap-3 w-full px-4 py-3 hover:bg-white/10 transition"
                    >
                      <ReactCountryFlag countryCode="FR" svg style={{ width: "1.3em" }} />
                      Français
                    </button>
                  </div>
                )}
              </div>

              {/* WhatsApp */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] px-4 py-2 rounded-full flex items-center gap-2 hover:scale-105 transition"
              >
                <Phone className="h-4 w-4" />
                WhatsApp
              </a>
            </nav>

            {/* ✅ Mobile hamburger button */}
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* ================= MOBILE DRAWER ================= */}
        <div
          className={[
            "md:hidden fixed inset-0 z-[60] transition-opacity duration-300",
            open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
          ].join(" ")}
        >
          {/* overlay */}
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />

          {/* panel */}
          <div
            className={[
              "absolute right-0 top-0 h-full w-[85%] max-w-sm bg-blue-950 text-white",
              "border-l border-white/10 shadow-2xl",
              "transform transition-transform duration-300 ease-out",
              open ? "translate-x-0" : "translate-x-full",
            ].join(" ")}
          >
            {/* header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ApplicationLogo className="h-9 w-auto object-contain" />
                <div className="leading-tight">
                  <p className="text-base font-extrabold">ObayaMadaTour</p>
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

            {/* links */}
            <div className="px-4 py-5 space-y-3 bg-blue-950">
              <Link
                href={route("welcome")}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 bg-white/5 hover:bg-white/10 transition"
                onClick={() => setOpen(false)}
              >
                <Home className="h-5 w-5" />
                {t("home")}
              </Link>

              <Link
                href={route("excursions.clientIndex")}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 bg-white/5 hover:bg-white/10 transition"
                onClick={() => setOpen(false)}
              >
                <Map className="h-5 w-5" />
                {t("excursions")}
              </Link>

              <Link
                href={route("apropos")}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 bg-white/5 hover:bg-white/10 transition"
                onClick={() => setOpen(false)}
              >
                <Info className="h-5 w-5" />
                {t("about")}
              </Link>

              {/* language (mobile) */}
              <div className="rounded-2xl bg-white/5 p-3">
                <div className="flex items-center gap-2 text-sm font-bold mb-3">
                  <Languages className="h-4 w-4" />
                  Language
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => changeLanguage("en")}
                    className="rounded-xl bg-white/10 px-3 py-2 text-xs hover:bg-white/15 transition flex items-center justify-center gap-2"
                  >
                    <ReactCountryFlag countryCode="GB" svg />
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => changeLanguage("fr")}
                    className="rounded-xl bg-white/10 px-3 py-2 text-xs hover:bg-white/15 transition flex items-center justify-center gap-2"
                  >
                    <ReactCountryFlag countryCode="FR" svg />
                    FR
                  </button>
                </div>
              </div>

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

            <div className="mt-auto px-4 pb-6 text-xs text-white/60">
              Tap outside to close • Press ESC
            </div>
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="flex-1 pt-16">{children}</main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-blue-950 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-extrabold">ObayaMadaTour</h3>
            <p className="mt-3 text-sm text-white/80">
              Discover the beauty of Antsiranana with professional guides and authentic local experiences.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li>
                <Link href={route("welcome")} className="flex items-center gap-2 hover:text-white transition">
                  <ChevronRight className="h-4 w-4" />
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link href={route("excursions.clientIndex")} className="flex items-center gap-2 hover:text-white transition">
                  <ChevronRight className="h-4 w-4" />
                  {t("excursions")}
                </Link>
              </li>
              <li>
                <Link href={route("apropos")} className="flex items-center gap-2 hover:text-white transition">
                  <ChevronRight className="h-4 w-4" />
                  {t("about")}
                </Link>
              </li>
            </ul>
          </div>

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
          © {new Date().getFullYear()} ObayaMadaTour. All rights reserved. <br />
          Website created by{" "}
          <span className="font-semibold text-white">
            MAZAVAMANANA Zeppélin Tiavy and RAZAFINDRASOLO Angilio
          </span>.
        </div>
      </footer>
    </div>
  );
}