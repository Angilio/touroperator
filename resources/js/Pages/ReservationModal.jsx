import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";

export default function ReservationModal({ show, onClose, excursion, types = [] }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    nbrPersonne: 1,
    fullname: "",
    dateStart: "",
    dateEnd: "",
    excursion_id: excursion?.id ?? "",
    type_voyage_id: "",
    contact: "",
    email: "",
  });

  const submit = (e) => {
    e.preventDefault();

    post(route("reservations.store"), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <Modal show={show} onClose={onClose} maxWidth="2xl">
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
              Book this excursion
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              {excursion?.title} • {Number(excursion?.price || 0).toLocaleString("fr-FR")} €
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100"
          >
            Close
          </button>
        </div>

        <form onSubmit={submit} className="mt-6 space-y-4">
          {/* Hidden excursion id */}
          <input type="hidden" value={data.excursion_id} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full name */}
            <div>
              <label className="text-sm font-semibold text-gray-800">Full name</label>
              <input
                value={data.fullname}
                onChange={(e) => setData("fullname", e.target.value)}
                className="mt-1 w-full rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your name"
              />
              {errors.fullname && <p className="mt-1 text-xs text-red-600">{errors.fullname}</p>}
            </div>

            {/* People */}
            <div>
              <label className="text-sm font-semibold text-gray-800">Number of people</label>
              <input
                type="number"
                min={1}
                value={data.nbrPersonne}
                onChange={(e) => setData("nbrPersonne", e.target.value)}
                className="mt-1 w-full rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.nbrPersonne && <p className="mt-1 text-xs text-red-600">{errors.nbrPersonne}</p>}
            </div>

            {/* Date start */}
            <div>
              <label className="text-sm font-semibold text-gray-800">Start date</label>
              <input
                type="date"
                value={data.dateStart}
                onChange={(e) => setData("dateStart", e.target.value)}
                className="mt-1 w-full rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.dateStart && <p className="mt-1 text-xs text-red-600">{errors.dateStart}</p>}
            </div>

            {/* Date end */}
            <div>
              <label className="text-sm font-semibold text-gray-800">End date</label>
              <input
                type="date"
                value={data.dateEnd}
                onChange={(e) => setData("dateEnd", e.target.value)}
                className="mt-1 w-full rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.dateEnd && <p className="mt-1 text-xs text-red-600">{errors.dateEnd}</p>}
            </div>

            {/* Type voyage */}
            <div className="sm:col-span-2">
              <label className="text-sm font-semibold text-gray-800">Trip type (optional)</label>
              <select
                value={data.type_voyage_id}
                onChange={(e) => setData("type_voyage_id", e.target.value)}
                className="mt-1 w-full rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select...</option>
                {types.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.typevoyage}
                  </option>
                ))}
              </select>
              {errors.type_voyage_id && (
                <p className="mt-1 text-xs text-red-600">{errors.type_voyage_id}</p>
              )}
            </div>

            {/* Contact */}
            <div>
              <label className="text-sm font-semibold text-gray-800">Phone / WhatsApp</label>
              <input
                value={data.contact}
                onChange={(e) => setData("contact", e.target.value)}
                className="mt-1 w-full rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                placeholder="+261..."
              />
              {errors.contact && <p className="mt-1 text-xs text-red-600">{errors.contact}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-gray-800">Email</label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                className="mt-1 w-full rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                placeholder="you@email.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              className="rounded-xl px-5 py-3 text-sm font-semibold bg-gray-100 text-gray-900 hover:bg-gray-200 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={processing}
              className="rounded-xl px-5 py-3 text-sm font-semibold bg-blue-700 text-white hover:bg-blue-800 transition disabled:opacity-60"
            >
              {processing ? "Sending..." : "Confirm booking"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}