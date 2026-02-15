import { useState } from 'react';
import { Plus, Tag, Edit2, Trash2 } from 'lucide-react';
import { router, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import FlashMessage from '@/Components/FlashMessage';
import CreateTypeVoyageModal from './CreateTypeVoyageModal';
import ConfirmDeleteModal from '@/Components/ConfirmDeleteModal';

export default function TypeVoyages({ typeVoyages = [] }) {
    const [showModal, setShowModal] = useState(false);
    const [editingType, setEditingType] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [typeToDelete, setTypeToDelete] = useState(null);

    const openAddModal = () => {
        setEditingType(null);
        setShowModal(true);
    };

    const openEditModal = (type) => {
        setEditingType(type);
        setShowModal(true);
    };

    const openDeleteModal = (id) => {
        setTypeToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (typeToDelete) {
            router.delete(route('type-voyages.destroy', typeToDelete), {
                onFinish: () => {
                    setShowDeleteModal(false);
                    setTypeToDelete(null);
                },
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold text-blue-800">
                    Types de voyage
                </h2>
            }
        >
            <Head title="Types de voyage" />

            <div className="text-blue-800">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-lg font-semibold">
                        Types de voyage
                    </h3>

                    <button
                        onClick={openAddModal}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700 sm:w-auto"
                    >
                        <Plus size={16} />
                        Ajouter un type
                    </button>
                </div>

                <FlashMessage />

                {/* Liste */}
                {typeVoyages.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {typeVoyages.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col gap-4 rounded-xl border border-blue-100 bg-white p-4 shadow transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                        <Tag className="h-6 w-6 text-blue-600" />
                                    </div>

                                    <p className="text-base font-medium text-blue-800">
                                        {item.typevoyage}
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex w-full justify-end gap-2 sm:w-auto">
                                    <button
                                        onClick={() => openEditModal(item)}
                                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-200 text-blue-700 hover:bg-blue-50"
                                        title="Modifier"
                                    >
                                        <Edit2 size={16} />
                                    </button>

                                    <button
                                        onClick={() => openDeleteModal(item.id)}
                                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                                        title="Supprimer"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-lg border border-dashed border-blue-200 py-12 text-center text-blue-500">
                        Aucun type de voyage enregistré
                    </div>
                )}

                {/* Modal ajout / édition */}
                {showModal && (
                    <CreateTypeVoyageModal
                        show={showModal}
                        onClose={() => setShowModal(false)}
                        editingTypeVoyage={editingType}
                    />
                )}

                {/* Modal suppression */}
                <ConfirmDeleteModal
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={confirmDelete}
                    title="Supprimer type voyage"
                    message="Cette action est définitive. Voulez-vous vraiment supprimer ce type de voyage ?"
                />
            </div>
        </AuthenticatedLayout>
    );
}
