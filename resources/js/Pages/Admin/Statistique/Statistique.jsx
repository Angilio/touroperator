import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Statistique() {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold text-blue-800">Liste des admins</h2>}
        >
            <Head title="Statistique" />
            <div className="text-blue-800">
                <h3 className="text-lg font-semibold">Statistique</h3>
                <p className="mt-2 text-sm">
                    Voici les détails de la statistique sélectionnée. Vous pouvez ici ajouter graphiques, tableaux ou informations clés.
                </p>
            </div>
        </AuthenticatedLayout>
    );
}
