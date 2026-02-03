<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExcursionTypeController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/excursion-types', [ExcursionTypeController::class, 'index'])->name('excursion-types.index');
    Route::post('/excursion-types', [ExcursionTypeController::class, 'store'])->name('excursion-types.store');
    Route::put('/excursion-types/{id}', [ExcursionTypeController::class, 'update'])->name('excursion-types.update');
    Route::delete('/excursion-types/{id}', [ExcursionTypeController::class, 'destroy'])->name('excursion-types.destroy');
});