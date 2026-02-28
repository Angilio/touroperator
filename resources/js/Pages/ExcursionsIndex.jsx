import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import ExcursionPublicCard from "@/Pages/ExcursionPublicCard"; // adapte le chemin si besoin
import { motion } from "framer-motion";
import { Sparkles, Filter, MapPin } from "lucide-react";

export default function ExcursionsIndex({ excursions }) {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  const item = {
    hidden: { opacity: 0, y: 18, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const count = excursions?.length ?? 0;

  return (
    <GuestLayout>
      <Head title="Excursions" />

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950 via-blue-950 to-gray-50" />
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,_#fff_1px,_transparent_0)] [background-size:26px_26px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-10 sm:pb-14">
          <div className="max-w-3xl text-white">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs sm:text-sm ring-1 ring-white/15 backdrop-blur">
              <MapPin className="h-4 w-4" />
              ObayaMadaTour • Antsiranana
            </p>

            <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Explore All Excursions
            </h1>

            <p className="mt-3 text-white/85 max-w-2xl text-sm sm:text-base leading-relaxed">
              Browse all available experiences and discover your next adventure.
              Handpicked tours, local guides, and unforgettable memories.
            </p>

            {/* Quick bar */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15 backdrop-blur">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-semibold">
                  {count} excursion{count > 1 ? "s" : ""} available
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIST */}
      <section className="relative bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          {!excursions || excursions.length === 0 ? (
            <div className="rounded-3xl border border-gray-200 bg-white p-8 sm:p-10 text-center shadow-sm">
              <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">
                No excursions available yet
              </h2>
              <p className="mt-2 text-sm sm:text-base text-gray-600">
                Please check back later. New tours will be published soon.
              </p>
            </div>
          ) : (
            <>
              {/* Top row */}
              <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                    Available Tours
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Click any card to view details, gallery and description.
                  </p>
                </div>

                <div className="text-sm text-gray-600">
                  Showing <span className="font-semibold text-gray-900">{count}</span>{" "}
                  result{count > 1 ? "s" : ""}
                </div>
              </div>

              {/* Animated grid */}
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.12 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              >
                {excursions.map((excursion) => (
                  <motion.div
                    key={excursion.id}
                    variants={item}
                    className="will-change-transform"
                  >
                    <ExcursionPublicCard excursion={excursion} />
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </div>
      </section>
    </GuestLayout>
  );
}