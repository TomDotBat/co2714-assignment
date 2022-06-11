<?php

use App\Http\Controllers\Auth\ExternalLoginController;
use App\Http\Controllers\Auth\InternalLoginController;
use App\Http\Controllers\Auth\InternalRegistrationController;
use App\Http\Controllers\Auth\LogoutController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::inertia('/', 'Home')->name('home');

Route::middleware('guest')->group(function() {
    Route::resource('/register', InternalRegistrationController::class)->only(['index', 'store']);
    Route::resource('/login', InternalLoginController::class)->only(['index', 'store']);

    Route::get('/login/{provider}', [ExternalLoginController::class, 'redirectToProvider'])->name('login.external');
    Route::get('/login/{provider}/callback', [ExternalLoginController::class, 'handleProviderCallback'])->name('login.external.callback');
});

Route::middleware('auth')->group(function() {
    Route::get('/logout', LogoutController::class)->name('logout');
});
