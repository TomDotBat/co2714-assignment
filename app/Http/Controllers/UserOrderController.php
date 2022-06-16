<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Exception;

class UserOrderController extends Controller
{
    /**
     * @throws Exception
     */
    public function __invoke()
    {
        $orders = auth()->user()->orders;

        return inertia('Orders', [
            'orders' => $orders,
        ]);
    }
}
