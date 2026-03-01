import { useForm, Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { ArrowLeft, Calendar, Mail, Phone, Users, Tag } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Reservations({ excursion, types = [] }) {
  const { t } = useTranslation();

  const { data, setData, post, processing, errors } = useForm({
    fullname: "",
    nbrPersonne: "",
    dateStart: "",
    dateEnd: "",
    excursion_id: excursion?.id ?? "",
    type_voyage_id: "",
    contact: "",
    email: "",
  });

  function submit(e) {
    e.preventDefault();
    post(route("reservations.store"));
  }

  return (
    <GuestLayout>
      <Head title={t("reservation.title")} />

      {/* Wrapper */}
      <div className="bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          {/* Card */}
          <div className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            {/* Header */}
            <div className="p-6 sm:p-8 border-b border-gray-100">
              <div className="flex items-start justify-between gap-4">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-200 transition"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {t("reservation.back")}
                </button>

                <div className="text-right">
                  <p className="text-xs font-semibold text-gray-500">
                    {t("reservation.for")}
                  </p>
                  <h1 className="text-lg sm:text-2xl font-extrabold text-blue-950">
                    {excursion?.title ?? t("reservation.excursionFallback")}
                  </h1>
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-600">
                {t("reservation.subtitle")}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={submit} className="p-6 sm:p-8">
              {/* Hidden */}
              <input type="hidden" value={data.excursion_id} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full name */}
                <div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <InputLabel value={t("reservation.fullname")} />
                  </div>

                  <TextInput
                    type="text"
                    value={data.fullname}
                    onChange={(e) => setData("fullname", e.target.value)}
                    className="mt-1 block w-full rounded-xl"
                    placeholder={t("reservation.fullnamePlaceholder")}
                  />
                  <InputError message={errors.fullname} className="mt-2" />
                </div>

                {/* Email */}
                <div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <InputLabel value={t("reservation.email")} />
                  </div>

                  <TextInput
                    type="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    className="mt-1 block w-full rounded-xl"
                    placeholder={t("reservation.emailPlaceholder")}
                  />
                  <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Number of people */}
                <div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <InputLabel value={t("reservation.people")} />
                  </div>

                  <TextInput
                    type="number"
                    min="1"
                    value={data.nbrPersonne}
                    onChange={(e) => setData("nbrPersonne", e.target.value)}
                    className="mt-1 block w-full rounded-xl"
                    placeholder="1"
                  />
                  <InputError message={errors.nbrPersonne} className="mt-2" />
                </div>

                {/* Trip type */}
                <div>
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-gray-500" />
                    <InputLabel value={t("reservation.tripType")} />
                  </div>

                  <select
                    value={data.type_voyage_id}
                    onChange={(e) => setData("type_voyage_id", e.target.value)}
                    className="mt-1 block w-full rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">{t("reservation.choose")}</option>
                    {types.map((tItem) => (
                      <option key={tItem.id} value={tItem.id}>
                        {tItem.typevoyage}
                      </option>
                    ))}
                  </select>
                  <InputError message={errors.type_voyage_id} className="mt-2" />
                </div>

                {/* Start date */}
                <div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <InputLabel value={t("reservation.dateStart")} />
                  </div>

                  <TextInput
                    type="date"
                    value={data.dateStart}
                    onChange={(e) => setData("dateStart", e.target.value)}
                    className="mt-1 block w-full rounded-xl"
                  />
                  <InputError message={errors.dateStart} className="mt-2" />
                </div>

                {/* End date */}
                <div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <InputLabel value={t("reservation.dateEnd")} />
                  </div>

                  <TextInput
                    type="date"
                    value={data.dateEnd}
                    onChange={(e) => setData("dateEnd", e.target.value)}
                    className="mt-1 block w-full rounded-xl"
                  />
                  <InputError message={errors.dateEnd} className="mt-2" />
                </div>

                {/* Contact */}
                <div className="md:col-span-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <InputLabel value={t("reservation.contact")} />
                  </div>

                  <TextInput
                    type="text"
                    value={data.contact}
                    onChange={(e) => setData("contact", e.target.value)}
                    className="mt-1 block w-full rounded-xl"
                    placeholder={t("reservation.contactPlaceholder")}
                  />
                  <InputError message={errors.contact} className="mt-2" />
                </div>

                {/* Submit */}
                <div className="md:col-span-2 pt-2">
                  <button
                    disabled={processing}
                    className="w-full rounded-xl bg-green-600 hover:bg-green-700 text-white py-3 font-bold transition disabled:opacity-60"
                  >
                    {processing
                      ? t("reservation.sending")
                      : t("reservation.submit")}
                  </button>
                </div>
              </div>
            </form>

            {/* Footer hint */}
            <div className="border-t border-gray-100 bg-gray-50 px-6 sm:px-8 py-4">
              <p className="text-xs text-gray-600">
                {t("reservation.note")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}