import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

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

    return (
        <div className="flex flex-col overflow-hidden rounded-xl p-2 bg-white shadow hover:shadow-lg transition">

            {/* Image */}
            <div className="h-44 bg-gray-100">
                {images.length > 0 ? (
                    <img
                        src={`/storage/${images[index].image_path}`}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">
                        Aucune image
                    </div>
                )}
            </div>

            {/* Contenu */}
            <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-lg truncate">
                    {excursion.title}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                    {excursion.short_description}
                </p>

                <div className="mt-auto pt-3">
                    <p className="font-bold text-blue-600">
                        {Number(excursion.price).toLocaleString('fr-FR')} €
                    </p>

                    <div className="flex gap-2 mt-2">
                        <Link
                            href={route('excursions.show', excursion.id)}
                            className="flex-1 text-center bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                            Voir
                        </Link>

                        <Link
                            href={route('reservations.create', excursion.id)}
                            className="flex-1 text-center bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                            Réserver
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
