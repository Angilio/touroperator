import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <div className="mx-auto w-full max-w-md px-4 sm:px-0">
                {/* Title */}
                <h1 className="mb-4 text-center text-2xl font-bold text-blue-700">
                    Confirmation du mot de passe
                </h1>

                {/* Description */}
                <p className="mb-6 text-center text-sm text-gray-600">
                    Cette zone est sécurisée. Veuillez confirmer votre mot de
                    passe pour continuer.
                </p>

                <form
                    onSubmit={submit}
                    className="rounded-xl bg-white p-6 shadow-md sm:p-8"
                >
                    {/* Password */}
                    <div>
                        <InputLabel htmlFor="password" value="Mot de passe" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            isFocused={true}
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    {/* Submit */}
                    <div className="mt-6">
                        <PrimaryButton
                            className="w-full justify-center bg-blue-600 hover:bg-blue-700 focus:bg-blue-700"
                            disabled={processing}
                        >
                            Confirmer
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
