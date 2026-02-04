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
                
                {/* 🖼️ Zone image / placeholder */}
                <div className="relative flex w-full items-center justify-center
                                bg-gray-100 h-40 sm:h-44 md:h-48 lg:h-52">
                    {images.length > 0 ? (
                        <img
                            src={`/storage/${images[index].image_path}`}
                            alt={excursion.title}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center
                                        bg-gradient-to-br from-gray-100 to-gray-200
                                        text-center text-sm text-gray-500">
                            <span className="text-lg">📷</span>
                            <span>Aucune image</span>
                        </div>
                    )}
                </div>

                {/* 📄 Contenu */}
                <div className="flex flex-1 flex-col p-3 sm:p-4 min-w-0 bg-gradient-to-br from-blue-500 to-blue-700 text-white">
                    <h3 className="truncate text-base font-semibold text-white sm:text-lg">
                        {excursion.title}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-xs text-blue-100 sm:text-sm">
                        {excursion.short_description}
                    </p>

                    {/* 💰 + Actions */}
                    <div className="mt-auto pt-3">
                        <span className="block text-base font-bold text-white sm:text-lg">
                            {Number(excursion.price).toLocaleString('fr-FR')} €
                        </span>

                        {/* 🔘 Boutons */}
                        <div className="mt-2 flex w-full flex-wrap gap-2">
                           <Link
                                href={route('excursions.show', excursion.id)}
                                className="flex flex-1 min-w-[90px] items-center justify-center gap-1
                                        rounded-md bg-white/90 px-2 py-1 text-xs text-blue-700
                                        hover:bg-white sm:text-sm"
                            >
                                <Eye size={14} />
                                Voir
                            </Link>

                           <Link
                                href={route('excursions.edit', excursion.id)}
                                className="flex flex-1 min-w-[90px] items-center justify-center gap-1
                                        rounded-md bg-blue-900 px-2 py-1 text-xs text-white
                                        hover:bg-blue-800 sm:text-sm"
                            >
                                <Edit size={14} />
                                Modifier
                            </Link>

                            <button
                                onClick={() => setShowDelete(true)}
                                className="flex flex-1 min-w-[90px] items-center justify-center gap-1
                                        rounded-md bg-red-500 px-2 py-1 text-xs text-white
                                        hover:bg-red-600 sm:text-sm"
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
