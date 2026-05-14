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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/invoices', function () {
    return Inertia::render('Invoices/Index');
})->middleware(['auth', 'verified'])->name('invoices.index');
Route::get('/inventory', function () {
    return Inertia::render('Inventory/Index');
})->middleware(['auth', 'verified'])->name('inventory.index');
Route::get('/reports', function () {
    return Inertia::render('Reports/Index');
})->middleware(['auth', 'verified'])->name('reports.index');
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

Route::get('/invoice', function () {
    return Inertia::render('Invoice');
});
