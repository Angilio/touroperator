<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ExcursionTypeController;
use App\Http\Controllers\StatistiqueController;
use App\Http\Controllers\ExcursionController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Vérification email (lien signé)
Route::get('/admin/verify/{id}', [AdminController::class, 'verify'])
    ->name('admin.verify')
    ->middleware('signed');

// Définir le mot de passe
Route::get('/admin/set-password/{id}', [AdminController::class, 'passwordForm'])
    ->name('admin.password.form');

Route::post('/admin/set-password/{id}', [AdminController::class, 'updatePassword'])
    ->name('admin.password.update');

//Dashboard Admin
Route::middleware(['auth', 'verified'])->group(function () {
    
    Route::get('/dashboard', [StatistiqueController::class, 'index'])->name('statistique.index');

    Route::get('/admins', [AdminController::class, 'index'])->name('admins.index');
    Route::post('/admins', [AdminController::class, 'store'])->name('admins.store');

    Route::get('/excursion-types', [ExcursionTypeController::class, 'index'])->name('excursion-types.index');
    Route::post('/excursion-types', [ExcursionTypeController::class, 'store'])->name('excursion-types.store');
    Route::put('/excursion-types/{id}', [ExcursionTypeController::class, 'update'])->name('excursion-types.update');
    Route::delete('/excursion-types/{id}', [ExcursionTypeController::class, 'destroy'])->name('excursion-types.destroy');

    Route::get('/excursions', [ExcursionController::class, 'index'])->name('excursions.index');
    Route::get('/excursions/create', [ExcursionController::class, 'create'])->name('excursions.create');
    Route::post('/excursions', [ExcursionController::class, 'store'])->name('excursions.store');

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
