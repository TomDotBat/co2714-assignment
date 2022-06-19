<?php

namespace Database\Seeders;

use App\Models\Product;
use http\Exception\RuntimeException;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Storage;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     * @throws \Exception
     */
    public function run()
    {
        //dominos doesn't like us very much
        $userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.115 Safari/537.36';

        $response = Http::withUserAgent($userAgent)->get('https://www.dominos.co.uk/ProductCatalog/GetStoreCatalog', [
            'collectionOnly' => 'false',
            'menuVersion' => '637910599800000000',
            'storeId' => '28559'
        ]);

        if (!$response->successful()) {
            throw new RuntimeException("Dominos API returned a non 200 status code.");
        }

        $json = $response->json();

        if (!isset($json)) {
            throw new RuntimeException("Dominos API returned an invalid response.");
        }

        $nameToType = []; //create product name to type LUT
        foreach (config("product-types") as $type => $data) {
            $nameToType[$data['displayName']] = $type;
        }

        Storage::disk('public')->deleteDir('products');

        foreach ($json as $category) {
            if (!array_key_exists($category['name'], $nameToType)) {
                continue; //don't create products with unknown types
            }

            $productType = $nameToType[$category['name']];

            foreach ($category['subcategories'] as $subCategory) {
                if (array_key_exists('hasCreateYourOwn', $subCategory) && $subCategory['hasCreateYourOwn']) {
                    continue; //remove the 'create your own' pizza
                }

                foreach ($subCategory['products'] as $product) {
                    $productId = Product::create([
                        'title' => $product['name'],
                        'description' => $product['description'] === '' ? null : $product['description'],
                        'type' => $productType,
                        'price' => $product['price']
                    ])->id;

                    Storage::disk('public')->put(
                        'products/' . $productId,
                        Http::withUserAgent($userAgent)->get($product['imageUrl'])->body()
                    );
                }
            }
        }

        cache()->delete('products-by-type');
    }
}
