<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\InternalLoginRequest;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class InternalLoginController extends Controller
{
    public function index()
    {
        return Inertia::render('Auth/Login');
    }

    public function store(InternalLoginRequest $request)
    {
        if (Auth::attempt($request->validated())) {
            $request->session()->regenerate(true);

            return redirect()->route('home');
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
            'password' => 'The provided credentials do not match our records.',
        ]);
    }
}
