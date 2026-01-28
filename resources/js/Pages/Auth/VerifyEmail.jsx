import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <div className="mx-auto w-full max-w-md px-4 sm:px-0">
                {/* Title */}
                <h1 className="mb-4 text-center text-2xl font-bold text-blue-700">
                    Vérification de l’email
                </h1>

                {/* Description */}
                <p className="mb-6 text-center text-sm text-gray-600">
                    Merci pour votre inscription ! Avant de continuer, veuillez
                    vérifier votre adresse email en cliquant sur le lien que
                    nous venons de vous envoyer.
                </p>

                {status === 'verification-link-sent' && (
                    <div className="mb-4 rounded-md bg-blue-100 p-3 text-sm font-medium text-blue-700 text-center">
                        Un nouveau lien de vérification a été envoyé à votre
                        adresse email.
                    </div>
                )}

                <form
                    onSubmit={submit}
                    className="rounded-xl bg-white p-6 shadow-md sm:p-8"
                >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        {/* Resend */}
                        <PrimaryButton
                            className="w-full justify-center bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 sm:w-auto"
                            disabled={processing}
                        >
                            Renvoyer l’email de vérification
                        </PrimaryButton>

                        {/* Logout */}
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="text-sm text-blue-600 underline hover:text-blue-800"
                        >
                            Se déconnecter
                        </Link>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
