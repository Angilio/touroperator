import { useState, useRef, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import RichTextEditor from '@/Components/RichTextEditor';

export default function ExcursionForm({ excursion = null, types = [], errors = {}, mode = 'create' }) {
    const [formData, setFormData] = useState({
        title: excursion?.title || '',
        short_description: excursion?.short_description || '',
        description: excursion?.description || '',
        price: excursion?.price || '',
        video: null,
        type_excursion_id: excursion?.type_excursion_id || '',
        images: [], // fichiers upload
    });

    const [imagePreviews, setImagePreviews] = useState([]);

    const fileInputRef = useRef();
    const videoInputRef = useRef();

    // Gestion des champs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Gestion de l'upload multiple d'images
    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData((prev) => ({ ...prev, images: files }));

        // Prévisualisation
        const previews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    // Soumission
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('title', formData.title);
        data.append('short_description', formData.short_description);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('video', formData.video);
        data.append('type_excursion_id', formData.type_excursion_id);

        formData.images.forEach((file, index) => {
            data.append(`images[${index}]`, file);
        });

        if (formData.video) {
            data.append('video', formData.video);
        }

        if (mode === 'create') {
            Inertia.post('/excursions', data);
        } else if (mode === 'edit' && excursion?.id) {
            Inertia.post(`/excursions/${excursion.id}`, data, { _method: 'PUT' });
        }
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({ ...prev, video: file }));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold text-blue-800">{mode === 'create' ? 'Ajouter une excursion' : 'Modifier excursion'}</h2>}>
            <Head title={mode === 'create' ? 'Ajouter un excursion' : 'Modifier l\'excursion'} />

            <div className="mb-4">
                <button
                    type="button"
                    onClick={() => window.history.back()} // <-- ici
                    className="flex items-center text-blue-600 hover:text-blue-800 transition"
                >
                    <span className="mr-2 text-2xl">←</span>
                    <span>Retour</span>
                </button>
            </div>

            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold text-blue-600">
                    {mode === 'create' ? 'Ajouter Excursion' : 'Modifier Excursion'}
                </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                    <InputLabel value="Titre" htmlFor="title" />
                    <TextInput
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-1 block w-full"
                        isFocused
                    />
                    <InputError message={errors.title} className="mt-1" />
                </div>

                {/* Images */}
                <div>
                    <InputLabel value="Images" htmlFor="images" />

                    <div
                        onClick={() => fileInputRef.current.click()}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();
                            const files = Array.from(e.dataTransfer.files);
                            setFormData((prev) => ({ ...prev, images: files }));
                            const previews = files.map((file) => URL.createObjectURL(file));
                            setImagePreviews(previews);
                        }}
                        className="mt-1 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition"
                        >
                        <p className="text-sm text-gray-500">
                            Cliquez ici ou glissez vos images pour les ajouter
                        </p>
                        <button
                            type="button"
                            className="mt-2 rounded bg-blue-600 px-4 py-1 text-sm text-white hover:bg-blue-700 transition"
                            onClick={(e) => {
                            e.stopPropagation();
                            fileInputRef.current.click();
                            }}
                        >
                            Sélectionner des fichiers
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            multiple
                            onChange={handleImagesChange}
                            className="hidden"
                            accept="image/*"
                        />
                    </div>

                    {/* Prévisualisation */}
                    {imagePreviews.length > 0 && (
                        <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                            {imagePreviews.map((src, index) => (
                                <div
                                    key={index}
                                    className="w-full rounded-lg border border-gray-200 overflow-hidden"
                                >
                                    <img
                                        src={src}
                                        alt={`preview ${index}`}
                                        className="
                                            w-full 
                                            h-20 
                                            sm:h-24 
                                            md:h-28 
                                            lg:h-32 
                                            object-cover
                                        "
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Affichage des erreurs pour les images */}
                    <InputError message={errors.images} className="mt-1" />
                </div>

                {/* Short Description */}
                <div>
                    <InputLabel value="Description courte" htmlFor="short_description" />
                    <TextInput
                        name="short_description"
                        value={formData.short_description}
                        onChange={handleChange}
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors.short_description} className="mt-1" />
                </div>


                {/* Description */}
                <div>
                    <InputLabel value="Description complète" />

                    <RichTextEditor
                        value={formData.description}
                        onChange={(value) =>
                            setFormData((prev) => ({ ...prev, description: value }))
                        }
                    />

                    <InputError message={errors.description} className="mt-1" />
                </div>

                {/* Price */}
                <div>
                    <InputLabel value="Prix" htmlFor="price" />

                    <div className="relative mt-1">
                        <TextInput
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="block w-full pr-8"
                            step="0.01"
                            min="0"
                        />

                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                            €
                        </span>
                    </div>

                    <InputError message={errors.price} className="mt-1" />
                </div>

                {/* Video */}
                <div>
                    <InputLabel value="Vidéo" htmlFor="video" />

                    <div
                        onClick={() => videoInputRef.current.click()}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();
                            const file = e.dataTransfer.files[0];
                            if (file) setFormData((prev) => ({ ...prev, video: file }));
                        }}
                        className="mt-1 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition"
                        >
                        <p className="text-sm text-gray-500">
                            Cliquez ici ou glissez votre vidéo pour l'ajouter
                        </p>
                        <button
                            type="button"
                            className="mt-2 rounded bg-blue-600 px-4 py-1 text-sm text-white hover:bg-blue-700 transition"
                            onClick={(e) => {
                            e.stopPropagation();
                            videoInputRef.current.click();
                            }}
                        >
                            Sélectionner un fichier
                        </button>
                        <input
                            type="file"
                            ref={videoInputRef}
                            onChange={handleVideoChange}
                            className="hidden"
                            accept="video/*"
                        />
                    </div>

                    {/* Prévisualisation */}
                    {formData.video && (
                        <video
                            src={URL.createObjectURL(formData.video)}
                            controls
                            className="mt-4 w-full max-w-md rounded-lg border"
                        />
                    )}

                    <InputError message={errors.video} className="mt-1" />
                </div>

                {/* Type d'excursion */}
                <div>
                    <InputLabel value="Type d'excursion" htmlFor="type_excursion_id" />
                    <select
                        name="type_excursion_id"
                        value={formData.type_excursion_id}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="">Sélectionner un type</option>
                        {types.map((t) => (
                            <option key={t.id} value={t.id}>
                                {t.type}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.type_excursion_id} className="mt-1" />
                </div>

                {/* Submit */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 transition"
                    >
                        {mode === 'create' ? 'Ajouter' : 'Modifier'}
                    </button>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
