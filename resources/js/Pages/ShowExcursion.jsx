import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import { useState } from "react";

export default function ShowExcursion({ excursion }) {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const nextImage = () => setSelectedIndex(prev =>
        prev === excursion.gallery.length - 1 ? 0 : prev + 1
    );

    const prevImage = () => setSelectedIndex(prev =>
        prev === 0 ? excursion.gallery.length - 1 : prev - 1
    );

    return (
        <GuestLayout>
            <Head title={excursion.title} />

            {/* INFOS PRINCIPALES */}
            <div className="max-w-6xl mx-auto px-4 pt-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4
                                bg-gradient-to-r from-white/70 to-white/30
                                p-6 rounded-2xl shadow-xl backdrop-blur-sm">
                    {/* Bouton retour */}
                    <div className="lg:w-1/3">
                        <button
                            onClick={() => window.history.back()}
                            className="flex items-center gap-2 text-blue-700 font-semibold 
                                       hover:text-white hover:bg-blue-600 transition px-4 py-2 rounded-lg shadow"
                        >
                            ← Retour
                        </button>
                    </div>

                    {/* Titre */}
                    <div className="lg:w-1/3 text-center">
                        <h1 className="text-2xl md:text-3xl font-extrabold text-blue-800 drop-shadow-md">
                            {excursion.title} - {Number(excursion.price).toLocaleString('fr-FR')} €
                        </h1>
                    </div>

                    {/* Type */}
                    <div className="lg:w-1/3 lg:text-right">
                        <p className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-600 drop-shadow-sm">
                            {excursion.type_excursion?.type}
                        </p>
                    </div>
                </div>

                {/* DESCRIPTION COURTE */}
                <p className="mt-4 text-gray-700 italic text-center 
                            bg-white/50 backdrop-blur-sm px-4 py-2 rounded-lg max-w-3xl mx-auto">
                    {excursion.short_description}
                </p> 
            </div>

            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* GALERIE */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {excursion.gallery?.map((img, index) => (
                        <img
                            key={img.id}
                            src={`/storage/${img.image_path}`}
                            onClick={() => setSelectedIndex(index)}
                            className="w-full h-64 md:h-72 object-cover rounded-2xl shadow-lg 
                                       hover:scale-105 hover:shadow-2xl transition cursor-pointer"
                        />
                    ))}
                </div>

                {/* VIDEO */}
                {excursion.video && (
                    <div className="mb-10 flex justify-center">
                        <video
                            src={`/storage/${excursion.video}`}
                            controls
                            className="rounded-2xl shadow-xl max-w-md md:max-w-lg w-full"
                        />
                    </div>
                )}

                {/* DESCRIPTION COMPLETE */}
                <div className="max-w-4xl mx-auto mt-8 p-6 
                                bg-white/70 backdrop-blur-md rounded-2xl shadow-lg
                                prose prose-blue text-gray-800">
                    <div dangerouslySetInnerHTML={{ __html: excursion.description }} />
                </div>
            </div>

            {/* LIGHTBOX GALERIE */}
            {selectedIndex !== null && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
                    <button
                        onClick={() => setSelectedIndex(null)}
                        className="absolute top-6 right-6 text-white text-4xl font-bold hover:text-red-400 transition"
                    >
                        ×
                    </button>

                    <img
                        src={`/storage/${excursion.gallery[selectedIndex].image_path}`}
                        className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl"
                    />

                    <button
                        onClick={prevImage}
                        className="absolute left-6 text-white text-5xl hover:text-blue-400 transition"
                    >
                        ‹
                    </button>

                    <button
                        onClick={nextImage}
                        className="absolute right-6 text-white text-5xl hover:text-blue-400 transition"
                    >
                        ›
                    </button>
                </div>
            )}
        </GuestLayout>
    );
}
