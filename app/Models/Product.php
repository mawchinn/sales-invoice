<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Str;

class Product extends Model
{
    protected $fillable = [
        'sku',
        'description',
        'product_type',
        'cost',
        'stock_quantity',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($product) {
            if (empty($product->sku)) {
                $product->sku = 'PMC-' . strtoupper(Str::random(8));
                
                // Ensure uniqueness
                while (static::where('sku', $product->sku)->exists()) {
                    $product->sku = 'PMC-' . strtoupper(Str::random(8));
                }
            }
        });
    }
}
