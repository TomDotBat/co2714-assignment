<?php

namespace App\Http\Requests\Admin\Product;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->admin;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|in:pizza,side,dessert,drink',
            'price' => 'required|numeric',
            'extra' => 'required|array',
            'extra.toppings' => 'required_if:type,pizza|array',
            'sizes' => 'required|array',
            'allergens' => 'required|array',
            'image' => 'nullable|image|max:5000', // must be a image less than 5mb
        ];
    }
}