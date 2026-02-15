import { Link } from '@inertiajs/react';
import {
    BarChart2,
    User,
    Truck,
    Tag,
    Plane,
    CalendarCheck
} from 'lucide-react';
import { route } from 'ziggy-js';

export default function SidebarMenu() {
    const menuItems = [
        { name: 'Statistique', route: 'statistique.index', icon: BarChart2 },
        { name: 'Admin', route: 'admins.index', icon: User },
        { name: "Type d'excursion", route: 'excursion-types.index', icon: Tag },
        { name: 'Excursions', route: 'excursions.index', icon: Truck },
        { name: 'Type de voyage', route: 'type-voyages.index', icon: Plane },
        { name: 'Réservations', route: 'reservations.index', icon: CalendarCheck },
    ];

    return (
        <aside className="w-full lg:w-64 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-blue-700 mb-6">Menu</h3>

            <ul className="space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = route().current(item.route);

                    return (
                        <li key={item.route}>
                            <Link
                                href={route(item.route)}
                                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${
                                    isActive
                                        ? 'bg-blue-100 text-blue-800 shadow border-l-4 border-blue-600'
                                        : 'text-blue-700 hover:bg-blue-50'
                                }`}
                                preserveScroll
                            >
                                <Icon className="h-5 w-5" />
                                {item.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}
