<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\WelcomeController;

Route::get('/', [WelcomeController::class, 'welcome'])->name('welcome');

require __DIR__.'/auth.php';
require __DIR__.'/excursions.php';
require __DIR__.'/excursionTypes.php';
require __DIR__.'/admins.php';
require __DIR__.'/statistique.php';
require __DIR__.'/profile.php';
require __DIR__.'/reservations.php';
