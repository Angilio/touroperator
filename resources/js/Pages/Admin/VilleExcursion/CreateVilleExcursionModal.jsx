import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function CreateVilleExcursionModal({ show, onClose, editingVille = null }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        ville: editingVille?.ville ?? '',
    });

    const closeModal = () => {
        reset();
        onClose();
    };

    useEffect(() => {
        if (!show) reset();
    }, [show]);

    // Important: si editingVille change (quand tu passes en mode edit), mets à jour le champ
    useEffect(() => {
        setData('ville', editingVille?.ville ?? '');
    }, [editingVille]);

    const submit = (e) => {
        e.preventDefault();

        if (editingVille) {
            put(route('ville-excursions.update', editingVille.id), {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        } else {
            post(route('ville-excursions.store'), {
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
                    {editingVille ? 'Modifier la ville d’excursion' : 'Ajouter une ville d’excursion'}
                </h2>

                <div className="mb-4">
                    <InputLabel htmlFor="ville" value="Nom de la ville" />
                    <TextInput
                        id="ville"
                        type="text"
                        value={data.ville ?? ''}          // jamais undefined
                        onChange={(e) => setData('ville', e.target.value)}
                        placeholder="Ex : Antsiranana, Nosy Be..."
                        className="mt-1 w-full"
                        isFocused={true}
                    />
                    <InputError message={errors.ville} className="mt-1" />
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
                        {editingVille ? 'Mettre à jour' : 'Enregistrer'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}