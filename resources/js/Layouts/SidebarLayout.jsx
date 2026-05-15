import Dropdown from '@/Components/Dropdown';
import { Link, usePage, router } from '@inertiajs/react';
import React, { useState } from 'react';

export default function SidebarLayout({ children }) {
    const { props } = usePage();
    const user = props.auth?.user;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [notifications, setNotifications] = useState([
        { id: 1, title: 'New Invoice Created', description: 'Invoice #11792 for WHOLESALE INC', time: '2 mins ago', type: 'info' },
        { id: 2, title: 'Payment Received', description: 'Payment for Invoice #11784 received', time: '1 hour ago', type: 'success' },
        { id: 3, title: 'Invoice Overdue', description: 'Invoice #11787 is now 3 days overdue', time: '5 hours ago', type: 'warning' },
    ]);



    return (
        <div className="flex h-screen bg-[#f8f9fa] text-gray-900 font-sans selection:bg-black selection:text-white">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 shadow-[2px_0_8px_rgba(0,0,0,0.02)] transform transition-transform duration-300 ease-out md:translate-x-0 md:static md:inset-auto flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {/* Logo Area */}
                <div className="flex items-center justify-center h-24 border-b border-gray-50 px-8 shrink-0">
                    <Link href="/" className="transition-transform hover:scale-105">
                        <img src="/powermac-logo.png" alt="Power Mac Center" className="h-12 object-contain" />
                    </Link>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-4 py-6 overflow-y-auto space-y-1.5">
                    {user?.role === 'admin' && (
                        <Link 
                            href={route('dashboard')} 
                            className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${route().current('dashboard') ? 'bg-black text-white shadow-md shadow-gray-300/50' : 'text-gray-500 hover:bg-gray-50 hover:text-black'}`}
                        >
                            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                            <span className="tracking-wide">Dashboard</span>
                        </Link>
                    )}


                    <Link 
                        href={route('invoices.index')} 
                        className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${route().current('invoices.*') ? 'bg-black text-white shadow-md shadow-gray-300/50' : 'text-gray-500 hover:bg-gray-50 hover:text-black'}`}
                    >
                        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        <span className="tracking-wide">Invoices</span>
                    </Link>

                    {user?.role === 'admin' && (
                        <>
                            <Link 
                                href={route('inventory.index')} 
                                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${route().current('inventory.*') ? 'bg-black text-white shadow-md shadow-gray-300/50' : 'text-gray-500 hover:bg-gray-50 hover:text-black'}`}
                            >
                                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                                <span className="tracking-wide">Inventory</span>
                            </Link>

                            <Link 
                                href={route('reports.index')} 
                                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${route().current('reports.*') ? 'bg-black text-white shadow-md shadow-gray-300/50' : 'text-gray-500 hover:bg-gray-50 hover:text-black'}`}
                            >
                                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                <span className="tracking-wide">Reports</span>
                            </Link>
                        </>
                    )}
                </nav>

                <div className="p-4 shrink-0 border-t border-gray-50">
                    <Link 
                        href={route('logout')} 
                        method="post" 
                        as="button" 
                        className="flex items-center gap-3.5 w-full px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
                    >
                        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        <span className="tracking-wide">Logout</span>
                    </Link>
                </div>
            </aside>

            {/* Mobile overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 md:hidden transition-opacity" onClick={() => setIsMobileMenuOpen(false)}></div>
            )}

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                
                {/* Top Header */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 lg:px-10 z-10 shrink-0 sticky top-0">
                    <div className="flex items-center gap-4 flex-1">
                        <button className="md:hidden p-2 -ml-2 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-black transition-colors" onClick={() => setIsMobileMenuOpen(true)}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                        

                    </div>

                    <div className="flex items-center gap-4 lg:gap-6">
                        
                        <Link 
                            href={route('profile.edit')}
                            className="flex items-center gap-3 cursor-pointer group px-2 py-1.5 rounded-xl hover:bg-gray-50 transition-all active:scale-[0.98]"
                        >
                            <div className="hidden lg:block text-right">
                                <p className="text-[13px] font-bold text-gray-900 leading-none mb-1 group-hover:text-black transition-colors">{user?.name || 'User'}</p>
                                <p className="text-gray-500 text-[9px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">{user?.role || 'User'}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 group-hover:border-black/10 group-hover:shadow-sm transition-all shrink-0 overflow-hidden">
                                <span className="text-gray-600 font-bold text-sm tracking-wider group-hover:text-black transition-colors">{user?.name?.charAt(0) || 'U'}</span>
                            </div>
                        </Link>


                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="p-2 text-gray-400 hover:text-black relative rounded-lg hover:bg-gray-50 transition-colors focus:outline-none">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-black rounded-full border-2 border-white"></span>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content align="right" width="96" contentClasses="py-0 bg-white shadow-2xl border border-gray-100 overflow-hidden">
                                <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                                    <h3 className="font-bold text-sm text-gray-900">Notifications</h3>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-white px-2 py-0.5 rounded-md border border-gray-100 shadow-sm">3 New</span>
                                </div>
                                <div className="max-h-[350px] overflow-y-auto">
                                    {notifications.map((notif) => (
                                        <Link 
                                            key={notif.id} 
                                            href={route('invoices.index')}
                                            className="block p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer group"
                                        >
                                            <div className="flex gap-3">
                                                <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${notif.type === 'success' ? 'bg-emerald-500' : notif.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900 group-hover:text-black transition-colors">{notif.title}</p>
                                                    <p className="text-xs text-gray-500 mt-0.5 font-medium leading-relaxed">{notif.description}</p>
                                                    <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-wider">{notif.time}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <Link 
                                    href={route('invoices.index')}
                                    className="block w-full py-3 text-center text-xs font-bold text-gray-500 hover:text-black hover:bg-gray-50 transition-all border-t border-gray-50 uppercase tracking-widest"
                                >
                                    View All Notifications
                                </Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10">
                    <div className="mx-auto max-w-7xl">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
