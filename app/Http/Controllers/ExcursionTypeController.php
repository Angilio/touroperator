<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Type_excursion;
use Inertia\Inertia;

class ExcursionTypeController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|string|max:255|unique:excursion_types,type',
        ]);

        $type = Type_excursion::create([
            'type' => $request->type,
        ]);

        return redirect()->back()->with('success', 'Type d’excursion ajouté avec succès !');
    }

    /**
     * Modifier un type d’excursion
     */
    public function update(Request $request, $id)
    {
        $type = Type_excursion::findOrFail($id);

        $request->validate([
            'type' => 'required|string|max:255|unique:excursion_types,type,' . $type->id,
        ]);

        $type->update([
            'type' => $request->type,
        ]);

        return redirect()->back()->with('success', 'Type d’excursion mis à jour avec succès !');
    }
}
