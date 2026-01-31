import Modal from '@/Components/Modal';
import { Trash2 } from 'lucide-react';

export default function ConfirmDeleteModal({
    show,
    onClose,
    onConfirm,
    title = 'Confirmation',
    message = 'Êtes-vous sûr de vouloir supprimer cet élément ?',
}) {
    return (
        <Modal show={show} onClose={onClose} maxWidth="sm">
            <div className="p-6">
                {/* Icon */}
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                    <Trash2 className="h-6 w-6 text-red-600" />
                </div>

                {/* Title */}
                <h2 className="mb-2 text-center text-lg font-semibold text-gray-800">
                    {title}
                </h2>

                {/* Message */}
                <p className="mb-6 text-center text-sm text-gray-600">
                    {message}
                </p>

                {/* Actions */}
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                    <button
                        onClick={onClose}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                        Annuler
                    </button>

                    <button
                        onClick={onConfirm}
                        className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                    >
                        <Trash2 size={16} />
                        Supprimer
                    </button>
                </div>
            </div>
        </Modal>
    );
}
