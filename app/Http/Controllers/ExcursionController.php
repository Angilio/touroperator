<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Excursion;
use App\Models\ExcursionGallery;
use App\Models\Type_excursion;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Http\Requests\StoreExcursionRequest;
use App\Http\Requests\UpdateExcursionRequest;
use Illuminate\Http\RedirectResponse;

class ExcursionController extends Controller
{
    public function clientIndex()
    {
        $excursions = Excursion::with(['gallery', 'type_excursion'])->get();

        return inertia('ExcursionsIndex', [
            'excursions' => $excursions
        ]);
    }

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

    public function store(StoreExcursionRequest $request)
    {
        $validated = $request->validated();

        // 📌 Vidéo
        if ($request->hasFile('video')) {
            $validated['video'] = $request->file('video')->store('excursions/videos', 'public');
        }

        // 📌 Création excursion
        $excursion = Excursion::create($validated);

        // 📌 Images (gallery)
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $image) {
                $path = $image->store('excursions/images', 'public');

                ExcursionGallery::create([
                    'excursion_id' => $excursion->id,
                    'image_path' => $path,
                    'order' => $index + 1,
                ]);
            }
        }

        return redirect()
            ->route('excursions.index')
            ->with('success', 'Excursion ajoutée avec succès');
    }

    public function edit(Excursion $excursion)
    {
        $excursion->load('gallery');
        $types = Type_excursion::all();

        return inertia('Admin/Excursions/CreateUpdateExcursion/ExcursionForm', [
            'excursion' => [
                'id' => $excursion->id,
                'title' => $excursion->title,
                'short_description' => $excursion->short_description,
                'description' => $excursion->description,
                'price' => $excursion->price,
                'type_excursion_id' => $excursion->type_excursion_id,
                'video_url' => $excursion->video
                    ? asset('storage/' . $excursion->video)
                    : null,
                'images' => $excursion->gallery->map(fn ($img) => [
                    'id' => $img->id,
                    'url' => asset('storage/' . $img->image_path),
                ]),
            ],
            'types' => $types,
            'mode' => 'edit',
        ]);
    }

    /**
     * Mettre à jour une excursion
     */
    public function update(UpdateExcursionRequest $request, Excursion $excursion)
    {
        $validated = $request->validated();

        // 📌 Vidéo (remplacement)
        if ($request->hasFile('video')) {
            if ($excursion->video) {
                Storage::disk('public')->delete($excursion->video);
            }

            $validated['video'] = $request->file('video')->store('excursions/videos', 'public');
        }

        // 📌 Update excursion
        $excursion->update($validated);

        // 📌 Ajout nouvelles images (sans supprimer les anciennes)
        if ($request->hasFile('images')) {
            $lastOrder = $excursion->gallery()->max('order') ?? 0;

            foreach ($request->file('images') as $index => $image) {
                $path = $image->store('excursions/images', 'public');

                ExcursionGallery::create([
                    'excursion_id' => $excursion->id,
                    'image_path' => $path,
                    'order' => $lastOrder + $index + 1,
                ]);
            }
        }

        return redirect()
            ->route('excursions.index')
            ->with('success', 'Excursion modifiée avec succès');
    }

    public function destroy(Excursion $excursion): RedirectResponse
    {
        if ($excursion->video) {
            Storage::disk('public')->delete($excursion->video);
        }

        foreach ($excursion->gallery as $image) {
            \Storage::disk('public')->delete($image->image_path);
            $image->delete();
        }

        $excursion->delete();

        return redirect()
            ->route('excursions.index')
            ->with('success', 'Excursion supprimée avec succès.');
    }
}
