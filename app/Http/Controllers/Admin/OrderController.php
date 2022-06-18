<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Order\UpdateOrderRequest;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(["products", "user"])->get();

        return inertia('Admin/Orders', [
            'orders' => $orders
        ]);
    }

    public function update(Order $order, UpdateOrderRequest $request): RedirectResponse
    {
        if (!in_array($request->status, config('orders.statuses'), true)) {
            abort(400, "Invalid order status.");
        }

        $order->update($request->validated());

        return redirect()->back();
    }

    public function destroy(Order $order): void
    {
        $order->delete();
    }
}
