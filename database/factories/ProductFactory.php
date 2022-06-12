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
            'extra' => [],
            'sizes' => [],
            'allergens' => [],
        ];
    }

    public function pizza()
    {
        return $this->state(function() {
            return [
                'type' => 'pizza',
                'extra' => [
                    'toppings' => $this->randomArray('pizza', 'toppings', 1),
                ],
                'sizes' => $this->randomArray('pizza', 'sizes'),
                'allergens' => $this->randomArray('pizza', 'allergens'),
            ];
        });
    }

    public function side()
    {
        return $this->state(function() {
            return [
                'type' => 'side',
                'allergens' => $this->randomArray('side', 'allergens'),
            ];
        });
    }

    public function dessert()
    {
        return $this->state(function() {
            return [
                'type' => 'dessert',
                'allergens' => $this->randomArray('dessert', 'allergens'),
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

    protected function randomArray(string $type, $key, $min = 0): array
    {
        $data = config("products.$type.$key");
        return $this->faker->randomElements(
            $data,
            $this->faker->randomFloat(0,$min, count($data))
        );
    }
}
