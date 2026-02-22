import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Reservations({ reservations = [] }) {
    return (
        <AuthenticatedLayout>
            <Head title="Réservations" />

            {/* TITRE */}
            <h1 className="text-2xl md:text-3xl font-bold mb-8 text-blue-800 text-center">
                Liste des réservations
            </h1>

            {reservations.length === 0 ? (
                <div className="text-center py-10 text-gray-500 bg-white/60 rounded-xl shadow">
                    Aucune réservation
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {reservations.map(res => (
                        <div
                            key={res.id}
                            className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
                        >
                            {/* Titre excursion */}
                            <h2 className="text-xl font-bold text-blue-700 mb-3">
                                {res.excursion?.title || 'Excursion'}
                            </h2>

                            {/* Infos */}
                            <div className="space-y-2 text-gray-700">
                                <p><strong>Type voyage :</strong> {res.type_voyage?.typevoyage || '-'}</p>
                                <p><strong>Nom client :</strong> {res.fullname || '-'}</p>
                                <p><strong>Personnes :</strong> {res.nbrPersonne}</p>
                                <p><strong>Dates :</strong> {res.dateStart} → {res.dateEnd}</p>
                                <p><strong>Contact :</strong> {res.contact}</p>
                                <p><strong>Email :</strong> {res.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AuthenticatedLayout>
    );
}
