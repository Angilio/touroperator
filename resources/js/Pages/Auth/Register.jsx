import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        firstname: '',
        contact: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="mx-auto w-full max-w-3xl px-4 sm:px-0">
                <h1 className="mb-6 text-center text-2xl font-bold text-blue-700">
                    Créer un compte
                </h1>

                <form
                    onSubmit={submit}
                    className="rounded-xl bg-white p-6 shadow-md sm:p-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6"
                >
                    {/* Nom */}
                    <div>
                        <InputLabel htmlFor="name" value="Nom" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    {/* Prénom */}
                    <div>
                        <InputLabel htmlFor="firstname" value="Prénom" />
                        <TextInput
                            id="firstname"
                            name="firstname"
                            value={data.firstname}
                            className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            onChange={(e) =>
                                setData('firstname', e.target.value)
                            }
                            required
                        />
                        <InputError message={errors.firstname} className="mt-2" />
                    </div>

                    {/* Contact */}
                    <div>
                        <InputLabel htmlFor="contact" value="Téléphone" />
                        <TextInput
                            id="contact"
                            name="contact"
                            type="tel"
                            value={data.contact}
                            className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            onChange={(e) =>
                                setData('contact', e.target.value)
                            }
                            required
                        />
                        <InputError message={errors.contact} className="mt-2" />
                    </div>

                    {/* Email */}
                    <div>
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    {/* Mot de passe */}
                    <div>
                        <InputLabel htmlFor="password" value="Mot de passe" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            required
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    {/* Confirmation */}
                    <div>
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirmer le mot de passe"
                        />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            onChange={(e) =>
                                setData(
                                    'password_confirmation',
                                    e.target.value
                                )
                            }
                            required
                        />
                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>

                    {/* Actions */}
                    <div className="sm:col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mt-4">
                        <Link
                            href={route('login')}
                            className="text-sm text-blue-600 underline hover:text-blue-800 text-center sm:text-left"
                        >
                            Déjà un compte ?
                        </Link>

                        <PrimaryButton
                            className="w-full justify-center bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 sm:w-auto"
                            disabled={processing}
                        >
                            S’inscrire
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
