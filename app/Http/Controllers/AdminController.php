<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Mail;
use Illuminate\Auth\Events\Registered;
use App\Http\Requests\StoreAdminRequest;
use App\Http\Requests\UpdateAdminPasswordRequest;

class AdminController extends Controller
{
    public function index()
    {
        $admins = User::role('admin')
            ->select(
                'id',
                'name',
                'firstname',
                'email',
                'contact',
                'pdp',
                'nation'
            )
            ->get();

        return Inertia::render('Admin/Admin/Admin', [
            'admins' => $admins,
        ]);
    }

    public function store(StoreAdminRequest $request)
    {
        $validated = $request->validated();

        $temporaryPassword = str()->random(12);

        $user = User::create([
            'name'      => $validated['name'],
            'firstname' => $validated['firstname'],
            'contact'   => $validated['contact'],
            'nation'    => $validated['nation'],
            'email'     => $validated['email'],
            'password'  => Hash::make($temporaryPassword),
        ]);

        $user->assignRole('admin');

        // Lien de vérification signé (30 minutes)
        $verificationUrl = URL::temporarySignedRoute(
            'admin.verify',
            now()->addMinutes(30),
            ['id' => $user->id]
        );

        // 📧 Envoi email simple (à personnaliser)
        Mail::raw(
            "Bonjour {$user->firstname},

            Un compte admin a été créé pour vous dans le site TourOperator.

            Cliquez sur ce lien pour vérifier votre email et définir votre mot de passe :
            $verificationUrl

            Ce lien expire dans 30 minutes.",
            function ($message) use ($user) {
                $message->to($user->email)
                        ->subject('Vérification de votre compte admin');
            }
        );

        return back()->with('success', 'Admin créé et email envoyé.');
    }

    /**
     * Vérification email
     */
    public function verify(Request $request, $id)
    {
        $user = User::findOrFail($id);

        // Vérifier si l'email est déjà vérifié et mot de passe déjà défini
        if ($user->email_verified_at && $user->password_set) {
            return redirect()->route('login')
                ->with('error', 'Le lien a déjà été utilisé ou le mot de passe est déjà défini.');
        }

        // Vérifier la signature et l'expiration du lien
        if (! URL::hasValidSignature($request)) {
            return redirect()->route('login')
                ->with('error', 'Lien invalide ou expiré.');
        }

        // Marquer email comme vérifié
        $user->email_verified_at = now();
        $user->save();

        // Rediriger vers formulaire pour définir le mot de passe
        return redirect()->route('admin.password.form', $user->id);
    }

    /**
     * Formulaire de création du mot de passe
     */
    public function passwordForm($id)
    {
        return Inertia::render('Auth/SetPassword', [
            'userId' => $id,
        ]);
    }

    /**
     * Enregistrer le nouveau mot de passe
     */
    public function updatePassword(UpdateAdminPasswordRequest $request, $id)
    {
        $user = User::findOrFail($id);

        if ($user->password_set) {
            return redirect()->route('login')
                ->with('error', 'Le mot de passe est déjà défini.');
        }

        $user->password = Hash::make($request->password);
        $user->password_set = true;
        $user->save();

        return redirect()->route('login')->with('success', 'Mot de passe défini avec succès !');
    }
}
