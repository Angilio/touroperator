<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Excursion;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function welcome()
    {
        $excursions = Excursion::with(['gallery', 'type_excursion'])->latest()->get();

        return inertia::render('Welcome', [
            'excursions' => $excursions
        ]);
    }

    public function apropos()
    {
        return inertia::render('Apropos');
    }

    public function contact()
    {
        return inertia::render('Contact');
    }

    public function showClient(Excursion $excursion)
    {
        $excursion->load('gallery', 'type_excursion');

        return Inertia::render('ShowExcursion', [
            'excursion' => $excursion,
        ]);
    }
}
