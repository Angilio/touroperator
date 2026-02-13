<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\WelcomeController;

Route::get('/', [WelcomeController::class, 'welcome'])->name('welcome');
Route::get('/Apropos', [WelcomeController::class, 'apropos'])->name('apropos');
Route::get('/Contact', [WelcomeController::class, 'contact'])->name('contact');
Route::get('/excursion-client/{excursion}', [WelcomeController::class, 'showClient'])->name('excursions.showClient');

require __DIR__.'/auth.php';
require __DIR__.'/excursions.php';
require __DIR__.'/excursionTypes.php';
require __DIR__.'/admins.php';
require __DIR__.'/statistique.php';
require __DIR__.'/profile.php';
require __DIR__.'/reservations.php';
