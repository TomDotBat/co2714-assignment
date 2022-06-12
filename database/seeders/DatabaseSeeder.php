<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Product::factory(20)->pizza()->create();
        Product::factory(10)->side()->create();
        Product::factory(10)->dessert()->create();
        Product::factory(10)->drink()->create();
    }
}
