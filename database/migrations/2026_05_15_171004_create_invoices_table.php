<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_number')->unique();
            $table->string('order_number')->nullable();
            $table->string('customer_name');
            $table->string('address')->nullable();
            $table->string('contact')->nullable();
            $table->string('tin')->nullable();
            $table->date('date');
            $table->date('due_date')->nullable();
            $table->string('status'); // CASH, INSTALLMENT
            $table->string('sales_person')->nullable();
            $table->string('cashier')->nullable();
            $table->decimal('amount', 15, 2);
            $table->decimal('balance_due', 15, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
