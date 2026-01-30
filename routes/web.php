<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ExcursionTypeController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::post('/admins', [AdminController::class, 'store'])
    ->name('admins.store');

// Vérification email (lien signé)
Route::get('/admin/verify/{id}', [AdminController::class, 'verify'])
    ->name('admin.verify')
    ->middleware('signed');

// Définir le mot de passe
Route::get('/admin/set-password/{id}', [AdminController::class, 'passwordForm'])
    ->name('admin.password.form');

Route::post('/admin/set-password/{id}', [AdminController::class, 'updatePassword'])
    ->name('admin.password.update');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [AdminController::class, 'index'])->name('dashboard.admins');
    Route::get('/excursion-types', [ExcursionTypeController::class, 'index'])->name('excursion-types.index');
    Route::post('/excursion-types', [ExcursionTypeController::class, 'store'])->name('excursion-types.store');
    Route::put('/excursion-types/{id}', [ExcursionTypeController::class, 'update'])->name('excursion-types.update');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
