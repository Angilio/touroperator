import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { X, AlertCircle } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function ReservationModal({ show, onClose, excursion, types = [] }) {
  const { t, i18n } = useTranslation();

  const { data, setData, post, processing, errors, reset, setError, clearErrors } =
    useForm({
      nbrPersonne: 1,
      fullname: "",
      dateStart: "",
      dateEnd: "",
      excursion_id: excursion?.id ?? "",
      type_voyage_id: "",
      contact: "",
      email: "",
    });

  // ✅ keep excursion_id synced when modal opens or excursion changes
  useEffect(() => {
    if (show) {
      setData("excursion_id", excursion?.id ?? "");
      clearErrors();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, excursion?.id]);

  // ✅ Close + reset form
  const handleClose = () => {
    reset();
    clearErrors();
    onClose();
  };

  const submit = (e) => {
    e.preventDefault();

    // UI validation (phone)
    if (data.contact && !isValidPhoneNumber(data.contact)) {
      setError("contact", t("reservationModal.invalidPhone"));
      return;
    }

    post(route("reservations.store"), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        clearErrors();
        onClose();
      },
    });
  };

  const price = Number(excursion?.price || 0).toLocaleString("fr-FR");

  return (
    <Modal show={show} onClose={handleClose} maxWidth="2xl">
      <div className="p-6 sm:p-8 relative">
        {/* Close icon */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 rounded-full p-2 text-gray-500 hover:bg-gray-100 transition"
          aria-label={t("reservationModal.close")}
        >
          <X className="h-5 w-5" />
        </button>

        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
            {t("reservationModal.title")}
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            {excursion?.title ?? t("reservationModal.excursion")} • {price} €
          </p>

          <p className="mt-3 text-sm text-gray-600">
            {t("reservationModal.subtitle")}
          </p>
        </div>

        <form onSubmit={submit} className="mt-6 space-y-4">
          {/* Hidden excursion id */}
          <input type="hidden" name="excursion_id" value={data.excursion_id} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full name */}
            <div>
              <label className="text-sm font-semibold text-gray-800">
                {t("reservationModal.fullname")}
              </label>
              <input
                value={data.fullname}
                onChange={(e) => setData("fullname", e.target.value)}
                className="mt-1 w-full rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                placeholder={t("reservationModal.fullnamePlaceholder")}
              />
              {errors.fullname && (
                <p className="mt-1 text-xs text-red-600">{errors.fullname}</p>
              )}
            </div>

            {/* People */}
            <div>
              <label className="text-sm font-semibold text-gray-800">
                {t("reservationModal.people")}
              </label>
              <input
                type="number"
                min={1}
                value={data.nbrPersonne}
                onChange={(e) => setData("nbrPersonne", e.target.value)}
                className="mt-1 w-full rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.nbrPersonne && (
                <p className="mt-1 text-xs text-red-600">{errors.nbrPersonne}</p>
              )}
            </div>

            {/* Date start */}
            <div>
              <label className="text-sm font-semibold text-gray-800">
                {t("reservationModal.dateStart")}
              </label>
              <input
                type="date"
                value={data.dateStart}
                onChange={(e) => setData("dateStart", e.target.value)}
                className="mt-1 w-full rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.dateStart && (
                <p className="mt-1 text-xs text-red-600">{errors.dateStart}</p>
              )}
            </div>

            {/* Date end */}
            <div>
              <label className="text-sm font-semibold text-gray-800">
                {t("reservationModal.dateEnd")}
              </label>
              <input
                type="date"
                value={data.dateEnd}
                onChange={(e) => setData("dateEnd", e.target.value)}
                className="mt-1 w-full rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.dateEnd && (
                <p className="mt-1 text-xs text-red-600">{errors.dateEnd}</p>
              )}
            </div>

            {/* Trip type */}
            <div className="sm:col-span-2">
              <label className="text-sm font-semibold text-gray-800">
                {t("reservationModal.tripType")}
              </label>
              <select
                value={data.type_voyage_id}
                onChange={(e) => setData("type_voyage_id", e.target.value)}
                className="mt-1 w-full rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">{t("reservationModal.select")}</option>
                {types.map((tItem) => (
                  <option key={tItem.id} value={tItem.id}>
                    {tItem.typevoyage}
                  </option>
                ))}
              </select>

              {errors.type_voyage_id && (
                <p className="mt-1 text-xs text-red-600">{errors.type_voyage_id}</p>
              )}
            </div>

            {/* Phone input */}
            <div className="sm:col-span-1">
              <label className="text-sm font-semibold text-gray-800">
                {t("reservationModal.phone")}
              </label>

              <div className="mt-1 rounded-xl border border-gray-200 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 px-3 py-2">
                <PhoneInput
                  international
                  defaultCountry="MG"
                  countryCallingCodeEditable={false}
                  value={data.contact}
                  onChange={(value) => {
                    setData("contact", value || "");
                    // remove error when user types again
                    if (errors.contact) clearErrors("contact");
                  }}
                  className="PhoneInput w-full"
                />
              </div>

              {errors.contact && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.contact}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-gray-800">
                {t("reservationModal.email")}
              </label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                className="mt-1 w-full rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                placeholder={t("reservationModal.emailPlaceholder")}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl px-6 py-3 text-sm font-semibold bg-gray-100 text-gray-900 hover:bg-gray-200 transition"
            >
              {t("reservationModal.cancel")}
            </button>

            <button
              type="submit"
              disabled={processing}
              className="rounded-xl px-6 py-3 text-sm font-semibold bg-blue-700 text-white hover:bg-blue-800 transition disabled:opacity-60"
            >
              {processing ? t("reservationModal.sending") : t("reservationModal.confirm")}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}