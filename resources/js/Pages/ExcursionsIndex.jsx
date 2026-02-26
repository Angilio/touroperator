import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import ExcursionPublicCard from "@/Pages/ExcursionPublicCard"; // adapte le chemin si besoin

export default function ExcursionsIndex({ excursions }) {
  return (
    <GuestLayout>
      <Head title="Excursions" />

      {/* HERO / TITLE */}
      <section className="bg-gradient-to-b from-blue-950 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-10">
          <p className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs sm:text-sm ring-1 ring-white/15">
            OZATour • Antsiranana
          </p>

          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold">
            All Excursions
          </h1>

          <p className="mt-3 text-white/85 max-w-2xl">
            Browse all available experiences and discover your next adventure.
          </p>
        </div>
      </section>

      {/* LIST */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          {(!excursions || excursions.length === 0) ? (
            <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center text-gray-600">
              No excursions available yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {excursions.map((excursion) => (
                <ExcursionPublicCard key={excursion.id} excursion={excursion} />
              ))}
            </div>
          )}
        </div>
      </section>
    </GuestLayout>
  );
}