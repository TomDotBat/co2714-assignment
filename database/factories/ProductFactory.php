<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->word,
            'description' => $this->faker->paragraph,
            'price' => $this->faker->randomFloat(2, 4, 30),
        ];
    }

    public function pizza()
    {
        return $this->state(function() {
            return [
                'type' => 'pizza',
            ];
        });
    }

    public function side()
    {
        return $this->state(function() {
            return [
                'type' => 'side',
            ];
        });
    }

    public function dessert()
    {
        return $this->state(function() {
            return [
                'type' => 'dessert',
            ];
        });
    }

    public function drink()
    {
        return $this->state(function() {
            return [
                'type' => 'drink',
            ];
        });
    }
}
