<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VilleExcursion;
use Inertia\Inertia;
use App\Http\Requests\StoreVilleExcursionRequest;
use App\Http\Requests\UpdateVilleExcursionRequest;

class VilleExcursionController extends Controller
{
    public function index()
    {
        $villes = VilleExcursion::all();
        return inertia('Admin/VilleExcursion/VilleExcursion', [
            'villes' => $villes,
        ]);
    }

    public function store(StoreVilleExcursionRequest $request)
    {
        VilleExcursion::create([
            'ville' => $request->ville,
        ]);

        return redirect()->back()
            ->with('success', 'Ville d’excursion ajoutée avec succès !');
    }

    public function update(UpdateVilleExcursionRequest $request, $id)
    {
        $type = VilleExcursion::findOrFail($id);

        $type->update([
            'ville' => $request->ville,
        ]);

        return redirect()->back()
            ->with('success', 'Ville d’excursion mis à jour avec succès !');
    }

    public function destroy($id)
    {
        $type = VilleExcursion::findOrFail($id);
        $type->delete();

        return redirect()->back()
            ->with('success', 'Ville d’excursion supprimée avec succès !');
    }
}
