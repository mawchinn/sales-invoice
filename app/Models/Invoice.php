<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $fillable = [
        'invoice_number',
        'order_number',
        'customer_name',
        'address',
        'contact',
        'tin',
        'date',
        'due_date',
        'status',
        'sales_person',
        'cashier',
        'amount',
        'balance_due',
    ];

    public function items()
    {
        return $this->hasMany(InvoiceItem::class);
    }
}
