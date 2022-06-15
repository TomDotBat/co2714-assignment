<?php

use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Auth\ExternalLoginController;
use App\Http\Controllers\Auth\InternalLoginController;
use App\Http\Controllers\Auth\InternalRegistrationController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\HomeController;
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

Route::get('', HomeController::class)
    ->name('home');

Route::middleware('guest')->group(function () {
    Route::resource('/register', InternalRegistrationController::class)
        ->only(['index', 'store'])
        ->name('index', 'register');
    Route::resource('/login', InternalLoginController::class)
        ->only(['index', 'store'])
        ->name('index', 'login');

    Route::get('/login/{provider}', [ExternalLoginController::class, 'redirectToProvider'])
        ->name('login.external');
    Route::get('/login/{provider}/callback', [ExternalLoginController::class, 'handleProviderCallback'])
        ->name('login.external.callback');
});

Route::middleware('auth')->group(function () {
    Route::get('/logout', LogoutController::class)
        ->name('logout');

    Route::middleware('admin')->group(function () {
        Route::inertia('/admin', 'Admin')
            ->name('admin');
        Route::inertia('/admin/customers', 'Admin/Customers')
            ->name('customers');
        Route::inertia('/admin/orders', 'Admin/Orders')
            ->name('orders');
        Route::resource('/admin/products', ProductController::class)
            ->only('index', 'store', 'update', 'destroy')
            ->name('index', 'admin.products');
    });
});
