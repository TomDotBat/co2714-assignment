<?php

use App\Http\Controllers\Auth\LoginController;
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

Route::inertia('/', "Home");
Route::get('/login/{provider}', [LoginController::class, 'redirectToProvider'])->name('login');
Route::get('/login/{provider}/callback', [LoginController::class, 'handleProviderCallback'])->name('login.callback');

Route::resource("test", \App\Http\Controllers\TestController::class);
