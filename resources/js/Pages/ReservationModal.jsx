import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { X } from "lucide-react";

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

  // ✅ Close + reset form
  const handleClose = () => {
    reset();
    onClose();
  };

  const submit = (e) => {
    e.preventDefault();

    if (data.contact && !isValidPhoneNumber(data.contact)) {
      alert("Please enter a valid phone number.");
      return;
    }

    post(route("reservations.store"), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <Modal show={show} onClose={handleClose} maxWidth="2xl">
      <div className="p-6 sm:p-8 relative">
        
        {/* ✅ Close icon (lucide) */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 rounded-full p-2 text-gray-500 hover:bg-gray-100 transition"
        >
          <X className="h-5 w-5" />
        </button>

        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
            Book this excursion
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            {excursion?.title} • {Number(excursion?.price || 0).toLocaleString("fr-FR")} €
          </p>
        </div>

        <form onSubmit={submit} className="mt-6 space-y-4">
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
              <label className="text-sm font-semibold text-gray-800">
                Trip type (optional)
              </label>
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
            </div>

            {/* Phone input with country */}
            <div className="sm:col-span-1">
              <label className="text-sm font-semibold text-gray-800">
                Phone / WhatsApp
              </label>

              <div className="mt-1 rounded-xl border border-gray-200 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 px-3 py-2">
                <PhoneInput
                  international
                  defaultCountry="MG"
                  countryCallingCodeEditable={false}
                  value={data.contact}
                  onChange={(value) => setData("contact", value || "")}
                  className="PhoneInput w-full"
                />
              </div>

              {errors.contact && (
                <p className="mt-1 text-xs text-red-600">{errors.contact}</p>
              )}
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
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={processing}
              className="rounded-xl px-6 py-3 text-sm font-semibold bg-blue-700 text-white hover:bg-blue-800 transition disabled:opacity-60"
            >
              {processing ? "Sending..." : "Confirm booking"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}