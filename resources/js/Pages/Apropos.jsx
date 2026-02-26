import { Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { MapPin, Mountain, Palmtree, Sparkles, ArrowRight } from "lucide-react";

export default function Apropos() {
  return (
    <GuestLayout>
      <Head title="About" />

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
                DIANA Region • Northern Madagascar
              </p>

              <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight drop-shadow">
                About OZATour
              </h1>

              <p className="mt-4 text-gray-900 text-sm sm:text-base leading-relaxed max-w-2xl">
                Discover the natural wonders, culture, and unforgettable experiences of the DIANA
                region — a true gem in the north of Madagascar.
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
                    Tourism in the DIANA Region
                  </h2>

                  <p className="mt-4 text-gray-700 leading-relaxed">
                    This website is dedicated to promoting tourism in the DIANA region, located in
                    northern Madagascar. Our mission is to highlight the natural, cultural, and
                    historical treasures of this exceptional area.
                  </p>

                  <p className="mt-4 text-gray-700 leading-relaxed">
                    Here you’ll find excursions, activities, and destinations such as beaches,
                    nature parks, historical sites, and unique cultural experiences — carefully
                    curated to help you plan an unforgettable trip.
                  </p>

                  {/* Objective */}
                  <div className="mt-8 rounded-2xl bg-blue-50 border border-blue-100 p-5">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-blue-700 ring-1 ring-blue-100">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-gray-900">Our objective</h3>
                        <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                          Promote local tourism in the DIANA region by making it easy to discover
                          information and book excursions — while supporting local tourism actors.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Features */}
                <div className="lg:col-span-5">
                  <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-extrabold text-gray-900">
                      Why visit DIANA?
                    </h3>

                    <div className="mt-5 space-y-4">
                      <Feature
                        icon={<Palmtree className="h-5 w-5" />}
                        title="Exceptional landscapes"
                        desc="Beaches, bays, and breathtaking views you won’t find anywhere else."
                      />
                      <Feature
                        icon={<Mountain className="h-5 w-5" />}
                        title="Nature & adventure"
                        desc="Hikes, parks, and outdoor activities for every level."
                      />
                      <Feature
                        icon={<MapPin className="h-5 w-5" />}
                        title="Authentic culture"
                        desc="Meet locals, discover traditions, and enjoy real Malagasy hospitality."
                      />
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-6 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 p-6 text-white shadow-lg">
                    <h4 className="text-lg font-extrabold">Need help planning?</h4>
                    <p className="mt-2 text-sm text-white/90">
                      Contact us for recommendations, schedules, and booking assistance.
                    </p>

                    <div className="mt-5">
                      <a
                        href="https://wa.me/261325572786?text=Hello%20I%20would%20like%20information%20about%20excursions%20in%20the%20DIANA%20region"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white/15 px-6 py-3 text-sm font-semibold ring-1 ring-white/25 hover:bg-white/20 transition"
                      >
                        Contact on WhatsApp
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
                OZATour • DIANA Region — Northern Madagascar • Discover • Explore • Enjoy
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