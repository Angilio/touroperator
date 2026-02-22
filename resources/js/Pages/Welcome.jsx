import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import ExcursionPublicCard from './ExcursionPublicCard';
import FlashMessage from '@/Components/FlashMessage';

export default function Welcome({ excursions }) {
  return (
    <GuestLayout>
      <Head title="Accueil" />

      <FlashMessage />

      {/* HERO SECTION */}
      <section
        className="relative h-[80vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/fonds/image1.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Découvrez Madagascar Autrement
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Des paysages incroyables, des aventures uniques et des souvenirs inoubliables.
          </p>
        </div>
      </section>

      {/* SECTION TITRE */}
      <section className="pt-28 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">
            Nos Excursions Populaires
          </h2>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {excursions.map((excursion) => (
              <ExcursionPublicCard
                key={excursion.id}
                excursion={excursion}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Pourquoi voyager avec nous ?</h2>
          <p className="text-gray-600">
            Nous offrons des expériences uniques à Madagascar avec des guides professionnels,
            des destinations authentiques et un service client exceptionnel.
          </p>
        </div>
      </section>
    </GuestLayout>
  );
}