import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="mx-auto w-full max-w-md px-4 sm:px-0">
                {/* Title */}
                <h1 className="mb-6 text-center text-2xl font-bold text-blue-700">
                    Connexion
                </h1>

                {/* Flash success */}
                {flash?.success && (
                    <div className="mb-4 rounded-md border border-green-400 bg-green-100 p-3 text-sm text-green-800">
                        {flash.success}
                    </div>
                )}

                {/* Flash error */}
                {flash?.error && (
                    <div className="mb-4 rounded-md border border-red-400 bg-red-100 p-3 text-sm text-red-800">
                        {flash.error}
                    </div>
                )}

                {status && (
                    <div className="mb-4 rounded-md bg-blue-100 p-3 text-sm text-blue-700">
                        {status}
                    </div>
                )}

                <form
                    onSubmit={submit}
                    className="rounded-xl bg-white p-6 shadow-md sm:p-8"
                >
                    {/* Email */}
                    <div>
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    {/* Password */}
                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Mot de passe" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    {/* Remember me */}
                    <div className="mt-4 flex items-center justify-between">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                            />
                            <span className="ms-2 text-sm text-gray-600">
                                Se souvenir de moi
                            </span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm text-blue-600 hover:text-blue-800 underline"
                            >
                                Mot de passe oublié ?
                            </Link>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="mt-6">
                        <PrimaryButton
                            className="w-full justify-center bg-blue-600 hover:bg-blue-700 focus:bg-blue-700"
                            disabled={processing}
                        >
                            Se connecter
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
