import React, { useState, useEffect } from 'react';

export default function CreateProductModal({ isOpen, onClose, onCreate, onUpdate, productToEdit }) {
    if (!isOpen) return null;

    const [productData, setProductData] = useState({
        name: '',
        code: '',
        category: 'Phones',
        description: '',
        price: '',
        stock: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (productToEdit) {
            setProductData({
                name: productToEdit.name || '',
                code: productToEdit.code || '',
                category: productToEdit.category || 'Phones',
                description: productToEdit.description || '',
                price: productToEdit.unitCost ? parseFloat(productToEdit.unitCost.replace(/[^0-9.]/g, '')) : '',
                stock: productToEdit.onHand || ''
            });
        } else {
            setProductData({
                name: '',
                code: '',
                category: 'Phones',
                description: '',
                price: '',
                stock: ''
            });
        }
        setErrors({});
    }, [productToEdit, isOpen]);

    const handleSave = (e) => {
        e.preventDefault();
        
        // Basic validation
        const newErrors = {};
        if (!productData.name.trim()) newErrors.name = 'Product name is required';
        if (!productData.code.trim()) newErrors.code = 'Product code is required';
        if (!productData.price) newErrors.price = 'Price is required';
        if (!productData.stock) newErrors.stock = 'Initial stock is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        if (productToEdit && onUpdate) {
            onUpdate({
                ...productToEdit,
                name: productData.name,
                code: productData.code,
                category: productData.category,
                description: productData.description,
                unitCost: `PHP ${parseFloat(productData.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                onHand: parseInt(productData.stock) || 0,
            });
        } else if (onCreate) {
            const newProduct = {
                id: Date.now(),
                name: productData.name,
                code: productData.code,
                category: productData.category,
                description: productData.description,
                unitCost: `PHP ${parseFloat(productData.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                onHand: parseInt(productData.stock) || 0,
                reorderPoint: 10,
                sold: 0,
                sales: 'PHP 0.00'
            };
            onCreate(newProduct);
        }
    };

    const inputClasses = "w-full bg-gray-50 hover:bg-gray-100 border-none rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-black/5 focus:outline-none transition-all placeholder-gray-400 font-medium text-gray-900";
    const labelClasses = "text-[11px] font-semibold tracking-wide text-gray-500 mb-1.5 block";
    const sectionTitleClasses = "text-xs font-bold uppercase tracking-widest text-black mb-5";

    return (
        <div className="fixed inset-0 z-[110] flex justify-center items-center bg-black/40 backdrop-blur-sm overflow-y-auto py-10 px-4 sm:px-10 opacity-100 transition-opacity">
            <div className="bg-white w-full max-w-2xl rounded-[24px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-full">
                
                {/* Header */}
                <div className="px-8 py-5 flex justify-between items-center shrink-0 bg-black text-white rounded-t-[24px]">
                    <h2 className="text-2xl font-black tracking-tight">{productToEdit ? 'Edit Product' : 'Add New Product'}</h2>
                    <button 
                        onClick={onClose}
                        className="p-2 -mr-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Form Body */}
                <div className="px-8 pt-10 pb-10 overflow-y-auto flex-1">
                    <form className="space-y-8" onSubmit={handleSave}>
                        
                        {/* Basic Information */}
                        <div>
                            <h3 className={sectionTitleClasses}>Basic Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                                <div className="md:col-span-2">
                                    <label className={labelClasses}>Product Name</label>
                                    <input 
                                        type="text" 
                                        className={`${inputClasses} ${errors.name ? 'ring-2 ring-red-500 bg-red-50' : ''}`} 
                                        placeholder="e.g. iPhone 15 Pro Max" 
                                        value={productData.name}
                                        onChange={(e) => setProductData({...productData, name: e.target.value})}
                                    />
                                    {errors.name && <p className="text-[10px] font-bold text-red-500 mt-1 uppercase tracking-widest">{errors.name}</p>}
                                </div>
                                <div className="md:col-span-2">
                                    <label className={labelClasses}>Product Description</label>
                                    <textarea 
                                        rows="3"
                                        className={`${inputClasses} resize-none`} 
                                        placeholder="Enter detailed product description..." 
                                        value={productData.description}
                                        onChange={(e) => setProductData({...productData, description: e.target.value})}
                                    ></textarea>
                                </div>
                                <div>
                                    <label className={labelClasses}>Product Code / SKU</label>
                                    <input 
                                        type="text" 
                                        className={`${inputClasses} ${errors.code ? 'ring-2 ring-red-500 bg-red-50' : ''}`} 
                                        placeholder="e.g. IP15-PRO-MAX" 
                                        value={productData.code}
                                        onChange={(e) => setProductData({...productData, code: e.target.value})}
                                    />
                                    {errors.code && <p className="text-[10px] font-bold text-red-500 mt-1 uppercase tracking-widest">{errors.code}</p>}
                                </div>
                                <div>
                                    <label className={labelClasses}>Category</label>
                                    <select 
                                        className={`${inputClasses} appearance-none cursor-pointer`}
                                        value={productData.category}
                                        onChange={(e) => setProductData({...productData, category: e.target.value})}
                                    >
                                        <option>Phones</option>
                                        <option>Laptops</option>
                                        <option>Accessories</option>
                                        <option>Tablets</option>
                                        <option>Wearables</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Pricing & Stock */}
                        <div>
                            <h3 className={sectionTitleClasses}>Pricing & Inventory</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                                <div>
                                    <label className={labelClasses}>Unit Price (PHP)</label>
                                    <input 
                                        type="number" 
                                        className={`${inputClasses} ${errors.price ? 'ring-2 ring-red-500 bg-red-50' : ''}`} 
                                        placeholder="0.00" 
                                        value={productData.price}
                                        onChange={(e) => setProductData({...productData, price: e.target.value})}
                                    />
                                    {errors.price && <p className="text-[10px] font-bold text-red-500 mt-1 uppercase tracking-widest">{errors.price}</p>}
                                </div>
                                <div>
                                    <label className={labelClasses}>Initial Stock Level</label>
                                    <input 
                                        type="number" 
                                        className={`${inputClasses} ${errors.stock ? 'ring-2 ring-red-500 bg-red-50' : ''}`} 
                                        placeholder="0" 
                                        value={productData.stock}
                                        onChange={(e) => setProductData({...productData, stock: e.target.value})}
                                    />
                                    {errors.stock && <p className="text-[10px] font-bold text-red-500 mt-1 uppercase tracking-widest">{errors.stock}</p>}
                                </div>
                            </div>
                        </div>

                    </form>
                </div>

                {/* Footer */}
                <div className="px-8 py-5 flex justify-end items-center shrink-0 border-t border-gray-50 bg-gray-50/30">
                    <div className="flex gap-3">
                        <button 
                            onClick={onClose}
                            className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors text-sm"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSave}
                            className="px-8 py-3 bg-black hover:bg-gray-900 text-white rounded-xl font-bold transition-all shadow-md shadow-black/10 hover:shadow-lg hover:-translate-y-0.5 text-sm"
                        >
                            {productToEdit ? 'Update Product' : 'Save Product'}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
