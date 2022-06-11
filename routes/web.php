<?php

use App\Http\Controllers\Auth\ExternalLoginController;
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

Route::inertia('/', 'Home');

Route::get('/login/{provider}', [ExternalLoginController::class, 'redirectToProvider'])->name('login');
Route::get('/login/{provider}/callback', [ExternalLoginController::class, 'handleProviderCallback'])->name('login.callback');

Route::get('/logout', LogoutController::class)->name('logout');
