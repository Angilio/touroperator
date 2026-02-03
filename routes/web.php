<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

require __DIR__.'/auth.php';
require __DIR__.'/excursions.php';
require __DIR__.'/excursionTypes.php';
require __DIR__.'/admins.php';
require __DIR__.'/statistique.php';
require __DIR__.'/profile.php';
