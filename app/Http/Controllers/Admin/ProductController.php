<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Product\StoreProductRequest;
use App\Http\Requests\Admin\Product\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::get();

        return inertia('Admin/Products', [
            'products' => $products
        ]);
    }

    public function store(StoreProductRequest $request): RedirectResponse
    {
        $product = Product::create($request->validated());

        if ($request->hasFile('image')) {
            $request->file('image')
                ->storePubliclyAs('products', $product->id, ['disk' => 'public']);
        }

        return redirect()->back();
    }

    public function update(Product $product, UpdateProductRequest $request): RedirectResponse
    {
        $product->update($request->validated());

        if ($image = $request->file('image')) {
            $image->storePubliclyAs('products', $product->id, ['disk' => 'public']);
        }

        return redirect()->back();
    }

    public function destroy(Product $product): void
    {
        $product->delete();
    }
}
