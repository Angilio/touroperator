import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import { useState } from "react";

export default function ShowExcursion({ excursion }) {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const nextImage = () => {
        setSelectedIndex((prev) =>
            prev === excursion.gallery.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setSelectedIndex((prev) =>
            prev === 0 ? excursion.gallery.length - 1 : prev - 1
        );
    };

    return (
        <GuestLayout>
            <Head title={excursion.title} />
            
            {/* INFOS PRINCIPALES */}
            <div className="max-w-6xl mx-auto px-4 pt-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">

                <div className="lg:w-1/3">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 text-blue-700 font-semibold hover:text-blue-900"
                    >
                        ← Retour
                    </button>
                </div>

                <div className="lg:w-1/3 text-center">
                    <h1 className="text-2xl md:text-3xl font-bold text-blue-800">
                        Excursion {excursion.title} - {Number(excursion.price).toLocaleString('fr-FR')} €
                    </h1>
                </div>

                <div className="lg:w-1/3 lg:text-right">
                    <p className="text-2xl md:text-2xl lg:text-3xl font-bold text-blue-600">
                        {excursion.type_excursion?.type}
                    </p>
                </div>
            </div>

                {/* DESCRIPTION COURTE */}
                <p className="mt-4 text-gray-600">
                    {excursion.short_description}
                </p>

            </div>

            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* GALERIE */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {excursion.gallery?.map((img, index) => (
                        <img
                            key={img.id}
                            src={`/storage/${img.image_path}`}
                            onClick={() => setSelectedIndex(index)}
                            className="w-full h-60 md:h-72 object-cover rounded-xl shadow hover:scale-105 transition cursor-pointer"
                        />
                    ))}
                </div>

                {/* VIDEO */}
                {excursion.video && (
                    <div className="mb-8">
                        <video
                            src={`/storage/${excursion.video}`}
                            controls
                            className="w-full rounded-xl shadow"
                        />
                    </div>
                )}

                {/* DESCRIPTION COMPLETE */}
                <div
                    className="prose max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: excursion.description }}
                />
            </div>
            {selectedIndex !== null && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">

                    {/* Fermer */}
                    <button
                        onClick={() => setSelectedIndex(null)}
                        className="absolute top-6 right-6 text-white text-4xl font-bold"
                    >
                        ×
                    </button>

                    {/* Image */}
                    <img
                        src={`/storage/${excursion.gallery[selectedIndex].image_path}`}
                        className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-lg"
                    />

                    {/* Prev */}
                    <button
                        onClick={prevImage}
                        className="absolute left-4 text-white text-5xl"
                    >
                        ‹
                    </button>

                    {/* Next */}
                    <button
                        onClick={nextImage}
                        className="absolute right-4 text-white text-5xl"
                    >
                        ›
                    </button>

                </div>
            )}
        </GuestLayout>
    );
}
