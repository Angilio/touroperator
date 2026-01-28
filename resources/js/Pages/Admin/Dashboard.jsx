import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { usePage } from '@inertiajs/react';

// Import des composants de chaque menu
import Statistique from './Statistique/Statistique';
import Admin from './Admin/Admin';
import Excursions from './Excursions/Excursions';

// Import des icônes Lucide
import { BarChart2, User, Truck } from 'lucide-react';

export default function Dashboard() {
    const { admins = [] } = usePage().props;
    const [activeMenu, setActiveMenu] = useState('stat1');

    const renderContent = () => {
        switch (activeMenu) {
            case 'stat1':
                return <Statistique />;
            case 'stat2':
                return <Admin admins={admins} />;
            case 'stat3':
                return <Excursions />;
            default:
                return <Statistique />;
        }
    };

    const menuItems = [
        { id: 'stat1', name: 'Statistique', icon: BarChart2 },
        { id: 'stat2', name: 'Admin', icon: User },
        { id: 'stat3', name: 'Excursions', icon: Truck },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-blue-800">
                    Tableau de bord
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 bg-blue-50 min-h-screen">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-6">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-64 bg-white rounded-lg shadow p-6 flex flex-col">
                        <h3 className="text-lg font-semibold text-blue-700 mb-6">
                            Menu
                        </h3>

                        <ul className="flex-1 space-y-2">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeMenu === item.id;
                                return (
                                    <li key={item.id}>
                                        <button
                                            onClick={() => setActiveMenu(item.id)}
                                            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                                                isActive
                                                    ? 'bg-blue-100 text-blue-800 shadow'
                                                    : 'text-blue-700 hover:bg-blue-50 hover:text-blue-800'
                                            }`}
                                        >
                                            <Icon className="h-5 w-5" />
                                            {item.name}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </aside>

                    {/* Contenu principal */}
                    <main className="flex-1">
                        <div className="bg-white rounded-lg shadow p-6">
                            {renderContent()}
                        </div>
                    </main>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
