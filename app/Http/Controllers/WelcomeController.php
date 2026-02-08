<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Excursion;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function welcome()
    {
        $excursions = Excursion::with('gallery')->latest()->get();

        return inertia::render('Welcome', [
            'excursions' => $excursions
        ]);
    }
}
