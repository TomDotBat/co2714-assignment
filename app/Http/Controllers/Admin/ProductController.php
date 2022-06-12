<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Product\StoreProductRequest;
use App\Http\Requests\Admin\Product\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return inertia('Admin/Products');
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

        return redirect()->back();
    }
}
