<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $admins = User::role('admin')
            ->select(
                'id',
                'name',
                'firstname',
                'email',
                'contact',
                'pdp',
                'nation'
            )
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'admins' => $admins,
        ]);
    }
}
