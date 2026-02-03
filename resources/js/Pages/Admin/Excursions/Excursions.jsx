import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Excursions() {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold text-blue-800">Excursions</h2>}
        >
            <Head title="Excursions" />

            <div className="text-blue-800">
                <h3 className="text-lg font-semibold">Excursions</h3>
                <p className="mt-2 text-sm">
                    Excursions ......................
                </p>
            </div>
        </AuthenticatedLayout>
    );
}
