import { Plus, User } from 'lucide-react';

export default function Admin({ admins = [] }) {
    return (
        <div className="text-blue-800">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Liste des admins</h3>

                <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 transition">
                    <Plus size={16} />
                    Ajouter un admin
                </button>
            </div>

            {/* Grid cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {admins.length > 0 ? (
                    admins.map((admin) => (
                        <div
                            key={admin.id}
                            className="flex gap-4 rounded-xl border border-blue-100 bg-white p-4 shadow hover:shadow-md transition"
                        >
                            {/* PDP */}
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-100">
                                {admin.pdp ? (
                                    <img
                                        src={`/storage/${admin.pdp}`}
                                        alt="Photo de profil"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <User className="h-8 w-8 text-blue-600" />
                                )}
                            </div>

                            {/* Infos */}
                            <div className="flex-1">
                                <h4 className="text-base font-semibold text-blue-800">
                                    {admin.name} {admin.firstname}
                                </h4>

                                <p className="text-sm text-blue-600">
                                    {admin.email}
                                </p>

                                <div className="mt-2 text-sm text-blue-700 space-y-1">
                                    <p>
                                        <span className="font-medium">Contact :</span>{' '}
                                        {admin.contact}
                                    </p>
                                    <p>
                                        <span className="font-medium">Nation :</span>{' '}
                                        {admin.nation}
                                    </p>
                                </div>

                                <span className="mt-3 inline-block rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                                    Admin
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center text-blue-500 py-10">
                        Aucun admin trouvé
                    </div>
                )}
            </div>
        </div>
    );
}
