<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = User::get();

        return inertia('Admin/Customers', [
            'customers' => $customers
        ]);
    }


    public function destroy(User $user): void
    {
        $user->delete();
    }
}
