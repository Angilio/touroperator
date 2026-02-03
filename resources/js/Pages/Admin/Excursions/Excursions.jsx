import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ExcursionCard from './Partials/ExcursionCard';
import { Plus, MapPin } from 'lucide-react';

export default function Excursions() {
    const { excursions } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold text-blue-800">
                    Excursions
                </h2>
            }
        >
            <Head title="Excursions" />

            <div className="text-blue-800">
                {/* Header interne (comme Types d’excursions) */}
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-lg font-semibold">
                        Liste des excursions
                    </h3>

                    <Link
                        href={route('excursions.create')}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700 sm:w-auto"
                    >
                        <Plus size={16} />
                        Ajouter une excursion
                    </Link>
                </div>

                {/* Aucun excursion */}
                {excursions.length === 0 ? (
                    <div className="mt-12 flex flex-col items-center justify-center rounded-lg bg-white p-10 text-center shadow">
                        <MapPin className="mb-4 h-10 w-10 text-blue-500" />

                        <h3 className="text-lg font-semibold text-gray-800">
                            Aucune excursion disponible
                        </h3>

                        <p className="mt-2 text-sm text-gray-600">
                            Commencez par ajouter votre première excursion.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {excursions.map((excursion) => (
                            <ExcursionCard
                                key={excursion.id}
                                excursion={excursion}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
