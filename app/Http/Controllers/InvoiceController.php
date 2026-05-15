<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Invoice;
use Inertia\Inertia;
use Inertia\Response;

class InvoiceController extends Controller
{
    public function index(): Response
    {
        $invoices = Invoice::with('items')->latest()->get();
        
        return Inertia::render('Invoices/Index', [
            'invoices' => $invoices
        ]);
    }
}
