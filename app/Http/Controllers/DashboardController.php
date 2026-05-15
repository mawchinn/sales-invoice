<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Invoice;
use App\Models\Product;
use App\Models\InvoiceItem;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(): Response|\Illuminate\Http\RedirectResponse
    {
        if (auth()->user()->role === 'cashier') {
            return redirect()->route('invoices.index');
        }

        $totalRevenue = Invoice::sum('amount');
        $totalInvoices = Invoice::count();
        $totalProducts = Product::count();
        
        // Stats for the month
        $thisMonth = now()->startOfMonth();
        $monthlyRevenue = Invoice::where('date', '>=', $thisMonth)->sum('amount');
        
        // Sales chart data (last 7 days)
        $salesData = Invoice::select(
            DB::raw('DATE(date) as date'),
            DB::raw('SUM(amount) as total')
        )
        ->where('date', '>=', now()->subDays(6))
        ->groupBy('date')
        ->orderBy('date')
        ->get();

        // Recent Invoices
        $recentInvoices = Invoice::latest()->take(5)->get();

        // Top Products (by quantity sold)
        $topProducts = InvoiceItem::select('description', DB::raw('SUM(qty) as total_sold'))
            ->groupBy('description')
            ->orderByDesc('total_sold')
            ->take(3)
            ->get();

        return Inertia::render('Dashboard', [
            'stats' => [
                'totalRevenue' => $totalRevenue,
                'totalInvoices' => $totalInvoices,
                'totalProducts' => $totalProducts,
                'monthlyRevenue' => $monthlyRevenue,
                'avgOrderValue' => $totalInvoices > 0 ? $totalRevenue / $totalInvoices : 0,
            ],
            'salesData' => $salesData,
            'recentInvoices' => $recentInvoices,
            'topProducts' => $topProducts
        ]);
    }
}
