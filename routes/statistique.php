<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StatistiqueController;

//Dashboard Admin
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [StatistiqueController::class, 'index'])->name('statistique.index');
});