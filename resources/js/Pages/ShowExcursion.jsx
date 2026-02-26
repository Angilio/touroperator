import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Tag,
  Euro,
  Images,
  PlayCircle,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function ShowExcursion({ excursion }) {
  const images = useMemo(() => excursion.gallery ?? [], [excursion.gallery]);
  const hasImages = images.length > 0;

  const [selectedIndex, setSelectedIndex] = useState(null);

  const openAt = (i) => setSelectedIndex(i);
  const close = () => setSelectedIndex(null);

  const nextImage = () =>
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  const prevImage = () =>
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const price = Number(excursion.price || 0).toLocaleString("fr-FR");

  const heroUrl = hasImages
    ? `/storage/${images[0].image_path}`
    : "/images/fonds/image1.jpg";

  return (
    <GuestLayout>
      <Head title={excursion.title} />

      {/* HERO */}
      <section className="relative">
        <div
          className="relative min-h-[55vh] sm:min-h-[62vh] md:min-h-[70vh] bg-cover bg-center pt-14"
          style={{ backgroundImage: `url('${heroUrl}')` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-gray-50" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10">
            {/* Top bar */}
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 backdrop-blur hover:bg-white/15 transition"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>

              <div className="hidden sm:flex items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 backdrop-blur">
                  <Tag className="h-4 w-4" />
                  {excursion.type_excursion?.type ?? "Excursion"}
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 backdrop-blur">
                  <Euro className="h-4 w-4" />
                  {price} €
                </span>
              </div>
            </div>

            {/* Hero content */}
            <div className="mt-10 sm:mt-14 max-w-3xl text-white">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs sm:text-sm ring-1 ring-white/15 backdrop-blur">
                <MapPin className="h-4 w-4" />
                Antsiranana • Madagascar
              </p>

              <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight drop-shadow">
                {excursion.title}
              </h1>

              {/* Mobile chips */}
              <div className="mt-4 flex flex-wrap gap-2 sm:hidden">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 backdrop-blur">
                  <Tag className="h-4 w-4" />
                  {excursion.type_excursion?.type ?? "Excursion"}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 backdrop-blur">
                  <Euro className="h-4 w-4" />
                  {price} €
                </span>
              </div>

              {excursion.short_description && (
                <p className="mt-4 text-white/90 text-sm sm:text-base leading-relaxed">
                  {excursion.short_description}
                </p>
              )}

              {/* CTA */}
              {hasImages && (
                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => openAt(0)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-800 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500 transition shadow-md shadow-black/20"
                  >
                    <Images className="h-4 w-4" />
                    View Gallery
                  </button>

                  {excursion.video && (
                    <a
                      href="#video"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-800 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-gray-500 transition"
                    >
                      <PlayCircle className="h-4 w-4" />
                      Watch Video
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT: Gallery + Video */}
            <div className="lg:col-span-7">
              {/* Gallery */}
              {hasImages && (
                <div className="rounded-3xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">
                      Gallery
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {images.length} photo{images.length > 1 ? "s" : ""}
                    </p>
                  </div>

                  <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                    {images.map((img, index) => (
                      <button
                        type="button"
                        key={img.id}
                        onClick={() => openAt(index)}
                        className="group relative overflow-hidden rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        aria-label={`Open image ${index + 1}`}
                      >
                        <img
                          src={`/storage/${img.image_path}`}
                          alt={`${excursion.title} ${index + 1}`}
                          className="h-36 sm:h-40 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Video */}
              {excursion.video && (
                <div
                  id="video"
                  className="mt-8 rounded-3xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">
                      Video
                    </h2>
                  </div>

                  <div className="mt-5 overflow-hidden rounded-2xl ring-1 ring-gray-200">
                    <video
                      src={`/storage/${excursion.video}`}
                      controls
                      className="w-full max-h-[420px] bg-black"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT: Description */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">
                  Description
                </h2>

                <div className="mt-4 prose prose-blue max-w-none text-gray-800 prose-p:leading-relaxed prose-li:leading-relaxed">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: excursion.description ?? "",
                    }}
                  />
                </div>
              </div>

              {/* Quick info block */}
              <div className="mt-8 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 p-6 sm:p-8 text-white shadow-lg">
                <h3 className="text-lg font-extrabold">Need help?</h3>
                <p className="mt-2 text-white/90 text-sm">
                  Contact us for schedules, meeting point, or booking information.
                </p>
                <div className="mt-5">
                  <Link
                    href={route("contact")}
                    className="inline-flex w-full items-center justify-center rounded-full bg-white/15 px-6 py-3 text-sm font-semibold ring-1 ring-white/25 hover:bg-white/20 transition"
                  >
                    Contact MadaTour
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {selectedIndex !== null && hasImages && (
        <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm">
          <button
            onClick={close}
            className="absolute right-4 top-4 sm:right-6 sm:top-6 rounded-full bg-white/10 p-2 text-white hover:bg-white/15 transition"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-3 top-1/2 -translate-y-1/2 sm:left-6 rounded-full bg-white/10 p-2 text-white hover:bg-white/15 transition"
            aria-label="Previous"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-3 top-1/2 -translate-y-1/2 sm:right-6 rounded-full bg-white/10 p-2 text-white hover:bg-white/15 transition"
            aria-label="Next"
          >
            <ChevronRight className="h-7 w-7" />
          </button>

          <div className="h-full w-full flex items-center justify-center px-4">
            <img
              src={`/storage/${images[selectedIndex].image_path}`}
              alt={`Image ${selectedIndex + 1}`}
              className="max-h-[82vh] max-w-[92vw] rounded-3xl shadow-2xl"
            />
          </div>

          {/* Thumbnails */}
          <div className="absolute bottom-4 left-0 right-0 px-4">
            <div className="mx-auto max-w-5xl overflow-x-auto">
              <div className="flex gap-2 pb-2">
                {images.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedIndex(i)}
                    className={[
                      "relative overflow-hidden rounded-xl ring-2 transition",
                      i === selectedIndex ? "ring-blue-400" : "ring-transparent",
                    ].join(" ")}
                    aria-label={`Select image ${i + 1}`}
                  >
                    <img
                      src={`/storage/${img.image_path}`}
                      alt={`Thumb ${i + 1}`}
                      className="h-14 w-20 object-cover opacity-90 hover:opacity-100"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </GuestLayout>
  );
}