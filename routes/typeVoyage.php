<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TypeVoyageController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/type-voyages', [TypeVoyageController::class, 'index'])->name('type-voyages.index');
    Route::post('/type-voyages', [TypeVoyageController::class, 'store'])->name('type-voyages.store');
    Route::put('/type-voyages/{typeVoyage}', [TypeVoyageController::class, 'update'])->name('type-voyages.update');
    Route::delete('/type-voyages/{typeVoyage}', [TypeVoyageController::class, 'destroy'])->name('type-voyages.destroy');
});
