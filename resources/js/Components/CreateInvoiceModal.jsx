import React, { useState } from 'react';

export default function CreateInvoiceModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    // Simple state for mockup items
    const [items, setItems] = useState([
        { code: '', description: '', cost: '', qty: 1 }
    ]);

    const handleAddItem = () => {
        setItems([...items, { code: '', description: '', cost: '', qty: 1 }]);
    };

    const handleRemoveItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const inputClasses = "w-full bg-gray-50 hover:bg-gray-100 border-none rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-black/5 focus:outline-none transition-all placeholder-gray-400 font-medium text-gray-900";
    const labelClasses = "text-[11px] font-semibold tracking-wide text-gray-500 mb-1.5 block";
    const sectionTitleClasses = "text-xs font-bold uppercase tracking-widest text-black mb-5";

    return (
        <div className="fixed inset-0 z-[110] flex justify-center items-center bg-black/40 backdrop-blur-sm overflow-y-auto py-10 px-4 sm:px-10 opacity-100 transition-opacity">
            <div className="bg-white w-full max-w-4xl rounded-[24px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-full">
                
                {/* Header */}
                <div className="px-8 py-5 flex justify-between items-center shrink-0 bg-black text-white rounded-t-[24px]">
                    <h2 className="text-3xl font-black tracking-tight">Create Invoice</h2>
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
                                    <input type="text" className={inputClasses} placeholder="e.g. Marcin A. Pascua" />
                                </div>
                                <div>
                                    <label className={labelClasses}>Shipping Address</label>
                                    <input type="text" className={inputClasses} placeholder="Enter address" />
                                </div>
                                <div>
                                    <label className={labelClasses}>Contact Number</label>
                                    <input type="text" className={inputClasses} placeholder="Enter contact details" />
                                </div>
                                <div>
                                    <label className={labelClasses}>TIN</label>
                                    <input type="text" className={inputClasses} placeholder="000-000-000-000" />
                                </div>
                            </div>
                        </div>

                        {/* Invoice Details */}
                        <div>
                            <h3 className={sectionTitleClasses}>Invoice Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
                                <div>
                                    <label className={labelClasses}>Invoice Date</label>
                                    <input type="date" className={inputClasses} />
                                </div>
                                <div>
                                    <label className={labelClasses}>Terms</label>
                                    <select className={`${inputClasses} appearance-none cursor-pointer`}>
                                        <option>Due on Receipt</option>
                                        <option>Net 15</option>
                                        <option>Net 30</option>
                                        <option>Net 60</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClasses}>Sales Person</label>
                                    <input type="text" className={inputClasses} placeholder="e.g. LBSARINO" />
                                </div>
                            </div>
                        </div>

                        {/* Line Items */}
                        <div className="pb-4">
                            <div className="flex justify-between items-center mb-5">
                                <h3 className={sectionTitleClasses} style={{ marginBottom: 0 }}>Line Items</h3>
                                <button type="button" onClick={handleAddItem} className="text-[11px] font-bold uppercase tracking-widest text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                                    + Add Item
                                </button>
                            </div>
                            
                            <div className="space-y-3">
                                {items.map((item, index) => (
                                    <div key={index} className="flex items-start gap-3 group relative">
                                        <div className="grid grid-cols-12 gap-3 flex-1">
                                            <div className="col-span-3">
                                                {index === 0 && <label className={labelClasses}>Product Code</label>}
                                                <input type="text" placeholder="Code" className={inputClasses} />
                                            </div>
                                            <div className="col-span-5">
                                                {index === 0 && <label className={labelClasses}>Description</label>}
                                                <input type="text" placeholder="Item description" className={inputClasses} />
                                            </div>
                                            <div className="col-span-2">
                                                {index === 0 && <label className={labelClasses}>Unit Cost</label>}
                                                <input type="number" placeholder="0.00" className={inputClasses} />
                                            </div>
                                            <div className="col-span-2">
                                                {index === 0 && <label className={labelClasses}>Qty</label>}
                                                <input type="number" min="1" placeholder="1" className={inputClasses} defaultValue={1} />
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
                        Total Amount: <span className="text-2xl font-black text-black ml-1.5 tracking-tight">PHP 0.00</span>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={onClose}
                            className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors text-sm"
                        >
                            Cancel
                        </button>
                        <button className="px-6 py-3 bg-black hover:bg-gray-900 text-white rounded-xl font-bold transition-all shadow-md shadow-black/10 hover:shadow-lg hover:-translate-y-0.5 text-sm">
                            Create Invoice
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
