import { useState, useRef, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function ExcursionForm({ excursion = null, types = [], errors = {}, mode = 'create' }) {
    const [formData, setFormData] = useState({
        title: excursion?.title || '',
        short_description: excursion?.short_description || '',
        description: excursion?.description || '',
        price: excursion?.price || '',
        video: excursion?.video || '',
        type_excursion_id: excursion?.type_excursion_id || '',
        images: [], // fichiers upload
    });

    const [imagePreviews, setImagePreviews] = useState([]);

    const fileInputRef = useRef();

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

        if (mode === 'create') {
            Inertia.post('/excursions', data);
        } else if (mode === 'edit' && excursion?.id) {
            Inertia.post(`/excursions/${excursion.id}`, data, { _method: 'PUT' });
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold text-blue-800">{mode === 'create' ? 'Ajouter une excursion' : 'Modifier excursion'}</h2>}>
            <Head title={mode === 'create' ? 'Ajouter Excursion' : 'Modifier Excursion'} />

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
                    <InputLabel value="Description complète" htmlFor="description" />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        rows={4}
                    />
                    <InputError message={errors.description} className="mt-1" />
                </div>

                {/* Price */}
                <div>
                    <InputLabel value="Prix" htmlFor="price" />
                    <TextInput
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors.price} className="mt-1" />
                </div>

                {/* Video */}
                <div>
                    <InputLabel value="Lien vidéo (facultatif)" htmlFor="video" />
                    <TextInput
                        name="video"
                        value={formData.video}
                        onChange={handleChange}
                        className="mt-1 block w-full"
                    />
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
