<?php

namespace App\Observers;

use App\Models\Product;
use App\Traits\UsesStripe;
use Exception;
use Psr\SimpleCache\InvalidArgumentException;
use Stripe\Exception\ApiErrorException;
use Stripe\Price;

class ProductObserver
{
    use UsesStripe;

    /**
     * @throws ApiErrorException
     */
    public function created(Product $product): void
    {
        $this->updateProductCache();
        $this->setupStripe();

        $stripeProduct = \Stripe\Product::create([
            'name' => $product->title,
            'description' => $product->description,
            'default_price_data' => ['unit_amount' => (int)($product->price * 100), 'currency' => 'gbp'],
            'expand' => ['default_price'],
        ]);

        $product->stripe_product_id = $stripeProduct->id;
        $product->stripe_price_id = $stripeProduct->default_price->id;
        $product->saveQuietly(); // we don't want to trigger the updated event, so we save quietly
    }

    public function updated(Product $product): void
    {
        $this->updateProductCache();
        $this->setupStripe();

        $price = Price::create([
            'product' => $product->stripe_product_id,
            'unit_amount' => (int)($product->price * 100),
            'currency' => 'gbp',
        ]);

        \Stripe\Product::update($product->stripe_product_id, [
            'name' => $product->title,
            'description' => $product->description,
            'default_price' => $price->id,
        ]);

        Price::update($product->stripe_price_id, [
            'active' => false,
        ]);

        $product->updateQuietly([
            'stripe_price_id' => $price->id,
        ]);
    }

    public function deleted(): void
    {
        $this->updateProductCache();
    }

    private function updateProductCache(): void
    {
        try {
            cache()->delete('products-by-type');
            cache()->remember('products-by-type', now()->addHour(), function () {
                return Product::get()->groupBy('type');
            });
        } catch (InvalidArgumentException|Exception $e) {
        }
    }
}
