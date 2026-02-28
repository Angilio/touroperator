import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import ExcursionPublicCard from "./ExcursionPublicCard";
import FlashMessage from "@/Components/FlashMessage";
import { motion } from "framer-motion";
import { Compass, ShieldCheck, Gem } from "lucide-react";

export default function Welcome({ excursions }) {
  const whatsappNumber = "261325572786";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello%20I%20would%20like%20more%20information%20about%20your%20excursions`;

  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };

  return (
    <GuestLayout>
      <Head title="Home" />
      <FlashMessage />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="relative min-h-[72vh] md:min-h-[80vh] bg-cover bg-center"
          style={{ backgroundImage: "url('/images/fonds/image1.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-gray-50" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16 md:pt-24 pb-12">
            <div className="max-w-3xl text-white">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm ring-1 ring-white/10">
                Antsiranana • Madagascar
              </p>

              <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
                Discover Antsiranana{" "}
                <span className="text-blue-200">Like Never Before</span>
              </h1>

              <p className="mt-4 text-base sm:text-lg text-white/90 max-w-2xl">
                Explore stunning landscapes, unique adventures, and create unforgettable memories
                with local guides and authentic destinations.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href={route("excursions.clientIndex")}
                  className="inline-flex justify-center rounded-full bg-blue-800 px-6 py-3 font-semibold text-white hover:bg-blue-500 transition"
                >
                  Explore Excursions
                </a>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center rounded-full bg-green-500 px-6 py-3 font-semibold text-white hover:bg-green-600 transition"
                >
                  Contact us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR EXCURSIONS */}
      <section
        id="popular"
        className="relative py-20 overflow-hidden bg-gradient-to-br from-white via-blue-50 to-indigo-50"
      >
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_1px_1px,_#000_1px,_transparent_0)] [background-size:24px_24px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
          >
            <motion.div variants={fadeUp}>
              <p className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold text-blue-700">
                Featured Tours
              </p>

              <h2 className="mt-4 text-4xl font-extrabold text-gray-900 leading-tight">
                Discover Our <span className="text-blue-600">Top Experiences</span>
              </h2>

              <p className="mt-4 text-gray-600 max-w-2xl">
                Carefully selected adventures designed to give you unforgettable memories in Antsiranana.
              </p>
            </motion.div>

            <motion.a
              variants={fadeUp}
              href={route("excursions.clientIndex")}
              className="inline-flex items-center gap-2 rounded-full bg-gray-900 text-white px-6 py-3 text-sm font-semibold hover:bg-black transition shadow-md"
            >
              Browse All Tours →
            </motion.a>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.18 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {excursions.map((excursion) => (
              <motion.div
                key={excursion.id}
                variants={fadeUp}
                className="will-change-transform"
              >
                <ExcursionPublicCard excursion={excursion} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WHY */}
      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
          >
            <motion.div variants={fadeUp} className="lg:col-span-5">
              <p className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-100">
                Why ObayaMadaTour
              </p>

              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
                Why Travel With Us?
              </h2>

              <p className="mt-3 text-gray-600">
                We provide unique experiences with professional local guides,
                authentic destinations, and top customer support.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center rounded-full bg-green-500 px-6 py-3 text-white font-semibold hover:bg-green-600 transition"
                >
                  Contact us
                </a>
              </div>
            </motion.div>

            <motion.div
              variants={container}
              className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <motion.div variants={fadeUp}>
                <FeatureWP
                  title="Local Guides"
                  desc="Explore with people who know every hidden spot."
                  icon={<Compass className="h-6 w-6" />}
                />
              </motion.div>

              <motion.div variants={fadeUp}>
                <FeatureWP
                  title="Safe & Organized"
                  desc="Clear programs, support and secure trips."
                  icon={<ShieldCheck className="h-6 w-6" />}
                />
              </motion.div>

              <motion.div variants={fadeUp} className="sm:col-span-2">
                <FeatureWP
                  title="Best Value"
                  desc="Great experiences at fair prices, with transparent pricing and top service."
                  icon={<Gem className="h-6 w-6" />}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </GuestLayout>
  );
}

function FeatureWP({ title, desc, icon }) {
  return (
    <div className="group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 ring-1 ring-blue-100 group-hover:bg-blue-100 transition">
          {icon}
        </div>

        <div>
          <h3 className="font-extrabold text-lg text-gray-900">
            {title}
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}