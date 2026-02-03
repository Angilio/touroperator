import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ children }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold text-blue-800">Tableau de bord</h2>}
        >
            <Head title="Dashboard" />
            {children}
        </AuthenticatedLayout>
    );
}
