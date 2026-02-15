import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function CreateTypeVoyageModal({ show, onClose, editingTypeVoyage = null }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        typevoyage: editingTypeVoyage?.typevoyage || '', // correspond au champ Laravel
    });

    const closeModal = () => {
        reset();
        onClose();
    };

    useEffect(() => {
        if (!show) reset();
    }, [show]);

    const submit = (e) => {
        e.preventDefault();

        if (editingTypeVoyage) {
            put(route('type-voyages.update', editingTypeVoyage.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('type-voyages.store'), {
                onSuccess: () => closeModal(),
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
                    {editingTypeVoyage ? 'Modifier le type de voyage' : 'Ajouter un type de voyage'}
                </h2>

                <div className="mb-4">
                    <InputLabel htmlFor="typevoyage" value="Nom du type" />
                    <TextInput
                        id="typevoyage"
                        type="text"
                        value={data.typevoyage}
                        onChange={e => setData('typevoyage', e.target.value)}
                        placeholder="Ex : Avion, Bateau..."
                        className="mt-1 w-full"
                        isFocused={true}
                    />
                    <InputError message={errors.typevoyage} className="mt-1" />
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
                        {editingTypeVoyage ? 'Mettre à jour' : 'Enregistrer'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
