<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response|\Illuminate\Http\RedirectResponse
    {
        if (auth()->user()->role === 'cashier') {
            return redirect()->route('invoices.index');
        }

        $products = Product::latest()->get();
        
        return Inertia::render('Inventory/Index', [
            'products' => $products
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'sku' => 'required|string|unique:products,sku',
            'description' => 'required|string',
            'product_type' => 'required|string',
            'cost' => 'required|numeric',
            'stock_quantity' => 'required|integer',
        ]);

        Product::create($validated);

        return redirect()->back();
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'sku' => 'required|string|unique:products,sku,' . $product->id,
            'description' => 'required|string',
            'product_type' => 'required|string',
            'cost' => 'required|numeric',
            'stock_quantity' => 'required|integer',
        ]);

        $product->update($validated);

        return redirect()->back();
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->back();
    }
}
