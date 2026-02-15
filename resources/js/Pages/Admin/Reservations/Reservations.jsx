import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Reservations({ reservations }) {
    return (
        <AuthenticatedLayout>
            <Head title="Réservations" />

            <h1 className="text-2xl font-bold mb-6 text-blue-800">
                Liste des réservations
            </h1>

            <table className="w-full border rounded-lg overflow-hidden">
                <thead className="bg-blue-100">
                    <tr>
                        <th className="p-3 text-left">Excursion</th>
                        <th className="p-3 text-left">Personnes</th>
                        <th className="p-3 text-left">Dates</th>
                        <th className="p-3 text-left">Contact</th>
                        <th className="p-3 text-left">Email</th>
                    </tr>
                </thead>

                <tbody>
                    {reservations.map(res => (
                        <tr key={res.id} className="border-t">
                            <td className="p-3">
                                {res.excursion?.title}
                            </td>

                            <td className="p-3">
                                {res.nbrPersonne}
                            </td>

                            <td className="p-3">
                                {res.dateStart} → {res.dateEnd}
                            </td>

                            <td className="p-3">
                                {res.contact}
                            </td>

                            <td className="p-3">
                                {res.email}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </AuthenticatedLayout>
    );
}
