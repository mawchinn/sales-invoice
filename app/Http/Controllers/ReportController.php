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

        return Inertia::render('Reports/Index');
    }
}
