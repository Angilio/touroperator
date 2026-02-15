<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Type_voyage;
use Inertia\Inertia;

class TypeVoyageController extends Controller
{
    public function index()
    {
        $typeVoyages = Type_voyage::all();
        return Inertia::render('Admin/TypeVoyages/TypeVoyages', [
            'typeVoyages' => $typeVoyages
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'typevoyage' => 'required|string|max:255',
        ]);

        Type_voyage::create([
            'typevoyage' => $request->typevoyage,
        ]);

        return redirect()->route('type-voyages.index')->with('success', 'Type de voyage ajouté');
    }

    public function update(Request $request, Type_voyage $typeVoyage)
    {
        $request->validate([
            'typevoyage' => 'required|string|max:255',
        ]);

        $typeVoyage->update([
            'typevoyage' => $request->typevoyage,
        ]);

        return redirect()->route('type-voyages.index')->with('success', 'Type de voyage modifié');
    }

    public function destroy(Type_voyage $typeVoyage)
    {
        $typeVoyage->delete();

        return redirect()->route('type-voyages.index')->with('success', 'Type de voyage supprimé');
    }
}
