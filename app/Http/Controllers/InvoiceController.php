<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Invoice;
use App\Models\Product;
use App\Models\InvoiceItem;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;

class InvoiceController extends Controller
{
    public function index(): Response
    {
        $invoices = Invoice::with('items')->orderByRaw('CAST(invoice_number AS UNSIGNED) DESC')->get();
        $products = Product::all();
        
        // Find the latest numeric invoice number to increment
        $latestNumericInvoice = Invoice::whereRaw('invoice_number REGEXP "^[0-9]+$"')
            ->orderByRaw('CAST(invoice_number AS UNSIGNED) DESC')
            ->first();
        
        $nextInvoiceNumber = $latestNumericInvoice ? (int)$latestNumericInvoice->invoice_number + 1 : 10001;
        
        // Find the latest PO order number to increment
        $latestPO = Invoice::where('order_number', 'LIKE', 'PO-%')
            ->orderByRaw('CAST(SUBSTRING(order_number, 4) AS UNSIGNED) DESC')
            ->first();
            
        $nextOrderNumber = 'PO-0001';
        if ($latestPO) {
            $lastNum = (int)str_replace('PO-', '', $latestPO->order_number);
            $nextOrderNumber = 'PO-' . str_pad($lastNum + 1, 4, '0', STR_PAD_LEFT);
        }
        
        return Inertia::render('Invoices/Index', [
            'invoices' => $invoices,
            'products' => $products,
            'nextInvoiceNumber' => (string)$nextInvoiceNumber,
            'nextOrderNumber' => $nextOrderNumber
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'invoice_number' => 'required|string|unique:invoices,invoice_number',
            'order_number' => 'nullable|string',
            'customer_name' => 'required|string',
            'address' => 'nullable|string',
            'contact' => 'nullable|string',
            'tin' => 'nullable|string',
            'date' => 'required|date',
            'due_date' => 'nullable|date',
            'status' => 'required|string',
            'sales_person' => 'nullable|string',
            'cashier' => 'nullable|string',
            'amount' => 'required|numeric',
            'balance_due' => 'required|numeric',
            'items' => 'required|array|min:1',
            'items.*.sku' => 'required|string',
            'items.*.description' => 'required|string',
            'items.*.cost' => 'required|numeric',
            'items.*.qty' => 'required|integer|min:1',
        ]);

        DB::transaction(function () use ($validated) {
            $invoice = Invoice::create(collect($validated)->except('items')->toArray());
            
            foreach ($validated['items'] as $item) {
                $invoice->items()->create($item);
                
                $product = Product::where('sku', $item['sku'])->first();
                if ($product) {
                    $product->stock_quantity -= $item['qty'];
                    $product->sold += $item['qty'];
                    $product->total_sales += ($item['qty'] * $item['cost']);
                    $product->save();
                }
            }
        });

        return redirect()->back();
    }

    public function update(Request $request, Invoice $invoice)
    {
        $validated = $request->validate([
            'invoice_number' => 'required|string|unique:invoices,invoice_number,' . $invoice->id,
            'order_number' => 'nullable|string',
            'customer_name' => 'required|string',
            'address' => 'nullable|string',
            'contact' => 'nullable|string',
            'tin' => 'nullable|string',
            'date' => 'required|date',
            'due_date' => 'nullable|date',
            'status' => 'required|string',
            'sales_person' => 'nullable|string',
            'cashier' => 'nullable|string',
            'amount' => 'required|numeric',
            'balance_due' => 'required|numeric',
            'items' => 'required|array|min:1',
            'items.*.sku' => 'required|string',
            'items.*.description' => 'required|string',
            'items.*.cost' => 'required|numeric',
            'items.*.qty' => 'required|integer|min:1',
        ]);

        DB::transaction(function () use ($validated, $invoice) {
            $invoice->update(collect($validated)->except('items')->toArray());
            
            // Revert existing items
            foreach ($invoice->items as $oldItem) {
                $product = Product::where('sku', $oldItem->sku)->first();
                if ($product) {
                    $product->stock_quantity += $oldItem->qty;
                    $product->sold -= $oldItem->qty;
                    $product->total_sales -= ($oldItem->qty * $oldItem->cost);
                    $product->save();
                }
            }
            
            // Delete existing items and recreate
            $invoice->items()->delete();
            
            foreach ($validated['items'] as $item) {
                $invoice->items()->create($item);
                
                $product = Product::where('sku', $item['sku'])->first();
                if ($product) {
                    $product->stock_quantity -= $item['qty'];
                    $product->sold += $item['qty'];
                    $product->total_sales += ($item['qty'] * $item['cost']);
                    $product->save();
                }
            }
        });

        return redirect()->back();
    }

    public function destroy(Invoice $invoice)
    {
        DB::transaction(function () use ($invoice) {
            foreach ($invoice->items as $oldItem) {
                $product = Product::where('sku', $oldItem->sku)->first();
                if ($product) {
                    $product->stock_quantity += $oldItem->qty;
                    $product->sold -= $oldItem->qty;
                    $product->total_sales -= ($oldItem->qty * $oldItem->cost);
                    $product->save();
                }
            }
            $invoice->items()->delete();
            $invoice->delete();
        });
        
        return redirect()->back();
    }
}
