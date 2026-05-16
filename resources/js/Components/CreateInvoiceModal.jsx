import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';


export default function CreateInvoiceModal({ isOpen, onClose, onCreate, onUpdate, invoice = null, products = [], nextInvoiceNumber, nextOrderNumber }) {
    if (!isOpen) return null;

    const isEdit = !!invoice;

    const { data, setData, post, patch, processing, errors, reset } = useForm({
        invoice_number: invoice?.invoice_number || nextInvoiceNumber || '',
        order_number: invoice?.order_number || nextOrderNumber || '',
        customer_name: invoice?.customer_name || '',
        address: invoice?.address || '',
        contact: invoice?.contact || '',
        tin: invoice?.tin || '',
        date: invoice?.date || new Date().toISOString().split('T')[0],
        due_date: invoice?.due_date || '',
        sales_person: invoice?.sales_person || '',
        cashier: invoice?.cashier || '',
        status: invoice?.status || 'CASH',
        amount: invoice?.amount || 0,
        balance_due: invoice?.balance_due || 0,
        items: invoice?.items?.map(item => ({
            sku: item.sku,
            description: item.description,
            cost: item.cost,
            qty: item.qty
        })) || [{ sku: 'SELECT', description: '', cost: 0, qty: 1 }]
    });

    const handleAddItem = () => {
        setData('items', [...data.items, { sku: 'SELECT', description: '', cost: 0, qty: 1 }]);
    };

    const handleRemoveItem = (index) => {
        if (data.items.length > 1) {
            setData('items', data.items.filter((_, i) => i !== index));
        }
    };

    const handleUpdateItem = (index, field, value) => {
        const newItems = [...data.items];
        
        if (field === 'qty') {
            const val = parseInt(value) || 0;
            newItems[index][field] = Math.max(0, val);
        } else if (field === 'cost') {
            const val = parseFloat(value) || 0;
            newItems[index][field] = Math.max(0, val);
        } else {
            newItems[index][field] = value;
        }
        
        if (field === 'sku') {
            const selected = products.find(p => p.sku === value);
            if (selected && value !== 'SELECT') {
                newItems[index].description = selected.description;
                newItems[index].cost = selected.cost;
            } else {
                newItems[index].description = '';
                newItems[index].cost = 0;
            }
        }
        
        setData('items', newItems);
    };

    const calculateTotal = () => {
        return data.items.reduce((acc, item) => {
            const cost = parseFloat(item.cost) || 0;
            const qty = parseFloat(item.qty) || 0;
            return acc + (cost * qty);
        }, 0);
    };

    // Update amount and due date when relevant fields change
    useEffect(() => {
        const total = calculateTotal();
        let dueDateStr = data.date;
        
        if (data.status === 'INSTALLMENT' && data.date) {
            const dateObj = new Date(data.date);
            dateObj.setDate(dateObj.getDate() + 30);
            dueDateStr = dateObj.toISOString().split('T')[0];
        }

        setData(prevData => ({
            ...prevData,
            amount: total,
            balance_due: total,
            due_date: dueDateStr
        }));
    }, [data.items, data.date, data.status]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const options = {
            onSuccess: () => {
                if (isEdit) onUpdate();
                else onCreate();
                onClose();
                reset();
            },
        };

        if (isEdit) {
            patch(route('invoices.update', invoice.id), options);
        } else {
            post(route('invoices.store'), options);
        }
    };

    const inputClasses = "w-full bg-gray-50 hover:bg-gray-100 border-none rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-black/5 focus:outline-none transition-all placeholder-gray-400 font-medium text-gray-900";
    const labelClasses = "text-[11px] font-semibold tracking-wide text-gray-500 mb-1.5 block";
    const sectionTitleClasses = "text-xs font-bold uppercase tracking-widest text-black mb-5";

    return (
        <div className="fixed inset-0 z-[110] flex justify-center items-center bg-black/40 backdrop-blur-sm overflow-y-auto py-10 px-4 sm:px-10 opacity-100 transition-opacity">
            <div className="bg-white w-full max-w-4xl rounded-[24px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-full">
                
                {/* Header */}
                <div className="px-8 py-5 flex justify-between items-center shrink-0 bg-black text-white rounded-t-[24px]">
                    <h2 className="text-3xl font-black tracking-tight">{isEdit ? 'Edit' : 'Create'} Invoice</h2>
                    <button 
                        onClick={onClose}
                        className="p-2 -mr-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Form Body */}
                <div className="px-8 pt-10 pb-4 overflow-y-auto flex-1">
                    <form className="space-y-12">
                        
                        {/* Customer Details */}
                        <div>
                            <h3 className={sectionTitleClasses}>Customer Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                                <div>
                                    <label className={labelClasses}>Customer Name</label>
                                    <input 
                                        type="text" 
                                        className={`${inputClasses} ${errors.customer_name ? 'ring-2 ring-red-500 bg-red-50' : ''}`} 
                                        placeholder="e.g. Marcin A. Pascua" 
                                        value={data.customer_name}
                                        onChange={(e) => setData('customer_name', e.target.value)}
                                    />
                                    {errors.customer_name && <p className="text-[10px] font-bold text-red-500 mt-1 uppercase tracking-widest">{errors.customer_name}</p>}
                                </div>
                                <div>
                                    <label className={labelClasses}>Home Address</label>
                                    <input 
                                        type="text" 
                                        className={`${inputClasses} ${errors.address ? 'ring-2 ring-red-500 bg-red-50' : ''}`} 
                                        placeholder="Enter address" 
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                    />
                                    {errors.address && <p className="text-[10px] font-bold text-red-500 mt-1 uppercase tracking-widest">{errors.address}</p>}
                                </div>
                                <div>
                                    <label className={labelClasses}>Contact Number <span className="text-gray-400 font-normal ml-1 normal-case">(optional)</span></label>
                                    <input 
                                        type="text" 
                                        className={`${inputClasses} ${errors.contact ? 'ring-2 ring-red-500 bg-red-50' : ''}`} 
                                        placeholder="Enter contact details" 
                                        value={data.contact}
                                        onChange={(e) => setData('contact', e.target.value)}
                                    />
                                    {errors.contact && <p className="text-[10px] font-bold text-red-500 mt-1 uppercase tracking-widest">{errors.contact}</p>}
                                </div>
                                <div>
                                    <label className={labelClasses}>TIN <span className="text-gray-400 font-normal ml-1 normal-case">(optional)</span></label>
                                    <input 
                                        type="text" 
                                        className={inputClasses} 
                                        placeholder="000-000-000-000" 
                                        value={data.tin}
                                        onChange={(e) => setData('tin', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Invoice Details */}
                        <div>
                            <h3 className={sectionTitleClasses}>Invoice Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
                                <div>
                                    <label className={labelClasses}>Invoice Number</label>
                                    <input 
                                        type="text" 
                                        className={`${inputClasses} ${errors.invoice_number ? 'ring-2 ring-red-500 bg-red-50' : ''}`} 
                                        placeholder="e.g. PMC-2026-001"
                                        value={data.invoice_number}
                                        onChange={(e) => setData('invoice_number', e.target.value)}
                                    />
                                    {errors.invoice_number && <p className="text-[10px] font-bold text-red-500 mt-1 uppercase tracking-widest">{errors.invoice_number}</p>}
                                </div>
                                <div>
                                    <label className={labelClasses}>Invoice Date</label>
                                    <input 
                                        type="date" 
                                        className={`${inputClasses} ${errors.date ? 'ring-2 ring-red-500 bg-red-50' : ''}`} 
                                        value={data.date}
                                        onChange={(e) => setData('date', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className={labelClasses}>Sales Person</label>
                                    <input 
                                        type="text" 
                                        className={`${inputClasses} ${errors.sales_person ? 'ring-2 ring-red-500 bg-red-50' : ''}`} 
                                        placeholder="e.g. LBSARINO" 
                                        value={data.sales_person}
                                        onChange={(e) => setData('sales_person', e.target.value)}
                                    />
                                    {errors.sales_person && <p className="text-[10px] font-bold text-red-500 mt-1 uppercase tracking-widest">{errors.sales_person}</p>}
                                </div>
                                <div>
                                    <label className={labelClasses}>Order Number</label>
                                    <input 
                                        type="text" 
                                        className={`${inputClasses} ${errors.order_number ? 'ring-2 ring-red-500 bg-red-50' : ''}`} 
                                        placeholder="e.g. PO-1001" 
                                        value={data.order_number}
                                        onChange={(e) => setData('order_number', e.target.value)}
                                    />
                                    {errors.order_number && <p className="text-[10px] font-bold text-red-500 mt-1 uppercase tracking-widest">{errors.order_number}</p>}
                                </div>
                                <div>
                                    <label className={labelClasses}>Cashier</label>
                                    <input 
                                        type="text" 
                                        className={`${inputClasses} ${errors.cashier ? 'ring-2 ring-red-500 bg-red-50' : ''}`} 
                                        placeholder="e.g. MMPONCE" 
                                        value={data.cashier}
                                        onChange={(e) => setData('cashier', e.target.value)}
                                    />
                                    {errors.cashier && <p className="text-[10px] font-bold text-red-500 mt-1 uppercase tracking-widest">{errors.cashier}</p>}
                                </div>
                                <div>
                                    <label className={labelClasses}>Payment Method</label>
                                    <input 
                                        type="text"
                                        className={`${inputClasses} bg-gray-100 cursor-not-allowed`}
                                        value={data.status}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Line Items */}
                        <div className="pb-4">
                            <div className="flex justify-between items-center mb-5">
                                <h3 className={sectionTitleClasses} style={{ marginBottom: 0 }}>Line Items</h3>
                                <div className="flex items-center gap-4">
                                    {errors.items && <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{errors.items}</span>}
                                    <button type="button" onClick={handleAddItem} className="text-[11px] font-bold uppercase tracking-widest text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                                        + Add Item
                                    </button>
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                 {data.items.map((item, index) => (
                                    <div key={index} className="flex items-start gap-3 group relative">
                                        <div className="grid grid-cols-12 gap-3 flex-1">
                                            <div className="col-span-5">
                                                {index === 0 && <label className={labelClasses}>Product</label>}
                                                <select 
                                                    value={item.sku} 
                                                    onChange={(e) => handleUpdateItem(index, 'sku', e.target.value)}
                                                    className={`${inputClasses} appearance-none cursor-pointer`}
                                                >
                                                    <option value="SELECT">Select Product</option>
                                                    {products.map(p => (
                                                        <option key={p.sku} value={p.sku}>{p.sku}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-span-2">
                                                {index === 0 && <label className={labelClasses}>Unit Cost</label>}
                                                <input 
                                                    type="number" 
                                                    placeholder="0.00" 
                                                    className={inputClasses} 
                                                    value={item.cost}
                                                    onChange={(e) => handleUpdateItem(index, 'cost', e.target.value)}
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                {index === 0 && <label className={labelClasses}>Qty</label>}
                                                <input 
                                                    type="number" 
                                                    min="1" 
                                                    placeholder="1" 
                                                    className={inputClasses} 
                                                    value={item.qty}
                                                    onChange={(e) => handleUpdateItem(index, 'qty', e.target.value)}
                                                />
                                            </div>
                                            <div className="col-span-3">
                                                {index === 0 && <label className={labelClasses}>Subtotal</label>}
                                                <div className={`${inputClasses} flex items-center justify-end font-black text-black bg-gray-50/30`}>
                                                    {( (parseFloat(item.cost) || 0) * (parseFloat(item.qty) || 0) ).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </div>
                                            </div>
                                        </div>
                                        <button 
                                            type="button" 
                                            onClick={() => handleRemoveItem(index)}
                                            className={`mt-${index === 0 ? '7' : '1'} p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 shrink-0`}
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Invoice Breakdown */}
                        <div className="mt-8 pt-8 border-t border-gray-50 flex flex-col items-start space-y-4">
                            <div className="flex justify-between w-72 text-sm font-bold text-gray-400 uppercase tracking-widest">
                                <span>Subtotal (VAT Excl.)</span>
                                <span className="text-gray-900 font-black">PHP {(calculateTotal() / 1.12).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                            <div className="flex justify-between w-72 text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-4">
                                <span>VAT (12%)</span>
                                <span className="text-gray-900 font-black">PHP {(calculateTotal() - (calculateTotal() / 1.12)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                        </div>

                    </form>
                </div>

                {/* Footer */}
                <div className="px-8 py-5 flex justify-between items-center shrink-0 border-t border-gray-50">
                    <div className="text-sm font-semibold text-gray-500">
                        Total Amount: <span className="text-2xl font-black text-black ml-1.5 tracking-tight">PHP {calculateTotal().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={onClose}
                            className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors text-sm"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSubmit} 
                            disabled={processing}
                            className="px-6 py-3 bg-black hover:bg-gray-900 text-white rounded-xl font-bold transition-all shadow-md shadow-black/10 hover:shadow-lg hover:-translate-y-0.5 text-sm disabled:opacity-50"
                        >
                            {isEdit ? 'Update' : 'Create'} Invoice
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
