<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::get();

        return inertia('Admin/Orders', [
            'orders' => $orders
        ]);
    }
}
