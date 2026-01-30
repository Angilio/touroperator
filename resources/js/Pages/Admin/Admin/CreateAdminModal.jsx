import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import Modal from '@/Components/Modal';

export default function CreateAdminModal({ show, onClose }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        firstname: '',
        contact: '',
        nation: '',
        email: '',
    });

    const closeModal = () => {
        reset();
        onClose();
    };

    useEffect(() => {
        if (!show) {
            reset();
        }
    }, [show]);

    const submit = (e) => {
        e.preventDefault();

        post(route('admins.store'), {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="lg">
            <form onSubmit={submit} className="relative p-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="absolute right-4 top-4 rounded-full p-1 text-blue-600 hover:bg-blue-100"
                    aria-label="Fermer"
                >
                    ✕
                </button>

                <h2 className="mb-6 text-lg font-semibold text-blue-800">
                    Ajouter un admin
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Nom */}
                    <div>
                        <label className="text-sm font-medium text-blue-700">
                            Nom
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 w-full rounded-lg border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                        {errors.name && (
                            <p className="text-sm text-red-600">{errors.name}</p>
                        )}
                    </div>

                    {/* Prénom */}
                    <div>
                        <label className="text-sm font-medium text-blue-700">
                            Prénom
                        </label>
                        <input
                            type="text"
                            value={data.firstname}
                            onChange={(e) =>
                                setData('firstname', e.target.value)
                            }
                            className="mt-1 w-full rounded-lg border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    {/* Contact */}
                    <div>
                        <label className="text-sm font-medium text-blue-700">
                            Contact
                        </label>
                        <input
                            type="text"
                            value={data.contact}
                            onChange={(e) =>
                                setData('contact', e.target.value)
                            }
                            className="mt-1 w-full rounded-lg border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    {/* Nation */}
                    <div>
                        <label className="text-sm font-medium text-blue-700">
                            Nation
                        </label>
                        <input
                            type="text"
                            value={data.nation}
                            onChange={(e) =>
                                setData('nation', e.target.value)
                            }
                            className="mt-1 w-full rounded-lg border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    {/* Email */}
                    <div className="sm:col-span-2">
                        <label className="text-sm font-medium text-blue-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) =>
                                setData('email', e.target.value)
                            }
                            className="mt-1 w-full rounded-lg border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="rounded-lg border px-4 py-2 text-blue-700 hover:bg-blue-50"
                    >
                        Annuler
                    </button>

                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        Enregistrer
                    </button>
                </div>
            </form>
        </Modal>
    );
}
