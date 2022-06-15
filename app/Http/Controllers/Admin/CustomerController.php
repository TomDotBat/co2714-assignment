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
        if (request()->user()->id === $user->id) {
            abort(400, "You cannot delete yourself.");
        }

        $user->delete();
    }
}
