<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\InternalRegistrationRequest;
use App\Models\User;
use Inertia\Inertia;

class InternalRegistrationController extends Controller
{
    public function index()
    {
        return Inertia::render('Auth/Register');
    }

    public function store(InternalRegistrationRequest $request)
    {
        $user = User::create($request->validated());

        auth()->login($user);
        session()->regenerate(true);

        return redirect()->route('home');
    }
}
