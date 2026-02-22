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
        <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300">

            {/* Image */}
            <div className="relative h-64 overflow-hidden">
                {images.length > 0 ? (
                    <img
                        src={`/storage/${images[index].image_path}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">
                        Aucune image
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col">
                <h3 className="font-bold text-lg mb-2">
                    {excursion.title}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-2">
                    {excursion.short_description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                    <span className="text-blue-600 font-bold text-lg">
                        {Number(excursion.price).toLocaleString('fr-FR')} €
                    </span>

                    <Link
                        href={route('excursions.showClient', excursion.id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition"
                    >
                        Voir détails
                    </Link>
                </div>
            </div>
        </div>
    );
}