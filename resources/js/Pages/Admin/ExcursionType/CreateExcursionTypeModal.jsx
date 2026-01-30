import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function CreateExcursionTypeModal({ show, onClose, editingType = null }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        type: editingType?.type || '',
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

        if (editingType) {
            // Mise à jour
            put(route('excursion-types.update', editingType.id), {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        } else {
            // Ajout
            post(route('excursion-types.store'), {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        }
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="md">
            <form onSubmit={submit} className="relative p-6">
                <button
                    type="button"
                    onClick={closeModal}
                    className="absolute right-4 top-4 rounded-full p-1 text-blue-600 hover:bg-blue-100"
                    aria-label="Fermer"
                >
                    ✕
                </button>

                <h2 className="mb-4 text-lg font-semibold text-blue-800">
                    {editingType ? 'Modifier le type d’excursion' : 'Ajouter un type d’excursion'}
                </h2>

                <div className="mb-4">
                    <InputLabel htmlFor="type" value="Nom du type" />
                    <TextInput
                        id="type"
                        type="text"
                        value={data.type}
                        onChange={(e) => setData('type', e.target.value)}
                        placeholder="Ex : Aventure, Culturelle, Nature..."
                        className="mt-1 w-full"
                        isFocused={true}
                    />
                    <InputError message={errors.type} className="mt-1" />
                </div>

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="rounded-lg border border-blue-200 px-4 py-2 text-sm text-blue-700 hover:bg-blue-50"
                    >
                        Annuler
                    </button>

                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700 disabled:opacity-50"
                    >
                        {editingType ? 'Mettre à jour' : 'Enregistrer'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
