<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Excursion;

class ExcursionController extends Controller
{
    public function index()
    {
        $excursions = Excursion::with('gallery')->get();

        return inertia('Admin/Excursions/Excursions', [
            'excursions' => $excursions
        ]);
    }
}
