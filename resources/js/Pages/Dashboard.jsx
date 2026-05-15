import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head, Link } from '@inertiajs/react';
import React, { useState } from 'react';
import CreateInvoiceModal from '@/Components/CreateInvoiceModal';
import CreateProductModal from '@/Components/CreateProductModal';

export default function Dashboard() {
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);

    const stats = [
        { label: 'Total Revenue', value: 'PHP 2.4M', growth: '+12.5%', link: 'reports.index', icon: (
            <span className="text-lg font-black text-emerald-500 leading-none">₱</span>
        )},
        { label: 'Active Invoices', value: '1,284', growth: '+3.2%', link: 'invoices.index', icon: (
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
        )},
        { label: 'Total Products', value: '458', growth: '+8 new', link: 'inventory.index', icon: (
            <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
        )},
        { label: 'Avg. Order Value', value: 'PHP 18.5k', growth: '+5.4%', link: 'reports.index', icon: (
            <span className="text-lg font-black text-amber-500 leading-none">₱</span>
        )},
    ];

    const recentActivity = [
        { id: 1, type: 'Invoice', user: 'Marcin Pascua', action: 'created Invoice #11792', time: '2 mins ago' },
        { id: 2, type: 'Stock', user: 'Inventory Bot', action: 'restocked AirPods Pro 2 (+50 units)', time: '15 mins ago' },
        { id: 3, type: 'Payment', user: 'System', action: 'received payment for Invoice #11784', time: '1 hour ago' },
        { id: 4, type: 'Report', user: 'Marcin Pascua', action: 'generated Monthly Sales Report', time: '3 hours ago' },
    ];

    const topProducts = [
        { name: 'iPhone 15 Pro', sales: 156, growth: '+12%' },
        { name: 'AirPods Pro 2', sales: 289, growth: '+24%' },
        { name: 'MacBook Pro 14"', sales: 42, growth: '+5%' },
    ];

    return (
        <SidebarLayout>
            <Head title="Dashboard Overview" />
            
            <div className="flex flex-col gap-10 pb-10">
                {/* Greeting & Quick Actions */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <div>
                        <h1 className="text-5xl font-black text-gray-900 tracking-tight">Overview</h1>
                        <p className="text-lg font-medium text-gray-500 mt-2">Welcome back, Marcin. Here's what's happening today.</p>
                    </div>
                    
                    <div className="flex gap-3 shrink-0">
                        <button 
                            onClick={() => setIsInvoiceModalOpen(true)}
                            className="flex items-center gap-3 px-5 py-3 bg-white border border-gray-100 rounded-2xl hover:border-black/10 hover:shadow-md transition-all group"
                        >
                            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                            </div>
                            <p className="text-xs font-bold text-gray-900">New Invoice</p>
                        </button>
                        <button 
                            onClick={() => setIsProductModalOpen(true)}
                            className="flex items-center gap-3 px-5 py-3 bg-white border border-gray-100 rounded-2xl hover:border-black/10 hover:shadow-md transition-all group"
                        >
                            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-all">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 7l-8-4-8 4" /></svg>
                            </div>
                            <p className="text-xs font-bold text-gray-900">Add Product</p>
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, idx) => (
                        <Link 
                            key={idx} 
                            href={route(stat.link)}
                            className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:border-black/10 hover:shadow-md hover:-translate-y-1 transition-all group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                                    {stat.icon}
                                </div>
                                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg uppercase tracking-wider">
                                    {stat.growth}
                                </span>
                            </div>
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
                            <p className="text-2xl font-black text-gray-900 tracking-tight">{stat.value}</p>
                        </Link>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Activity Feed */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-black text-gray-900">Recent Activity</h2>
                            <Link href={route('invoices.index')} className="text-xs font-bold text-gray-400 hover:text-black transition-colors uppercase tracking-widest">View All</Link>
                        </div>
                        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
                            <div className="divide-y divide-gray-50">
                                {recentActivity.map((activity) => {
                                    const getRoute = () => {
                                        switch(activity.type) {
                                            case 'Invoice':
                                            case 'Payment': return 'invoices.index';
                                            case 'Stock': return 'inventory.index';
                                            case 'Report': return 'reports.index';
                                            default: return 'dashboard';
                                        }
                                    };

                                    return (
                                        <Link 
                                            key={activity.id} 
                                            href={route(getRoute())}
                                            className="p-6 hover:bg-gray-50/50 transition-colors flex items-center justify-between group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-2 h-2 rounded-full bg-gray-300 group-hover:bg-black transition-colors"></div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-700">
                                                        <span className="font-bold text-black">{activity.user}</span> {activity.action}
                                                    </p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{activity.time} • {activity.type}</p>
                                                </div>
                                            </div>
                                            <svg className="w-4 h-4 text-gray-300 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Top Products & Quick Actions */}
                    <div className="space-y-8">
                        {/* Top Products */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-black text-gray-900">Top Performers</h2>
                            <div className="bg-black text-white rounded-[32px] p-8 shadow-xl shadow-black/20">
                                <div className="space-y-6">
                                    {topProducts.map((product, idx) => (
                                        <div key={idx} className="flex items-center justify-between border-b border-white/10 pb-4 last:border-0 last:pb-0">
                                            <div>
                                                <p className="font-bold text-white leading-none mb-1">{product.name}</p>
                                                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">{product.sales} Sales</p>
                                            </div>
                                            <span className="text-xs font-black text-emerald-400">{product.growth}</span>
                                        </div>
                                    ))}
                                </div>
                                <Link 
                                    href={route('reports.index')}
                                    className="block w-full mt-8 py-4 bg-white text-black rounded-2xl font-bold text-sm hover:bg-gray-100 transition-all text-center"
                                >
                                    Full Sales Report
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <CreateInvoiceModal 
                isOpen={isInvoiceModalOpen} 
                onClose={() => setIsInvoiceModalOpen(false)} 
            />

            <CreateProductModal 
                isOpen={isProductModalOpen} 
                onClose={() => setIsProductModalOpen(false)} 
            />
        </SidebarLayout>
    );
}
