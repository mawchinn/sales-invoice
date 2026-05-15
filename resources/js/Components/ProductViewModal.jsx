import React from 'react';

export default function ProductViewModal({ isOpen, onClose, product }) {
    if (!isOpen || !product) return null;

    const formatCurrency = (amount) => {
        return `PHP ${parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    const labelClasses = "text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-1.5 block";

    return (
        <div className="fixed inset-0 z-[110] flex justify-center items-center bg-black/40 backdrop-blur-sm overflow-y-auto py-10 px-4 sm:px-10 opacity-100 transition-opacity">
            <div className="bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-full border border-white/20">
                
                {/* Header */}
                <div className="px-8 py-6 flex justify-between items-center shrink-0 border-b border-gray-50">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight text-gray-900">Product Details</h2>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Quick lookup & information</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 -mr-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-xl transition-all"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Body */}
                <div className="px-8 py-8 overflow-y-auto flex-1 space-y-10">
                    {/* Basic Info Section */}
                    <div className="grid grid-cols-2 gap-8">
                        <div className="col-span-2">
                            <label className={labelClasses}>Product Name</label>
                            <div className="text-2xl font-black text-gray-900">
                                {product.description}
                            </div>
                        </div>
                        
                        <div>
                            <label className={labelClasses}>SKU / Code</label>
                            <div className="text-sm font-bold text-gray-900 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                {product.sku}
                            </div>
                        </div>
                        
                        <div>
                            <label className={labelClasses}>Product Type</label>
                            <div className="text-sm font-bold text-gray-900 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                                {product.product_type}
                            </div>
                        </div>
                    </div>

                    {/* Inventory Stats - White & Clean Version */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">On-Hand Stock</label>
                            <div className="text-2xl font-black text-gray-900">{product.stock_quantity} <span className="text-[11px] text-gray-400 font-bold ml-1 uppercase">Units</span></div>
                        </div>
                        <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">Total Sold</label>
                            <div className="text-2xl font-black text-gray-900">0 <span className="text-[11px] text-emerald-500 font-bold ml-1 uppercase">Sold</span></div>
                        </div>
                        <div className="col-span-2 p-6 bg-emerald-50/30 rounded-2xl border border-emerald-100/50">
                            <label className="text-[10px] font-bold text-emerald-600/70 uppercase tracking-widest mb-1 block">Unit Cost (VAT Inclusive)</label>
                            <div className="text-3xl font-black text-emerald-600 tracking-tight">{formatCurrency(product.cost)}</div>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className={labelClasses}>Product Description</label>
                        <div className="text-sm font-medium text-gray-600 leading-relaxed bg-gray-50/50 p-5 rounded-2xl border border-gray-100/50">
                            {product.description || 'No description provided for this product.'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
