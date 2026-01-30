import { useState } from 'react';
import { Plus, Tag, Edit2 } from 'lucide-react';
import CreateExcursionTypeModal from './CreateExcursionTypeModal';

export default function ExcursionType({ types = [] }) {
    const [showModal, setShowModal] = useState(false);
    const [editingType, setEditingType] = useState(null); // null = ajout, sinon modification

    const openAddModal = () => {
        setEditingType(null);
        setShowModal(true);
    };

    const openEditModal = (type) => {
        setEditingType(type);
        setShowModal(true);
    };

    return (
        <div className="text-blue-800">
            {/* Header */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold">Types d’excursions</h3>

                <button
                    onClick={openAddModal}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700 sm:w-auto"
                >
                    <Plus size={16} />
                    Ajouter un type
                </button>
            </div>

            {/* Liste */}
            {types.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {types.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between gap-4 rounded-xl border border-blue-100 bg-white p-4 shadow transition hover:shadow-md"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                    <Tag className="h-6 w-6 text-blue-600" />
                                </div>
                                <p className="text-base font-medium text-blue-800">
                                    {item.type}
                                </p>
                            </div>

                            <button
                                onClick={() => openEditModal(item)}
                                className="rounded-lg border border-blue-200 px-3 py-1 text-sm text-blue-700 hover:bg-blue-50"
                            >
                                <Edit2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="rounded-lg border border-dashed border-blue-200 py-12 text-center text-blue-500">
                    Aucun type d’excursion enregistré
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <CreateExcursionTypeModal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    editingType={editingType} // passe le type à modifier
                />
            )}
        </div>
    );
}
