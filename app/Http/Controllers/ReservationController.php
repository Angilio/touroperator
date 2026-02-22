<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Excursion;
use App\Models\Type_voyage;
use App\Models\Reservation;
use Inertia\Inertia;

class ReservationController extends Controller
{
    //admin
    public function index()
    {
        $reservations = Reservation::with(['excursion', 'type_voyage'])->latest()->get();
        return Inertia::render('Admin/Reservations/Reservations', [
            'reservations' => $reservations
        ]);
    }

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
        $validated = $request->validate([
            'nbrPersonne' => 'required|integer|min:1',
            'fullname' => 'required|string|max:255',
            'dateStart' => 'required|date',
            'dateEnd' => 'required|date|after_or_equal:dateStart',
            'excursion_id' => 'required|exists:excursions,id',
            'type_voyage_id' => 'nullable|exists:type_voyages,id',
            'contact' => 'required|string|max:50',
            'email' => 'required|email|max:100',
        ]);

        Reservation::create($validated);

        return redirect()->route('welcome')->with('success', 'Réservation enregistrée');
    }
}
