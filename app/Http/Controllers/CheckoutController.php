<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheckoutRequest;
use App\Models\Product;
use App\Traits\UsesStripe;
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
        $products = $request->get('products');

        $lineItems = [];
        foreach($products as $productInfo) {
            $product = Product::findOrFail($productInfo['id']);

            $lineItems[] = [
                'price'=> $product->stripe_price_id,
                'quantity' => $productInfo['quantity']
            ];
        }

        $this->setupStripe();
        Session::create([
            'line_items' => $lineItems,
            'mode' => 'payment',
            'success_url' => route('home'),
            'cancel_url' => route('home'),
        ]);
    }
}
