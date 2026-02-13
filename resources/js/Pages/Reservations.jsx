import { useForm, Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';

export default function Reservations({ excursion, types }) {
    const { data, setData, post, processing, errors } = useForm({
        nbrPersonne: '',
        dateStart: '',
        dateEnd: '',
        excursion_id: excursion.id,
        type_voyage_id: '',
        contact: '',
        email: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('reservations.store'));
    }

    return (
        <GuestLayout>
            <Head title="Réservation" />
            <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">

                <button
                    onClick={() => window.history.back()}
                    className="mb-4 text-blue-600 hover:text-blue-800 font-semibold"
                >
                    ← Retour
                </button>

                <h1 className="text-2xl font-bold mb-6 text-blue-900 text-center">
                    Excursion : {excursion.title}
                </h1>

                <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Nombre personnes */}
                    <div>
                        <InputLabel value="Nombre de personnes" />
                        <TextInput
                            type="number"
                            value={data.nbrPersonne}
                            onChange={e => setData('nbrPersonne', e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.nbrPersonne} />
                    </div>

                    {/* Type voyage */}
                    <div>
                        <InputLabel value="Type de voyage" />
                        <select
                            value={data.type_voyage_id}
                            onChange={e => setData('type_voyage_id', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        >
                            <option value="">Choisir</option>
                            {types.map(t => (
                                <option key={t.id} value={t.id}>
                                    {t.typevoyage}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.type_voyage_id} />
                    </div>

                    {/* Date début */}
                    <div>
                        <InputLabel value="Date début" />
                        <TextInput
                            type="date"
                            value={data.dateStart}
                            onChange={e => setData('dateStart', e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.dateStart} />
                    </div>

                    {/* Date fin */}
                    <div>
                        <InputLabel value="Date fin" />
                        <TextInput
                            type="date"
                            value={data.dateEnd}
                            onChange={e => setData('dateEnd', e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.dateEnd} />
                    </div>

                    {/* Contact */}
                    <div>
                        <InputLabel value="Contact" />
                        <TextInput
                            type="text"
                            value={data.contact}
                            onChange={e => setData('contact', e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.contact} />
                    </div>

                    {/* Email */}
                    <div>
                        <InputLabel value="Email" />
                        <TextInput
                            type="email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.email} />
                    </div>

                    {/* Bouton (pleine largeur, centré sur 2 colonnes) */}
                    <div className="md:col-span-2">
                        <button
                            disabled={processing}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
                        >
                            Valider réservation
                        </button>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
