import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';

export default function Welcome() {
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
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-6 max-w-4xl mx-auto">
        {["Site1", "Site2", "Site3", "Site4"].map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center hover:shadow-xl transition"
          >
            <div className="w-24 h-24 bg-blue-300 rounded-xl mb-4 flex items-center justify-center text-white font-bold">
              IMG
            </div>
            <p className="text-lg font-semibold">{item}</p>
          </div>
        ))}
      </div>

    </GuestLayout>
  );
}
