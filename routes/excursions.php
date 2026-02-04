<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExcursionController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/excursions', [ExcursionController::class, 'index'])->name('excursions.index');
    Route::get('/excursions/create', [ExcursionController::class, 'create'])->name('excursions.create');
    Route::post('/excursions', [ExcursionController::class, 'store'])->name('excursions.store');
    Route::get('/excursions/{excursion}', [ExcursionController::class, 'show'])->name('excursions.show');
    Route::get('/excursions/{excursion}/edit', [ExcursionController::class, 'edit'])->name('excursions.edit');
    Route::post('/excursions/{excursion}', [ExcursionController::class, 'update'])->name('excursions.update');
    Route::delete('/excursions/{excursion}', [ExcursionController::class, 'destroy'])->name('excursions.destroy');
});