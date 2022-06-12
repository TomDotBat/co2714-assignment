<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Exception;

class HomeController extends Controller
{
    /**
     * @throws Exception
     */
    public function __invoke()
    {
        $products = cache()->remember('products-by-type', now()->addHour(), function() {
            return Product::get()->groupBy('type');
        });

        return inertia('Home', [
            'products' => $products,
        ]);
    }
}
