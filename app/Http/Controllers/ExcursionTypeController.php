<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Type_excursion;
use Inertia\Inertia;
use App\Http\Requests\StoreExcursionTypeRequest;
use App\Http\Requests\UpdateExcursionTypeRequest;

class ExcursionTypeController extends Controller
{
    public function index()
    {
        $types = Type_excursion::all();
        return inertia('Admin/ExcursionType/ExcursionType', [
            'types' => $types,
        ]);
    }

    public function store(StoreExcursionTypeRequest $request)
    {
        Type_excursion::create([
            'type' => $request->type,
        ]);

        return redirect()->back()
            ->with('success', 'Type d’excursion ajouté avec succès !');
    }

    public function update(UpdateExcursionTypeRequest $request, $id)
    {
        $type = Type_excursion::findOrFail($id);

        $type->update([
            'type' => $request->type,
        ]);

        return redirect()->back()
            ->with('success', 'Type d’excursion mis à jour avec succès !');
    }

    public function destroy($id)
    {
        $type = Type_excursion::findOrFail($id);
        $type->delete();

        return redirect()->back()
            ->with('success', 'Type d’excursion supprimé avec succès !');
    }
}
