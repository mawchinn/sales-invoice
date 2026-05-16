<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Marcin Pascua',
            'email' => 'pascuamarcin1101@gmail.com',
            'password' => bcrypt('marcinpascua'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        User::factory()->create([
            'name' => 'Chin Kim',
            'email' => 'chinkim@gmail.com',
            'password' => bcrypt('chinkim'),
            'role' => 'cashier',
            'email_verified_at' => now(),
        ]);

        // Seed Inventory Products
        $products = [
            ['sku' => 'IP15-PRO', 'description' => 'iPhone 15 Pro - 256GB Natural Titanium', 'product_type' => 'Phones', 'cost' => 70990.00, 'stock_quantity' => 40, 'sold' => 10, 'total_sales' => 709900.00],
            ['sku' => 'MBP-M3', 'description' => 'MacBook Pro 14" - M3 Chip 512GB Space Gray', 'product_type' => 'Laptops', 'cost' => 104990.00, 'stock_quantity' => 20, 'sold' => 5, 'total_sales' => 524950.00],
            ['sku' => 'AIRPODS-P2', 'description' => 'AirPods Pro (2nd Generation) with MagSafe', 'product_type' => 'Accessories', 'cost' => 14990.00, 'stock_quantity' => 80, 'sold' => 20, 'total_sales' => 299800.00],
            ['sku' => 'IPAD-AIR5', 'description' => 'iPad Air (5th Generation) Wi-Fi 64GB Blue', 'product_type' => 'Tablets', 'cost' => 35990.00, 'stock_quantity' => 25, 'sold' => 15, 'total_sales' => 539850.00],
            ['sku' => 'WATCH-S9', 'description' => 'Apple Watch Series 9 GPS 41mm Midnight Aluminum', 'product_type' => 'Wearables', 'cost' => 26490.00, 'stock_quantity' => 22, 'sold' => 8, 'total_sales' => 211920.00],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }

        // Seed Sample Invoices
        $invoices = [
            [
                'invoice_number' => '11792',
                'order_number' => 'PO-9929',
                'customer_name' => 'ISABELLA GARCIA',
                'address' => 'Quezon City, Philippines',
                'contact' => '09123456789',
                'tin' => '123-456-789',
                'date' => '2026-01-12',
                'due_date' => '2026-02-12',
                'status' => 'CASH',
                'sales_person' => 'LBSARINO',
                'cashier' => 'MMPONCE',
                'amount' => 245970.00,
                'balance_due' => 245970.00,
                'items' => [
                    ['sku' => 'MBP-M3', 'description' => 'MacBook Pro 14" - M3 Chip 512GB Space Gray', 'cost' => 104990.00, 'qty' => 2],
                    ['sku' => 'IPAD-AIR5', 'description' => 'iPad Air (5th Generation) Wi-Fi 64GB Blue', 'cost' => 35990.00, 'qty' => 1],
                ]
            ],
            [
                'invoice_number' => '11791',
                'order_number' => 'PO-9928',
                'customer_name' => 'ANTONIO LUNA',
                'address' => 'Manila, Philippines',
                'contact' => '09987654321',
                'tin' => '987-654-321',
                'date' => '2026-01-11',
                'due_date' => '2026-02-11',
                'status' => 'CASH',
                'sales_person' => 'LBSARINO',
                'cashier' => 'MMPONCE',
                'amount' => 490950.00,
                'balance_due' => 490950.00,
                'items' => [
                    ['sku' => 'MBP-M3', 'description' => 'MacBook Pro 14" - M3 Chip 512GB Space Gray', 'cost' => 104990.00, 'qty' => 4],
                    ['sku' => 'IP15-PRO', 'description' => 'iPhone 15 Pro - 256GB Natural Titanium', 'cost' => 70990.00, 'qty' => 1],
                ]
            ],
            [
                'invoice_number' => '11790',
                'order_number' => 'PO-9927',
                'customer_name' => 'MARIA LEONOR',
                'address' => 'Davao City, Philippines',
                'contact' => '09223334455',
                'tin' => '333-444-555',
                'date' => '2026-01-10',
                'due_date' => '2026-01-10',
                'status' => 'CASH',
                'sales_person' => 'LBSARINO',
                'cashier' => 'MMPONCE',
                'amount' => 341460.00,
                'balance_due' => 0.00,
                'items' => [
                    ['sku' => 'MBP-M3', 'description' => 'MacBook Pro 14" - M3 Chip 512GB Space Gray', 'cost' => 104990.00, 'qty' => 3],
                    ['sku' => 'WATCH-S9', 'description' => 'Apple Watch Series 9 GPS 41mm Midnight Aluminum', 'cost' => 26490.00, 'qty' => 1],
                ]
            ],
        ];

        foreach ($invoices as $invData) {
            $items = $invData['items'];
            unset($invData['items']);
            $invoice = Invoice::create($invData);
            foreach ($items as $item) {
                $item['invoice_id'] = $invoice->id;
                InvoiceItem::create($item);
            }
        }
    }
}
