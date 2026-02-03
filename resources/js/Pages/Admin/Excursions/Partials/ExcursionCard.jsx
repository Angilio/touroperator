import { Link } from '@inertiajs/react';
import { Eye, Edit } from 'lucide-react';
import { useState } from 'react';

export default function ExcursionCard({ excursion }) {
    const images = excursion.gallery ?? [];
    const [index, setIndex] = useState(0);

    const next = () => {
        setIndex((prev) => (prev + 1) % images.length);
    };

    const prev = () => {
        setIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="overflow-hidden rounded-xl bg-white shadow">
            {/* Diaporama */}
            <div className="relative h-48 bg-gray-100">
                {images.length > 0 ? (
                    <img
                        src={images[index].image_path}
                        alt=""
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">
                        Aucune image
                    </div>
                )}

                {images.length > 1 && (
                    <>
                        <button
                            onClick={prev}
                            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-2 py-1 text-white"
                        >
                            ‹
                        </button>
                        <button
                            onClick={next}
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-2 py-1 text-white"
                        >
                            ›
                        </button>
                    </>
                )}
            </div>

            {/* Contenu */}
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                    {excursion.title}
                </h3>

                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                    {excursion.short_description}
                </p>

                <div className="mt-3 flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-700">
                        {excursion.price} Ar
                    </span>

                    <div className="flex gap-2">
                        <Link
                            href={route('excursions.show', excursion.id)}
                            className="flex items-center gap-1 rounded-md border px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            <Eye size={14} />
                            Voir
                        </Link>

                        <Link
                            href={route('excursions.edit', excursion.id)}
                            className="flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                        >
                            <Edit size={14} />
                            Modifier
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
