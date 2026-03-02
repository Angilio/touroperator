<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VilleExcursionController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/ville-excursions', [VilleExcursionController::class, 'index'])->name('ville-excursions.index');
    Route::post('/ville-excursions', [VilleExcursionController::class, 'store'])->name('ville-excursions.store');
    Route::put('/ville-excursions/{id}', [VilleExcursionController::class, 'update'])->name('ville-excursions.update');
    Route::delete('/ville-excursions/{id}', [VilleExcursionController::class, 'destroy'])->name('ville-excursions.destroy');
});