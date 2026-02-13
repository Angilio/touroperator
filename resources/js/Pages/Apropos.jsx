import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Apropos() {
    return (
        <GuestLayout>
            <Head title="À propos" />

            <div className="max-w-5xl mx-auto bg-white shadow rounded-lg p-6 sm:p-8 lg:p-12">
                {/* sm:p-8 → sur petits écrans ; lg:p-12 → sur grands écrans */}

                <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
                    À propos – Tourisme Région DIANA
                </h1>

                <p className="text-gray-700 mb-4">
                    Ce site est dédié à la promotion touristique de la région DIANA,
                    située dans le nord de Madagascar. Il a pour objectif de faire
                    découvrir les richesses naturelles, culturelles et historiques
                    de cette région exceptionnelle.
                </p>

                <p className="text-gray-700 mb-4">
                    Vous pouvez y trouver différentes excursions, activités et
                    destinations touristiques : plages, parcs naturels, sites
                    historiques et expériences culturelles uniques.
                </p>

                <h2 className="text-xl font-semibold text-blue-800 mt-6 mb-2">
                    Notre objectif
                </h2>

                <p className="text-gray-700 mb-4">
                    Valoriser le tourisme local dans la région DIANA en facilitant
                    l’accès aux informations et aux réservations d’excursions,
                    tout en soutenant les acteurs touristiques locaux.
                </p>

                <h2 className="text-xl font-semibold text-blue-800 mt-6 mb-2">
                    Pourquoi visiter la région DIANA ?
                </h2>

                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Paysages naturels exceptionnels</li>
                    <li>Climat agréable toute l’année</li>
                    <li>Culture riche et authentique</li>
                    <li>Nombreuses activités touristiques</li>
                </ul>
            </div>
        </GuestLayout>
    );
}
