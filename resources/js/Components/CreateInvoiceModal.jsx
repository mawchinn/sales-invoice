import React, { useState } from 'react';

const predefinedItems = [
    { code: 'SELECT', description: 'Select a product...', cost: 0 },
    { code: 'IP15-PRO', description: 'iPhone 15 Pro - 256GB Natural Titanium', cost: 70990.00 },
    { code: 'MBP-M3', description: 'MacBook Pro 14" - M3 Chip 512GB Space Gray', cost: 104990.00 },
    { code: 'AIRPODS-P2', description: 'AirPods Pro (2nd Generation) with MagSafe', cost: 14990.00 },
    { code: 'IPAD-AIR5', description: 'iPad Air (5th Generation) Wi-Fi 64GB Blue', cost: 35990.00 },
    { code: 'WATCH-S9', description: 'Apple Watch Series 9 GPS 41mm Midnight Aluminum', cost: 26490.00 },
];

export default function CreateInvoiceModal({ isOpen, onClose, onCreate, onUpdate, invoice = null }) {
    if (!isOpen) return null;

    const isEdit = !!invoice;

    const [customerData, setCustomerData] = useState(() => {
        if (isEdit) {
            // Try to parse the date string (e.g., "17 Jan 2028") to YYYY-MM-DD
            let formattedDate = '';
            try {
                const dateObj = new Date(invoice.date);
                if (!isNaN(dateObj.getTime())) {
                    formattedDate = dateObj.toISOString().split('T')[0];
                }
            } catch (e) {
                formattedDate = new Date().toISOString().split('T')[0];
            }

            return {
                invoiceNumber: invoice.invoiceNumber,
                name: invoice.customerName,
                address: invoice.address || '', // Might be missing in mock
                contact: invoice.contact || '',
                tin: invoice.tin || '',
                date: formattedDate,
                salesPerson: invoice.salesPerson,
                cashier: invoice.cashier,
                paymentMethod: 'CASH'
            };
        }
        return {
            invoiceNumber: `PMC-2026-${Math.floor(Math.random() * 900) + 100}`,
            name: '',
            address: '',
            contact: '',
            tin: '',
            date: new Date().toISOString().split('T')[0],
            salesPerson: '',
            cashier: '',
            paymentMethod: 'CASH'
        };
    });

    const [items, setItems] = useState(() => {
        if (isEdit && invoice.items) {
            return invoice.items.map(item => ({
                code: item.code,
                description: item.description,
                cost: item.cost,
                qty: item.qty
            }));
        }
        return [{ code: 'SELECT', description: '', cost: 0, qty: 1 }];
    });

    const [errors, setErrors] = useState({});

    const handleAddItem = () => {
        setItems([...items, { code: 'SELECT', description: '', cost: 0, qty: 1 }]);
    };

    const handleRemoveItem = (index) => {
        if (items.length > 1) {
            setItems(items.filter((_, i) => i !== index));
        }
    };

    const handleUpdateItem = (index, field, value) => {
        const newItems = [...items];
        
        if (field === 'qty') {
            // Force quantity to be at least 1 and an integer
            const val = parseInt(value) || 0;
            newItems[index][field] = Math.max(0, val);
        } else if (field === 'cost') {
            // Force cost to be at least 0
            const val = parseFloat(value) || 0;
            newItems[index][field] = Math.max(0, val);
        } else {
            newItems[index][field] = value;
        }
        
        if (field === 'code') {
            const selected = predefinedItems.find(i => i.code === value);
            if (selected && value !== 'SELECT') {
                newItems[index].description = selected.description;
                newItems[index].cost = selected.cost;
            } else {
                newItems[index].description = '';
                newItems[index].cost = 0;
            }
        }
        
        setItems(newItems);
        // Clear item errors when updated
        if (errors.items) {
            const newErrors = { ...errors };
            delete newErrors.items;
            setErrors(newErrors);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!customerData.invoiceNumber.trim()) newErrors.invoiceNumber = 'Invoice number is required';
        if (!customerData.name.trim()) newErrors.name = 'Customer name is required';
        if (!customerData.address.trim()) newErrors.address = 'Shipping address is required';
        if (!customerData.date) newErrors.date = 'Invoice date is required';
        if (!customerData.salesPerson.trim()) newErrors.salesPerson = 'Sales person is required';
        if (!customerData.cashier.trim()) newErrors.cashier = 'Cashier name is required';
        
        const validItems = items.filter(item => item.code !== 'SELECT' && item.qty > 0);
        if (validItems.length === 0) {
            newErrors.items = 'At least one valid product is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const amountNum = calculateTotal();
            const formattedAmount = `PHP ${amountNum.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            
            // Format date correctly (e.g., '17 Jan 2028')
            const dateObj = new Date(customerData.date);
            const dateStr = dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' ');
            
            let dueDateStr = dateStr;
            if (customerData.paymentMethod === 'INSTALLMENT') {
                const dueDateObj = new Date(dateObj);
                dueDateObj.setDate(dueDateObj.getDate() + 30);
                dueDateStr = dueDateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' ');
            }

            const invoiceData = {
                id: isEdit ? invoice.id : Date.now(),
                date: dateStr,
                invoiceNumber: customerData.invoiceNumber,
                orderNumber: isEdit ? invoice.orderNumber : 'N/A',
                customerName: customerData.name,
                salesPerson: customerData.salesPerson,
                cashier: customerData.cashier,
                status: customerData.paymentMethod,
                dueDate: dueDateStr,
                amount: formattedAmount,
                balanceDue: formattedAmount,
                items: items.filter(item => item.code !== 'SELECT' && item.qty > 0).map(item => ({
                    code: item.code,
                    description: item.description,
                    cost: parseFloat(item.cost),
                    qty: parseInt(item.qty)
                })),
                // Preserve additional fields if editing
                address: customerData.address,
                contact: customerData.contact,
                tin: customerData.tin
            };
            
            if (isEdit && onUpdate) {
                onUpdate(invoiceData);
            } else if (!isEdit && onCreate) {
                onCreate(invoiceData);
            } else {
                console.log('Invoice Saved:', invoiceData);
                onClose();
            }
        }
    };

    const calculateTotal = () => {
        return items.reduce((acc, item) => {
            const cost = parseFloat(item.cost) || 0;
            const qty = parseFloat(item.qty) || 0;
            return acc + (cost * qty);
        }, 0);
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
                                        className={`${inputClasses} ${errors.name ? 'ring-2 ring-red-500 bg-red-50' : ''}`} 
                                        placeholder="e.g. Marcin A. Pascua" 
                                        value={customerData.name}
                                        onChange={(e) => {
                                            setCustomerData({...customerData, name: e.target.value});
                                            if (errors.name) {
                                                const newErrors = {...errors};
                                                delete newErrors.name;
                                                setErrors(newErrors);
                                            }
                                        }}
                                    />
                                    {errors.name && <p className="text-[10px] font-bold text-red-500 mt-1 uppercase tracking-widest">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className={labelClasses}>Shipping Address</label>
                                    <input 
                                        type="text" 
                                        className={`${inputClasses} ${errors.address ? 'ring-2 ring-red-500 bg-red-50' : ''}`} 
                                        placeholder="Enter address" 
                                        value={customerData.address}
                                        onChange={(e) => {
                                            setCustomerData({...customerData, address: e.target.value});
                                            if (errors.address) {
                                                const newErrors = {...errors};
                                                delete newErrors.address;
                                                setErrors(newErrors);
                                            }
                                        }}
                                    />
                                    {errors.address && <p className="text-[10px] font-bold text-red-500 mt-1 uppercase tracking-widest">{errors.address}</p>}
                                </div>
                                <div>
                                    <label className={labelClasses}>Contact Number <span className="text-gray-400 font-normal ml-1 normal-case">(optional)</span></label>
                                    <input 
                                        type="text" 
                                        className={`${inputClasses} ${errors.contact ? 'ring-2 ring-red-500 bg-red-50' : ''}`} 
                                        placeholder="Enter contact details" 
                                        value={customerData.contact}
                                        onChange={(e) => {
                                            setCustomerData({...customerData, contact: e.target.value});
                                            if (errors.contact) {
                                                const newErrors = {...errors};
                                                delete newErrors.contact;
                                                setErrors(newErrors);
                                            }
                                        }}
                                    />
                                    {errors.contact && <p className="text-[10px] font-bold text-red-500 mt-1 uppercase tracking-widest">{errors.contact}</p>}
                                </div>
                                <div>
                                    <label className={labelClasses}>TIN <span className="text-gray-400 font-normal ml-1 normal-case">(optional)</span></label>
                                    <input 
                                        type="text" 
                                        className={inputClasses} 
                                        placeholder="000-000-000-000" 
                                        value={customerData.tin}
                                        onChange={(e) => setCustomerData({...customerData, tin: e.target.value})}
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
                                        className={`${inputClasses} ${errors.invoiceNumber ? 'ring-2 ring-red-500 bg-red-50' : ''}`} 
                                        placeholder="e.g. PMC-2026-001"
                                        value={customerData.invoiceNumber}
                                        onChange={(e) => {
                                            setCustomerData({...customerData, invoiceNumber: e.target.value});
                                            if (errors.invoiceNumber) {
                                                const newErrors = {...errors};
                                                delete newErrors.invoiceNumber;
                                                setErrors(newErrors);
                                            }
                                        }}
                                    />
                                    {errors.invoiceNumber && <p className="text-[10px] font-bold text-red-500 mt-1 uppercase tracking-widest">{errors.invoiceNumber}</p>}
                                </div>
                                <div>
                                    <label className={labelClasses}>Invoice Date</label>
                                    <input 
                                        type="date" 
                                        className={`${inputClasses} ${errors.date ? 'ring-2 ring-red-500 bg-red-50' : ''}`} 
                                        value={customerData.date}
                                        onChange={(e) => {
                                            setCustomerData({...customerData, date: e.target.value});
                                            if (errors.date) {
                                                const newErrors = {...errors};
                                                delete newErrors.date;
                                                setErrors(newErrors);
                                            }
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className={labelClasses}>Sales Person</label>
                                    <input 
                                        type="text" 
                                        className={`${inputClasses} ${errors.salesPerson ? 'ring-2 ring-red-500 bg-red-50' : ''}`} 
                                        placeholder="e.g. LBSARINO" 
                                        value={customerData.salesPerson}
                                        onChange={(e) => {
                                            setCustomerData({...customerData, salesPerson: e.target.value});
                                            if (errors.salesPerson) {
                                                const newErrors = {...errors};
                                                delete newErrors.salesPerson;
                                                setErrors(newErrors);
                                            }
                                        }}
                                    />
                                    {errors.salesPerson && <p className="text-[10px] font-bold text-red-500 mt-1 uppercase tracking-widest">{errors.salesPerson}</p>}
                                </div>
                                <div>
                                    <label className={labelClasses}>Cashier</label>
                                    <input 
                                        type="text" 
                                        className={`${inputClasses} ${errors.cashier ? 'ring-2 ring-red-500 bg-red-50' : ''}`} 
                                        placeholder="e.g. MMPONCE" 
                                        value={customerData.cashier}
                                        onChange={(e) => {
                                            setCustomerData({...customerData, cashier: e.target.value});
                                            if (errors.cashier) {
                                                const newErrors = {...errors};
                                                delete newErrors.cashier;
                                                setErrors(newErrors);
                                            }
                                        }}
                                    />
                                    {errors.cashier && <p className="text-[10px] font-bold text-red-500 mt-1 uppercase tracking-widest">{errors.cashier}</p>}
                                </div>
                                <div>
                                    <label className={labelClasses}>Payment Method</label>
                                    <input 
                                        type="text"
                                        className={`${inputClasses} bg-gray-100 cursor-not-allowed`}
                                        value={customerData.paymentMethod}
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
                                {items.map((item, index) => (
                                    <div key={index} className="flex items-start gap-3 group relative">
                                        <div className="grid grid-cols-12 gap-3 flex-1">
                                            <div className="col-span-5">
                                                {index === 0 && <label className={labelClasses}>Product</label>}
                                                <select 
                                                    value={item.code} 
                                                    onChange={(e) => handleUpdateItem(index, 'code', e.target.value)}
                                                    className={`${inputClasses} appearance-none cursor-pointer`}
                                                >
                                                    {predefinedItems.map(p => (
                                                        <option key={p.code} value={p.code}>{p.code === 'SELECT' ? 'Select Product' : p.code}</option>
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
                        <button onClick={handleSubmit} className="px-6 py-3 bg-black hover:bg-gray-900 text-white rounded-xl font-bold transition-all shadow-md shadow-black/10 hover:shadow-lg hover:-translate-y-0.5 text-sm">
                            {isEdit ? 'Update' : 'Create'} Invoice
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
