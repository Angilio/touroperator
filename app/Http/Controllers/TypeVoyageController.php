<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TypeVoyage;
use Inertia\Inertia;

class TypeVoyageController extends Controller
{
    public function index()
    {
        $typeVoyages = TypeVoyage::all();
        return Inertia::render('Admin/TypeVoyages/TypeVoyages', [
            'typeVoyages' => $typeVoyages
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'typevoyage' => 'required|string|max:255',
        ]);

        TypeVoyage::create([
            'typevoyage' => $request->typevoyage,
        ]);

        return redirect()->route('type-voyages.index')->with('success', 'Type de voyage ajouté');
    }

    public function update(Request $request, TypeVoyage $typeVoyage)
    {
        $request->validate([
            'typevoyage' => 'required|string|max:255',
        ]);

        $typeVoyage->update([
            'typevoyage' => $request->typevoyage,
        ]);

        return redirect()->route('type-voyages.index')->with('success', 'Type de voyage modifié');
    }

    public function destroy(TypeVoyage $typeVoyage)
    {
        $typeVoyage->delete();

        return redirect()->route('type-voyages.index')->with('success', 'Type de voyage supprimé');
    }
}
