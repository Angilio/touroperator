import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import SidebarMenu from '../Pages/Admin/SidebarMenu';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showSidebarMobile, setShowSidebarMobile] = useState(false);

    return (
        <div className="min-h-screen bg-blue-50 flex flex-col">
            {/* NAVIGATION */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-blue-300 bg-blue-100">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        {/* Logo + Desktop Nav */}
                        <div className="flex items-center">
                            <Link href="/" className="flex shrink-0 items-center">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-blue-700" />
                            </Link>

                            {/* Desktop Nav (visible lg+) */}
                            <div className="hidden lg:ml-10 lg:flex space-x-8">
                                <NavLink
                                    href={route('statistique.index')}
                                    active={route().current('statistique.index')}
                                    className="text-blue-700 hover:text-blue-900"
                                >
                                    Tableau de bord
                                </NavLink>
                            </div>
                        </div>

                        {/* Desktop User Dropdown */}
                        <div className="hidden lg:ml-6 lg:flex lg:items-center">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="inline-flex items-center rounded-md border border-transparent bg-blue-200 px-3 py-2 text-sm font-medium text-blue-800 hover:bg-blue-300">
                                        {user.name}
                                        <svg
                                            className="ml-2 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content className="bg-blue-100 border border-blue-300">
                                    <Dropdown.Link
                                        href={route('profile.edit')}
                                        className="text-blue-700 hover:text-blue-900"
                                    >
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="text-blue-700 hover:text-blue-900"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* Hamburger visible md+sm (tablette et mobile) */}
                        <div className="flex lg:hidden">
                            <button
                                onClick={() => setShowSidebarMobile(true)}
                                className="inline-flex items-center justify-center rounded-md p-2 text-blue-700 hover:bg-blue-200 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* MAIN CONTENT */}
            <div className="pt-24 pb-12">
                <div className="mx-auto max-w-7xl px-4 flex flex-col lg:flex-row gap-6 relative">
                    {/* Sidebar Desktop (lg+) */}
                    <div className="hidden lg:block lg:w-64">
                        <div className="sticky top-24">
                            <SidebarMenu />
                        </div>
                    </div>

                    {/* Page content */}
                    <main className="flex-1 w-full bg-white rounded-lg shadow p-6">
                        {children}
                    </main>

                    {/* Sidebar Mobile Off-Canvas */}
                    <div
                        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
                            showSidebarMobile ? 'translate-x-0' : 'translate-x-full'
                        }`}
                    >
                        <div className="flex justify-between items-center px-4 py-4 border-b border-blue-300">
                            <h3 className="text-lg font-semibold text-blue-800">Menu</h3>
                            <button
                                onClick={() => setShowSidebarMobile(false)}
                                className="text-blue-700 hover:text-blue-900"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="px-4 py-6 space-y-4">
                            <SidebarMenu
                                mobile
                                onLinkClick={() => setShowSidebarMobile(false)}
                            />
                        </div>
                    </div>

                    {/* Overlay */}
                    {showSidebarMobile && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-30 z-40"
                            onClick={() => setShowSidebarMobile(false)}
                        ></div>
                    )}
                </div>
            </div>
        </div>
    );
}
