<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Exception;

class UserOrderController extends Controller
{
    /**
     * @throws Exception
     */
    public function __invoke()
    {
        $orders = auth()->user()->orders()->with("products")->orderBy('created_at', 'desc')->get();

        return inertia('Orders', [
            'orders' => $orders,
        ]);
    }
}
