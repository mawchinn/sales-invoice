import CreateProductModal from '@/Components/CreateProductModal';
import ProductViewModal from '@/Components/ProductViewModal';
import Dropdown from '@/Components/Dropdown';
import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useMemo } from 'react';

export default function InventoryIndex() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [viewingProduct, setViewingProduct] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const initialInventory = [
        { id: 1, name: 'iPhone 15 Pro', code: 'IP15-PRO', onHand: 24, sold: 156, unitCost: 'PHP 70,990.00', sales: 'PHP 11,074,440.00', category: 'Phones', reorderPoint: 10, description: 'Apple iPhone 15 Pro with 256GB storage, Natural Titanium.' },
        { id: 2, name: 'MacBook Pro 14"', code: 'MBP-M3', onHand: 12, sold: 42, unitCost: 'PHP 104,990.00', sales: 'PHP 4,409,580.00', category: 'Laptops', reorderPoint: 10, description: '14-inch MacBook Pro with M3 Chip, 8GB RAM, 512GB SSD.' },
        { id: 3, name: 'AirPods Pro 2', code: 'AIRPODS-P2', onHand: 45, sold: 289, unitCost: 'PHP 14,990.00', sales: 'PHP 4,332,110.00', category: 'Accessories', reorderPoint: 10, description: 'AirPods Pro (2nd Generation) with MagSafe Charging Case (USB-C).' },
        { id: 4, name: 'iPad Air 5', code: 'IPAD-AIR5', onHand: 18, sold: 67, unitCost: 'PHP 35,990.00', sales: 'PHP 2,411,330.00', category: 'Tablets', reorderPoint: 10, description: 'iPad Air (5th Generation) Wi-Fi 64GB storage, Blue color.' },
        { id: 5, name: 'Apple Watch S9', code: 'WATCH-S9', onHand: 31, sold: 94, unitCost: 'PHP 26,490.00', sales: 'PHP 2,490,060.00', category: 'Wearables', reorderPoint: 10, description: 'Apple Watch Series 9 GPS 41mm Midnight Aluminum Case with Sport Band.' },
    ];

    const [inventory, setInventory] = useState(initialInventory);
    const [categoryFilter, setCategoryFilter] = useState('All Categories');
    const [searchQuery, setSearchQuery] = useState('');

    const handleDeleteProduct = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            setInventory(prev => prev.filter(item => item.id !== id));
        }
    };

    const handleExport = () => {
        // Simple CSV generation
        const headers = ['Product', 'Code', 'Category', 'Sold', 'On-Hand', 'Unit Cost', 'Total Sales'];
        const rows = inventory.map(item => [
            item.name,
            item.code,
            item.category,
            item.sold,
            item.onHand,
            item.unitCost ? item.unitCost.replace(/,/g, '') : 'PHP 0.00',
            item.sales.replace(/,/g, '') // Remove commas for CSV
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
            const matchesCategory = categoryFilter === 'All Categories' || item.category === categoryFilter;
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 item.code.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [inventory, categoryFilter, searchQuery]);

    const stats = useMemo(() => {
        const totalSold = filteredInventory.reduce((acc, item) => acc + (item.sold || 0), 0);
        const totalOnHand = filteredInventory.reduce((acc, item) => acc + (item.onHand || 0), 0);
        const totalSales = filteredInventory.reduce((acc, item) => {
            const salesStr = item.sales || 'PHP 0.00';
            const val = parseFloat(salesStr.replace(/[^0-9.]/g, '')) || 0;
            return acc + val;
        }, 0);

        return [
            { label: 'Total Sold', value: `${totalSold.toLocaleString()} Units`, icon: (
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            )},
            { label: 'On-Hand Stock', value: `${totalOnHand.toLocaleString()} Units`, icon: (
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
            )},
            { label: 'Total Sales', value: `PHP ${(totalSales / 1000000).toFixed(1)}M`, icon: (
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
                                        {categoryFilter}
                                    </div>
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content align="left" width="48" contentClasses="py-2 bg-white shadow-xl border border-gray-100 rounded-xl">
                                {['All Categories', 'Phones', 'Laptops', 'Accessories', 'Tablets', 'Wearables'].map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setCategoryFilter(cat)}
                                        className={`block w-full px-4 py-2.5 text-start text-sm font-bold transition-colors ${categoryFilter === cat ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        {cat}
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
                                    <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-widest text-gray-400 w-[22%]">Product</th>
                                    <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-widest text-gray-400 w-[15%]">Sold</th>
                                    <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-widest text-gray-400 w-[15%]">On-Hand</th>
                                    <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-widest text-gray-400 w-[18%]">Total Sales</th>
                                    <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-widest text-gray-400 w-[15%]">Status</th>
                                    <th className="px-6 py-5 w-[15%] text-right"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredInventory.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer border-b border-gray-50 last:border-0">
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-gray-900 group-hover:text-black transition-colors">{item.name}</span>
                                                <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-tighter mt-0.5">{item.code} • {item.category}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-left">
                                            <span className="font-bold text-gray-700">{item.sold}</span>
                                        </td>
                                        <td className="px-6 py-5 text-left">
                                            <span className={`font-black ${item.onHand < 15 ? 'text-red-600' : item.onHand < 25 ? 'text-amber-600' : 'text-emerald-600'}`}>
                                                {item.onHand}
                                            </span>
                                        </td>

                                        <td className="px-6 py-5 font-black text-gray-900">
                                            {item.sales}
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                item.onHand <= (item.reorderPoint / 2) ? 'bg-red-50 text-red-700' : 
                                                item.onHand <= item.reorderPoint ? 'bg-amber-50 text-amber-700' : 
                                                'bg-emerald-50 text-emerald-700'
                                            }`}>
                                                {item.onHand <= (item.reorderPoint / 2) ? 'Critical' : 
                                                 item.onHand <= item.reorderPoint ? 'Low Stock' : 
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
                    setInventory(prev => [newProduct, ...prev]);
                    setIsModalOpen(false);
                }}
                onUpdate={(updatedProduct) => {
                    setInventory(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
                    setIsModalOpen(false);
                    setEditingProduct(null);
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
