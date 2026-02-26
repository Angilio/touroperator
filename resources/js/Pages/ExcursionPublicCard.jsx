import { Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { MapPin, Clock, Users } from "lucide-react";

export default function ExcursionPublicCard({ excursion }) {
  const images = excursion.gallery ?? [];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const price = Number(excursion.price).toLocaleString("fr-FR");

  return (
    <Link
      href={route("excursions.showClient", excursion.id)}
      className="group relative block overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500"
    >
      {/* IMAGE FULL */}
      <div className="relative h-80 overflow-hidden">
        {images.length > 0 ? (
          <img
            src={`/storage/${images[index].image_path}`}
            alt={excursion.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-200 text-gray-400">
            No image
          </div>
        )}

        {/* Overlay gradient premium */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500 group-hover:from-black/90" />

        {/* PRICE */}
        <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md text-gray-900 font-bold px-4 py-2 rounded-full shadow-lg">
          {price} €
        </div>

        {/* CONTENT OVER IMAGE */}
        <div className="absolute bottom-6 left-6 right-6 text-white">

          <h3 className="text-2xl font-extrabold drop-shadow-lg group-hover:text-blue-300 transition">
            {excursion.title}
          </h3>

          <div className="mt-3 flex items-center gap-6 text-sm text-white/90">

            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{excursion.type_excursion?.type ?? "Excursion"}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>1 Day</span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Small group</span>
            </div>

          </div>
        </div>
      </div>
    </Link>
  );
}