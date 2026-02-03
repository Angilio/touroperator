<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/admins', [AdminController::class, 'index'])->name('admins.index');
    Route::post('/admins', [AdminController::class, 'store'])->name('admins.store');
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