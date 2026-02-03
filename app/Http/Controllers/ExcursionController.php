<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Excursion;
use App\Models\Type_excursion;

class ExcursionController extends Controller
{
    public function index()
    {
        $excursions = Excursion::with('gallery')->get();

        return inertia('Admin/Excursions/Excursions', [
            'excursions' => $excursions
        ]);
    }

    public function create()
    {
        $types = Type_excursion::all();
        return inertia('Admin/Excursions/CreateUpdateExcursion/ExcursionForm', [
            'types' => $types
        ]);
    }
}
