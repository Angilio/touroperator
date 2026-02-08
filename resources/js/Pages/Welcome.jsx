import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import ExcursionPublicCard from './ExcursionPublicCard';

export default function Welcome({ excursions }) {
  return (
    <GuestLayout>
      <Head title="Accueil" />

      {/* Illustration Top */}
      <div className="w-full bg-blue-400 rounded-b-[50%] pb-16 pt-10 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="text-white text-center font-semibold text-xl">
            Welcome to the App
          </div>

          <div className="mt-6 w-64 h-40 bg-white rounded-xl shadow-lg flex items-center justify-center text-blue-500 font-bold">
            Illustration simulée
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 max-w-6xl mx-auto">
        {excursions.map((excursion) => (
            <ExcursionPublicCard
                key={excursion.id}
                excursion={excursion}
            />
        ))}
    </div>

    </GuestLayout>
  );
}
