<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheckoutRequest;
use App\Models\Product;
use App\Traits\UsesStripe;
use Inertia\Inertia;
use Stripe\Checkout\Session;
use Stripe\Exception\ApiErrorException;

class CheckoutController extends Controller
{
    use UsesStripe;

    /**
     * @throws ApiErrorException
     */
    public function __invoke(CheckoutRequest $request)
    {
        $productQuantities = $request->get('products');

        $lineItems = [];

        $productIds = array_map(function ($product) {
            return $product['id'];
        }, $productQuantities);
        $products = Product::whereIn('id', $productIds)->get();

        foreach ($productQuantities as $productInfo) {
            $lineItems[] = [
                'price'    => $products->where('id', $productInfo['id'])->first()->stripe_price_id,
                'quantity' => $productInfo['quantity'],
            ];
        }

        $this->setupStripe();
        $user = auth()->user();

        $session = Session::create([
            'customer_email'              => $user->email,
            'line_items'                  => $lineItems,
            'mode'                        => 'payment',
            'success_url'                 => route('home'),
            'cancel_url'                  => route('home'),
            'billing_address_collection'  => 'required',
            'shipping_address_collection' => [
                'allowed_countries' => ['GB'],
            ],
        ]);

        $order = $user->orders()->create([
            'stripe_checkout_session_id' => $session->id,
            'status' => 'AWAITING_PAYMENT',
            'total' => $session->amount_total / 100,
        ]);

        $syncProducts = [];

        $products->each(function ($product) use (&$syncProducts, $productQuantities) {
            $syncProducts[$product->id] = [
                'price' => $product->price,
                'quantity' => array_values(array_filter($productQuantities, function ($productQuantity) use ($product) {
                    return $productQuantity['id'] === $product->id;
                }))[0]['quantity']
            ];
        });

        $order->products()->sync($syncProducts);

        return Inertia::location($session->url);
    }
}
