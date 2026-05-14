import CreateProductModal from '@/Components/CreateProductModal';
import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';

export default function InventoryIndex() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const mockInventory = [
        { id: 1, name: 'iPhone 15 Pro', code: 'IP15-PRO', onHand: 24, sold: 156, sales: 'PHP 11,074,440.00', category: 'Phones' },
        { id: 2, name: 'MacBook Pro 14"', code: 'MBP-M3', onHand: 12, sold: 42, sales: 'PHP 4,199,580.00', category: 'Laptops' },
        { id: 3, name: 'AirPods Pro 2', code: 'AIRPODS-P2', onHand: 45, sold: 289, sales: 'PHP 4,332,110.00', category: 'Accessories' },
        { id: 4, name: 'iPad Air 5', code: 'IPAD-AIR5', onHand: 18, sold: 67, sales: 'PHP 2,411,330.00', category: 'Tablets' },
        { id: 5, name: 'Apple Watch S9', code: 'WATCH-S9', onHand: 31, sold: 94, sales: 'PHP 2,349,060.00', category: 'Wearables' },
    ];

    const handleExport = () => {
        // Simple CSV generation
        const headers = ['Product', 'Code', 'Category', 'Sold', 'On-Hand', 'Total Sales'];
        const rows = mockInventory.map(item => [
            item.name,
            item.code,
            item.category,
            item.sold,
            item.onHand,
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

    const stats = [
        { label: 'Total Sold', value: '648 Units', icon: (
            <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
        )},
        { label: 'On-Hand Stock', value: '130 Units', icon: (
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
        )},
        { label: 'Total Sales', value: 'PHP 24.3M', icon: (
            <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3 1.343 3 3-1.343 3-3 3m0-14c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3m0 18v-2m0-14V5" /></svg>
        )},
    ];

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
                            onClick={() => setIsModalOpen(true)}
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

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50 text-gray-400">
                                <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-widest text-gray-400">Product Info</th>
                                <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-widest text-gray-400">Sold</th>
                                <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-widest text-gray-400">On-Hand</th>
                                <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-widest text-gray-400">Total Sales</th>
                                <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-widest text-gray-400">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {mockInventory.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer border-b border-gray-50 last:border-0">
                                    <td className="px-6 py-3.5">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-900 group-hover:text-black transition-colors">{item.name}</span>
                                            <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-tighter mt-0.5">{item.code} • {item.category}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3.5">
                                        <span className="font-bold text-gray-700">{item.sold}</span>
                                    </td>
                                    <td className="px-6 py-3.5">
                                        <span className={`font-black ${item.onHand < 15 ? 'text-red-600' : item.onHand < 25 ? 'text-amber-600' : 'text-emerald-600'}`}>
                                            {item.onHand}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3.5 font-black text-gray-900">
                                        {item.sales}
                                    </td>
                                    <td className="px-6 py-3.5">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                            item.onHand < 15 ? 'bg-red-50 text-red-700' : item.onHand < 25 ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                                        }`}>
                                            {item.onHand < 15 ? 'Critical' : item.onHand < 25 ? 'Low Stock' : 'In Stock'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <CreateProductModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </SidebarLayout>
    );
}
