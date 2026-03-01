import { Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { useTranslation } from "react-i18next";
import { MapPin, Mountain, Palmtree, Sparkles, ArrowRight } from "lucide-react";

export default function Apropos() {
  const { t } = useTranslation();

  const whatsappLink =
    "https://wa.me/261325572786?text=Hello%20I%20would%20like%20information%20about%20excursions%20in%20the%20DIANA%20region";

  return (
    <GuestLayout>
      <Head title={t("aboutPage.title")} />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="relative h-[46vh] sm:h-[52vh] bg-cover bg-center"
          style={{ backgroundImage: "url('/images/fonds/image1.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-gray-50" />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32">
            <div className="max-w-3xl text-white">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs sm:text-sm ring-1 ring-white/15 backdrop-blur">
                <MapPin className="h-4 w-4" />
                {t("aboutPage.hero.badge")}
              </p>

              <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight drop-shadow">
                {t("aboutPage.hero.heading")}
              </h1>

              <p className="mt-4 text-gray-900 text-sm sm:text-base leading-relaxed max-w-2xl">
                {t("aboutPage.hero.subheading")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          {/* Main Card */}
          <div className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="p-6 sm:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Left */}
                <div className="lg:col-span-7">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                    {t("aboutPage.content.heading")}
                  </h2>

                  <p className="mt-4 text-gray-700 leading-relaxed">
                    {t("aboutPage.content.p1")}
                  </p>

                  <p className="mt-4 text-gray-700 leading-relaxed">
                    {t("aboutPage.content.p2")}
                  </p>

                  {/* Objective */}
                  <div className="mt-8 rounded-2xl bg-blue-50 border border-blue-100 p-5">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-blue-700 ring-1 ring-blue-100">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-gray-900">
                          {t("aboutPage.objective.title")}
                        </h3>
                        <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                          {t("aboutPage.objective.desc")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="lg:col-span-5">
                  <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-extrabold text-gray-900">
                      {t("aboutPage.why.title")}
                    </h3>

                    <div className="mt-5 space-y-4">
                      <Feature
                        icon={<Palmtree className="h-5 w-5" />}
                        title={t("aboutPage.why.items.landscapes.title")}
                        desc={t("aboutPage.why.items.landscapes.desc")}
                      />
                      <Feature
                        icon={<Mountain className="h-5 w-5" />}
                        title={t("aboutPage.why.items.adventure.title")}
                        desc={t("aboutPage.why.items.adventure.desc")}
                      />
                      <Feature
                        icon={<MapPin className="h-5 w-5" />}
                        title={t("aboutPage.why.items.culture.title")}
                        desc={t("aboutPage.why.items.culture.desc")}
                      />
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-6 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 p-6 text-white shadow-lg">
                    <h4 className="text-lg font-extrabold">
                      {t("aboutPage.cta.title")}
                    </h4>
                    <p className="mt-2 text-sm text-white/90">
                      {t("aboutPage.cta.desc")}
                    </p>

                    <div className="mt-5">
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white/15 px-6 py-3 text-sm font-semibold ring-1 ring-white/25 hover:bg-white/20 transition"
                      >
                        {t("aboutPage.cta.button")}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom strip */}
            <div className="border-t border-gray-100 bg-gray-50 px-6 sm:px-10 py-5">
              <p className="text-xs sm:text-sm text-gray-600">
                {t("aboutPage.footerStrip")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </GuestLayout>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 ring-1 ring-blue-100">
        {icon}
      </div>
      <div>
        <p className="font-bold text-gray-900">{title}</p>
        <p className="mt-1 text-sm text-gray-600 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}