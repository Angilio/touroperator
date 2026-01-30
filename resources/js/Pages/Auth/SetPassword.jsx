import { useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function SetPassword({ userId }) {
    const { data, setData, post, processing, errors } = useForm({
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.password.update', userId));
    };

    return (
        <GuestLayout>
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <form
                    onSubmit={submit}
                    className="w-full max-w-md rounded-lg bg-white p-6 shadow"
                >
                    <h1 className="mb-6 text-lg font-semibold text-blue-800">
                        Définir votre mot de passe
                    </h1>

                    {/* Mot de passe */}
                    <div className="mb-4">
                        <InputLabel value="Mot de passe" />
                        <TextInput
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 w-full"
                            isFocused={true}
                        />
                        <InputError message={errors.password} />
                    </div>

                    {/* Confirmation du mot de passe */}
                    <div className="mb-6">
                        <InputLabel value="Confirmer le mot de passe" />
                        <TextInput
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            className="mt-1 w-full"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <button
                        disabled={processing}
                        className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        Enregistrer
                    </button>
                </form>
            </div>
        </GuestLayout>
    );
}
