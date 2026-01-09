import React from 'react';

export default function Welcome() {
  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-blue-500 text-white p-4 shadow-lg flex justify-between items-center">
        <h1 className="text-2xl font-bold">MyApp</h1>
        <nav className="flex gap-4 text-lg">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Contact</a>
        </nav>
      </header>

      {/* Illustration Top */}
      <div className="w-full bg-blue-400 rounded-b-[50%] pb-16 pt-10 flex items-center justify-center relative overflow-hidden">
        <div className="flex flex-col items-center">
          <div className="text-white text-center font-semibold text-xl">Welcome to the App</div>
          <div className="mt-6 w-64 h-40 bg-white rounded-xl shadow-lg flex items-center justify-center text-blue-500 font-bold">
            Illustration simulée
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-6 w-full max-w-4xl">
        {["Site1", "Site2", "Site2", "Site2", "Site3", "Site4"].map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center cursor-pointer hover:shadow-xl transition">
            <div className="w-24 h-24 bg-blue-300 rounded-xl mb-4 flex items-center justify-center text-white font-bold">
              IMG
            </div>
            <p className="text-lg font-semibold">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
