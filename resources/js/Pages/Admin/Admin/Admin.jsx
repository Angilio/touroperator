import { Plus, User } from 'lucide-react';
import { useState } from 'react';
import { usePage, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CreateAdminModal from './CreateAdminModal';

export default function Admin({ admins = [] }) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold text-blue-800">Liste des admins</h2>}
        >
            <Head title="Admins" />

            {flash?.success && (
                <div className="mb-6 rounded-lg border border-green-400 bg-green-100 px-4 py-3 text-green-800">
                    {flash.success}
                </div>
            )}

            {flash?.error && (
                <div className="mb-6 rounded-lg border border-red-400 bg-red-100 px-4 py-3 text-red-800">
                    {flash.error}
                </div>
            )}

            {/* Header interne si besoin */}
            <div className="mb-6 text-blue-800 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold">Gestion des admins</h3>

                <button
                    onClick={() => setShowCreateModal(true)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700 sm:w-auto"
                >
                    <Plus size={16} /> Ajouter un admin
                </button>
            </div>

            {/* Grid cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {admins.length > 0 ? (
                    admins.map((admin) => (
                        <div
                            key={admin.id}
                            className="flex flex-col items-center gap-4 rounded-xl border border-blue-100 bg-white p-5 shadow transition hover:shadow-md sm:flex-row sm:gap-6"
                        >
                            {/* PDP */}
                            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-100 sm:h-28 sm:w-28">
                                {admin.pdp ? (
                                    <img
                                        src={`/storage/${admin.pdp}`}
                                        alt="Photo de profil"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <User className="h-10 w-10 text-blue-600" />
                                )}
                            </div>

                            {/* Infos */}
                            <div className="flex-1 text-center sm:text-left">
                                <h4 className="text-base font-semibold text-blue-800">
                                    {admin.name} {admin.firstname}
                                </h4>
                                <p className="text-sm text-blue-600 break-all">{admin.email}</p>
                                <div className="mt-2 space-y-1 text-sm text-blue-700">
                                    <p>
                                        <span className="font-medium">Contact :</span> {admin.contact}
                                    </p>
                                    <p>
                                        <span className="font-medium">Nation :</span> {admin.nation}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-10 text-center text-blue-500">
                        Aucun admin trouvé
                    </div>
                )}
            </div>

            <CreateAdminModal
                show={showCreateModal}
                onClose={() => setShowCreateModal(false)}
            />
        </AuthenticatedLayout>
    );
}
