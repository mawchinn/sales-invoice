<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function index(): Response|\Illuminate\Http\RedirectResponse
    {
        if (auth()->user()->role === 'cashier') {
            return redirect()->route('invoices.index');
        }

        // 1. Sales Summary
        $salesSummaryData = \App\Models\Invoice::orderBy('date', 'desc')->get()->map(function($invoice) {
            return [
                'id' => $invoice->id,
                'col1' => $invoice->date,
                'col2' => $invoice->invoice_number,
                'col3' => $invoice->customer_name,
                'col4' => (float) $invoice->amount,
            ];
        })->values()->all();

        // 2. Inventory Valuation
        $inventoryData = \App\Models\Product::all()->map(function($product) {
            return [
                'id' => $product->id,
                'col1' => $product->description, // Or product_name if it exists
                'col2' => $product->sku,
                'col3' => $product->stock_quantity,
                'col4' => (float) $product->cost,
                'col5' => (float) ($product->stock_quantity * $product->cost),
            ];
        })->values()->all();


        // 4. Tax Summary
        // Group paid or all invoices by month. Assuming all invoices are recorded.
        // VAT is 12% of the net amount, so Gross = Net + VAT = Net * 1.12.
        // Taxable Amount = Gross / 1.12
        // VAT = Gross - Taxable Amount
        $taxData = collect();
        $invoicesByMonth = \App\Models\Invoice::all()->groupBy(function($d) {
            return \Carbon\Carbon::parse($d->date)->format('F Y');
        });
        
        $taxId = 1;
        foreach ($invoicesByMonth as $monthEnd => $invoices) {
            $gross = $invoices->sum('amount');
            $taxable = $gross / 1.12;
            $vat = $gross - $taxable;
            
            $taxData->push([
                'id' => $taxId++,
                'col1' => $monthEnd,
                'col2' => (float) $gross,
                'col3' => (float) $taxable,
                'col4' => (float) $vat,
                'col5' => (float) $taxable, // Net amount is the taxable amount
            ]);
        }
        $taxData = $taxData->sortByDesc('col1')->values()->all();

        $reportsData = [
            'Sales Summary' => [
                'headers' => ['Date', 'Invoice', 'Customer', 'Amount'],
                'data' => $salesSummaryData,
            ],
            'Inventory Valuation' => [
                'headers' => ['Product Name', 'SKU', 'In Stock', 'Unit Cost', 'Total Value'],
                'data' => $inventoryData,
            ],

            'Tax Summary' => [
                'headers' => ['Tax Period', 'Gross Sales', 'Taxable Amount', 'VAT (12%)', 'Net Amount'],
                'data' => $taxData,
            ]
        ];

        return Inertia::render('Reports/Index', [
            'serverReportsData' => $reportsData
        ]);
    }
}
