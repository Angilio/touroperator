<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Excursion;
use App\Models\Type_voyage;
use App\Models\Reservation;
use Inertia\Inertia;

class ReservationController extends Controller
{
    //public
    public function create(Excursion $excursion)
    {
        return Inertia::render('Reservations', [
            'excursion' => $excursion,
            'types' => Type_voyage::all(),
        ]);
    }

    //public
    public function store(Request $request)
    {
        $request->validate([
            'nbrPersonne' => 'required|integer|min:1',
            'dateStart' => 'required|date',
            'dateEnd' => 'required|date',
            'type_voyage_id' => 'required',
            'contact' => 'required',
            'email' => 'required|email',
        ]);

        Reservation::create($request->all());

        return redirect()->back()->with('success', 'Réservation enregistrée');
    }

    //admin
    public function index()
    {
        $reservations = Reservation::with(['type_voyage', 'excursion'])->get();
        return Inertia::render('Admin/Reservations/Reservations', [
            'reservations' => $reservations
        ]);
    }
}
