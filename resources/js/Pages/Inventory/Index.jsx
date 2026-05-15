import CreateProductModal from '@/Components/CreateProductModal';
import ProductViewModal from '@/Components/ProductViewModal';
import Dropdown from '@/Components/Dropdown';
import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head, router } from '@inertiajs/react';
import React, { useState, useMemo, useEffect } from 'react';

export default function InventoryIndex({ products: serverProducts = [] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [viewingProduct, setViewingProduct] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    
    const formatCurrency = (amount) => {
        return `PHP ${parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    const [inventory, setInventory] = useState(serverProducts);

    // Sync with server data
    useEffect(() => {
        setInventory(serverProducts);
    }, [serverProducts]);
    const [typeFilter, setTypeFilter] = useState('All Types');
    const [searchQuery, setSearchQuery] = useState('');

    const handleDeleteProduct = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(route('inventory.destroy', id));
        }
    };

    const handleExport = () => {
        // Simple CSV generation
        const headers = ['Product', 'Code', 'Category', 'Sold', 'On-Hand', 'Unit Cost', 'Total Sales'];
        const rows = inventory.map(item => [
            item.description,
            item.sku,
            item.product_type || 'General',
            0, // Sold
            item.stock_quantity,
            item.cost,
            item.cost * item.stock_quantity // Total Value
        ]);
        
        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        
        link.setAttribute("href", url);
        link.setAttribute("download", `inventory_report_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredInventory = useMemo(() => {
        return inventory.filter(item => {
            const matchesType = typeFilter === 'All Types' || item.product_type === typeFilter;
            const matchesSearch = (item.description?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
                                 (item.sku?.toLowerCase() || '').includes(searchQuery.toLowerCase());
            return matchesType && matchesSearch;
        });
    }, [inventory, typeFilter, searchQuery]);

    const stats = useMemo(() => {
        const totalSold = 0; // Needs items relationship
        const totalOnHand = filteredInventory.reduce((acc, item) => acc + (item.stock_quantity || 0), 0);
        const totalSales = 0; // Needs items relationship

        return [
            { label: 'Total Sold', value: `${totalSold.toLocaleString()} Units`, icon: (
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            )},
            { label: 'On-Hand Stock', value: `${totalOnHand.toLocaleString()} Units`, icon: (
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
            )},
            { label: 'Inventory Value', value: formatCurrency(filteredInventory.reduce((acc, item) => acc + (item.cost * item.stock_quantity), 0)), icon: (
                <span className="text-lg font-black text-amber-500 leading-none">₱</span>
            )},
        ];
    }, [filteredInventory]);

    return (
        <SidebarLayout>
            <Head title="Inventory Management" />
            
            <div className="flex flex-col gap-8 pb-10">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Inventory</h1>
                        <p className="text-sm font-medium text-gray-500 mt-1">Real-time tracking of sales performance and stock levels.</p>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={handleExport}
                            className="bg-white border border-gray-200 hover:border-gray-300 text-gray-700 px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            Export Report
                        </button>
                        <button 
                            onClick={() => {
                                setEditingProduct(null);
                                setIsModalOpen(true);
                            }}
                            className="bg-black hover:bg-gray-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-md shadow-black/10 hover:shadow-lg hover:-translate-y-0.5"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                            New Product
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                                <p className="text-xl font-black text-gray-900 mt-0.5">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Toolbar */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="relative w-full lg:w-96 group">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-black transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </span>
                        <input 
                            type="text" 
                            placeholder="Search products..." 
                            className="w-full bg-gray-50 border-none rounded-xl py-2.5 pl-11 pr-4 text-sm font-medium focus:ring-2 focus:ring-black/5 focus:bg-white transition-all placeholder-gray-400"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="flex items-center justify-between gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm min-w-[160px]">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                                        {typeFilter}
                                    </div>
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content align="left" width="48" contentClasses="py-2 bg-white shadow-xl border border-gray-100 rounded-xl">
                                {['All Types', 'Phones', 'Laptops', 'Accessories', 'Tablets', 'Wearables'].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setTypeFilter(type)}
                                        className={`block w-full px-4 py-2.5 text-start text-sm font-bold transition-colors ${typeFilter === type ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full table-fixed text-left text-sm">
                            <thead>
                                <tr className="border-b border-gray-100 bg-white">
                                    <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-widest text-gray-400 w-[20%]">Product</th>
                                    <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-widest text-gray-400 w-[15%]">Product Type</th>
                                    <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-widest text-gray-400 w-[10%]">Sold</th>
                                    <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-widest text-gray-400 w-[15%]">On-Hand</th>
                                    <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-widest text-gray-400 w-[15%]">Unit Cost</th>
                                    <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-widest text-gray-400 w-[15%]">Status</th>
                                    <th className="px-6 py-5 w-[10%] text-right"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredInventory.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer border-b border-gray-50 last:border-0">
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-gray-900 group-hover:text-black transition-colors line-clamp-1">{item.description}</span>
                                                <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-tighter mt-0.5">{item.sku}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold bg-gray-100 text-gray-700 uppercase tracking-wider">
                                                {item.product_type || 'General'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-left">
                                            <span className="font-bold text-gray-700">0</span>
                                        </td>
                                        <td className="px-6 py-5 text-left">
                                            <span className={`font-black ${item.stock_quantity < 10 ? 'text-red-600' : item.stock_quantity < 20 ? 'text-amber-600' : 'text-emerald-600'}`}>
                                                {item.stock_quantity}
                                            </span>
                                        </td>

                                        <td className="px-6 py-5 font-black text-gray-900">
                                            {formatCurrency(item.cost)}
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                item.stock_quantity <= 5 ? 'bg-red-50 text-red-700' : 
                                                item.stock_quantity <= 15 ? 'bg-amber-50 text-amber-700' : 
                                                'bg-emerald-50 text-emerald-700'
                                            }`}>
                                                {item.stock_quantity <= 5 ? 'Critical' : 
                                                 item.stock_quantity <= 15 ? 'Low Stock' : 
                                                 'In Stock'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setViewingProduct(item);
                                                        setIsViewModalOpen(true);
                                                    }}
                                                    className="px-3 py-1.5 bg-black text-white rounded-lg text-xs font-bold hover:bg-gray-900 transition-all shadow-sm focus:outline-none"
                                                >
                                                    View
                                                </button>
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setEditingProduct(item);
                                                        setIsModalOpen(true);
                                                    }}
                                                    className="p-1.5 text-gray-400 hover:text-black transition-colors"
                                                    title="Edit"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                </button>
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteProduct(item.id);
                                                    }}
                                                    className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                                                    title="Delete"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <CreateProductModal 
                isOpen={isModalOpen} 
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingProduct(null);
                }}
                productToEdit={editingProduct}
                onCreate={(newProduct) => {
                    router.post(route('inventory.store'), newProduct, {
                        onSuccess: () => setIsModalOpen(false)
                    });
                }}
                onUpdate={(updatedProduct) => {
                    router.patch(route('inventory.update', updatedProduct.id), updatedProduct, {
                        onSuccess: () => {
                            setIsModalOpen(false);
                            setEditingProduct(null);
                        }
                    });
                }}
            />
            <ProductViewModal 
                isOpen={isViewModalOpen}
                onClose={() => {
                    setIsViewModalOpen(false);
                    setViewingProduct(null);
                }}
                product={viewingProduct}
            />
        </SidebarLayout>
    );
}
