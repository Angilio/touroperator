import { Link, router } from '@inertiajs/react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import ConfirmDeleteModal from '@/Components/ConfirmDeleteModal';

export default function ExcursionCard({ excursion }) {
    const images = excursion.gallery ?? [];
    const [index, setIndex] = useState(0);
    const [showDelete, setShowDelete] = useState(false);

    // 🎞️ Diaporama automatique (4 secondes)
    useEffect(() => {
        if (images.length <= 1) return;

        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [images.length]);

    // 🗑️ Suppression
    const handleDelete = () => {
        router.delete(route('excursions.destroy', excursion.id), {
            onSuccess: () => setShowDelete(false),
        });
    };

    return (
        <>
            <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow transition hover:shadow-lg">
                {/* Diaporama */}
                <div className="relative w-full bg-gray-100 h-40 sm:h-44 md:h-48 lg:h-52">
                    {images.length > 0 ? (
                        <img
                            src={`/storage/${images[index].image_path}`}
                            alt={excursion.title}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-sm text-gray-400">
                            Aucune image
                        </div>
                    )}
                </div>

                {/* Contenu */}
                <div className="flex flex-1 flex-col p-3 sm:p-4">
                    <h3 className="text-base font-semibold text-gray-800 sm:text-lg">
                        {excursion.title}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-xs text-gray-600 sm:text-sm">
                        {excursion.short_description}
                    </p>

                    <div className="mt-auto flex flex-col gap-2 pt-3 sm:flex-row sm:items-center sm:justify-between">
                        <span className="text-base font-bold text-blue-700 sm:text-lg">
                            {excursion.price} Ar
                        </span>

                        <div className="flex gap-2">
                            <Link
                                href={route('excursions.show', excursion.id)}
                                className="flex flex-1 items-center justify-center gap-1 rounded-md border px-2 py-1 text-xs text-gray-700 hover:bg-gray-100 sm:flex-none sm:px-3 sm:text-sm"
                            >
                                <Eye size={14} />
                                Voir
                            </Link>

                            <Link
                                href={route('excursions.edit', excursion.id)}
                                className="flex flex-1 items-center justify-center gap-1 rounded-md bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-700 sm:flex-none sm:px-3 sm:text-sm"
                            >
                                <Edit size={14} />
                                Modifier
                            </Link>

                            <button
                                onClick={() => setShowDelete(true)}
                                className="flex flex-1 items-center justify-center gap-1 rounded-md bg-red-600 px-2 py-1 text-xs text-white hover:bg-red-700 sm:flex-none sm:px-3 sm:text-sm"
                            >
                                <Trash2 size={14} />
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 🪟 Modal confirmation */}
            <ConfirmDeleteModal
                show={showDelete}
                onClose={() => setShowDelete(false)}
                onConfirm={handleDelete}
                title="Supprimer l'excursion"
                message="Êtes-vous sûr de vouloir supprimer cette excursion ? Cette action est irréversible."
            />
        </>
    );
}
