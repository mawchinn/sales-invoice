<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

use App\Http\Controllers\DashboardController;

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth'])->name('dashboard');

use App\Http\Controllers\InvoiceController;

Route::get('/invoices', [InvoiceController::class, 'index'])->middleware(['auth'])->name('invoices.index');
Route::post('/invoices', [InvoiceController::class, 'store'])->middleware(['auth'])->name('invoices.store');
Route::patch('/invoices/{invoice}', [InvoiceController::class, 'update'])->middleware(['auth'])->name('invoices.update');
Route::delete('/invoices/{invoice}', [InvoiceController::class, 'destroy'])->middleware(['auth'])->name('invoices.destroy');
use App\Http\Controllers\ProductController;

Route::get('/inventory', [ProductController::class, 'index'])->middleware(['auth'])->name('inventory.index');
Route::post('/inventory', [ProductController::class, 'store'])->middleware(['auth'])->name('inventory.store');
Route::patch('/inventory/{product}', [ProductController::class, 'update'])->middleware(['auth'])->name('inventory.update');
Route::delete('/inventory/{product}', [ProductController::class, 'destroy'])->middleware(['auth'])->name('inventory.destroy');
use App\Http\Controllers\ReportController;

Route::get('/reports', [ReportController::class, 'index'])->middleware(['auth'])->name('reports.index');
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

Route::get('/invoice', function () {
    return Inertia::render('Invoice');
});
