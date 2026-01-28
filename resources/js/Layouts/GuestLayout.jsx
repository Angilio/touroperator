import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">

            {/* HEADER FIXE */}
            <header className="w-full fixed top-0 z-50 bg-blue-900 text-white shadow-md">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div className="flex items-center justify-between w-full md:w-auto">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <ApplicationLogo className="h-10 w-10 fill-current text-white" />
                            <span className="text-xl font-bold">
                                MadaTour
                            </span>
                        </Link>

                        {/* Mobile button */}
                        <button
                            onClick={() => setOpen(!open)}
                            className="md:hidden focus:outline-none"
                        >
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                    {/* Barre de recherche */}
                    <div className="flex-1 md:mx-6">
                        <input
                            type="text"
                            placeholder="Rechercher une destination..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                    </div>

                    {/* Desktop menu */}
                    <nav className="hidden md:flex gap-6 font-medium">
                        <Link href="/" className="hover:text-blue-200">Accueil</Link>
                        <Link href="/destinations" className="hover:text-blue-200">Destinations</Link>
                        <Link href="/services" className="hover:text-blue-200">Services</Link>
                        <Link href="/contact" className="hover:text-blue-200">Contact</Link>
                    </nav>
                </div>

                {/* Mobile menu */}
                {open && (
                    <div className="md:hidden bg-blue-800 px-6 pb-4 space-y-3">
                        <Link href="/" className="block hover:text-blue-200" onClick={() => setOpen(false)}>Accueil</Link>
                        <Link href="/destinations" className="block hover:text-blue-200" onClick={() => setOpen(false)}>Destinations</Link>
                        <Link href="/services" className="block hover:text-blue-200" onClick={() => setOpen(false)}>Services</Link>
                        <Link href="/contact" className="block hover:text-blue-200" onClick={() => setOpen(false)}>Contact</Link>
                    </div>
                )}
            </header>

            {/* CONTENU */}
            <main className="flex-1 pt-28">
                {children}
            </main>

        </div>
    );
}
