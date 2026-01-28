import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mx-auto w-full max-w-md px-4 sm:px-0">
                {/* Title */}
                <h1 className="mb-4 text-center text-2xl font-bold text-blue-700">
                    Mot de passe oublié
                </h1>

                {/* Description */}
                <p className="mb-6 text-sm text-gray-600 text-center">
                    Entrez votre adresse email et nous vous enverrons un lien
                    pour réinitialiser votre mot de passe.
                </p>

                {status && (
                    <div className="mb-4 rounded-md bg-blue-100 p-3 text-sm font-medium text-blue-700">
                        {status}
                    </div>
                )}

                <form
                    onSubmit={submit}
                    className="rounded-xl bg-white p-6 shadow-md sm:p-8"
                >
                    {/* Email */}
                    <div>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="exemple@email.com"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    {/* Submit */}
                    <div className="mt-6">
                        <PrimaryButton
                            className="w-full justify-center bg-blue-600 hover:bg-blue-700 focus:bg-blue-700"
                            disabled={processing}
                        >
                            Envoyer le lien de réinitialisation
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
