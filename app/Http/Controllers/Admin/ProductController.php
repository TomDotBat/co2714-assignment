<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Product\StoreProductRequest;
use App\Http\Requests\Admin\Product\UpdateProductRequest;
use App\Models\Product;
use Exception;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::get();

        return inertia('Admin/Products', [
            'products' => $products
        ]);
    }

    public function store(StoreProductRequest $request)
    {
        $product = Product::create($request);
        $request->file('image')
            ->storePubliclyAs('products', $product->id, ['disk' => 'public']);

        return redirect()->back();
    }

    public function update(Product $product, UpdateProductRequest $request)
    {
        $product->update($request->validated());

        if ($image = $request->file('image')) {
            $image->storePubliclyAs('products', $product->id, ['disk' => 'public']);
        }

        $this->updateProductCache();

        return redirect()->back();
    }

    public function destroy(Product $product) {
        $product->delete();
        $this->updateProductCache();
    }

    private function updateProductCache(): void
    {
        try {
            cache()->remember('products-by-type', now()->addHour(), function () {
                return Product::get()->groupBy('type');
            });
        } catch (Exception $e) {}
    }
}
