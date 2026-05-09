import { Link, usePage } from '@inertiajs/react';
import React, { useState } from 'react';

export default function SidebarLayout({ children }) {
    const user = usePage().props.auth.user;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                    <Link 
                        href={route('dashboard')} 
                        className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${route().current('dashboard') ? 'bg-black text-white shadow-md shadow-gray-300/50' : 'text-gray-500 hover:bg-gray-50 hover:text-black'}`}
                    >
                        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                        <span className="tracking-wide">Home</span>
                    </Link>

                    <div className="pt-6 pb-2">
                        <p className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Sales & Finance</p>
                    </div>

                    <Link 
                        href={route('invoices.index')} 
                        className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${route().current('invoices.*') ? 'bg-black text-white shadow-md shadow-gray-300/50' : 'text-gray-500 hover:bg-gray-50 hover:text-black'}`}
                    >
                        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        <span className="tracking-wide">Invoices</span>
                    </Link>
                </nav>

                {/* Bottom User Area on Sidebar (Optional/Minimal) */}
                <div className="p-4 border-t border-gray-50 shrink-0">
                    <Link 
                        href={route('logout')} 
                        method="post" 
                        as="button" 
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-500 hover:bg-gray-50 hover:text-black transition-all duration-200"
                    >
                        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        <span className="font-medium tracking-wide">Logout</span>
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
                        
                        <div className="hidden md:flex relative w-full max-w-md group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-black transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>
                            <input type="text" placeholder="Search for anything..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/20 text-sm transition-all duration-200 placeholder-gray-400 font-medium" />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 lg:gap-6">
                        <button className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-black transition-colors px-2 py-1 rounded-md hover:bg-gray-50">
                            En
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </button>
                        
                        <button className="p-2 text-gray-400 hover:text-black relative rounded-lg hover:bg-gray-50 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-black rounded-full border-2 border-white"></span>
                        </button>
                        
                        <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
                        
                        <div className="flex items-center gap-3 cursor-pointer group px-1 py-1 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 group-hover:border-gray-300 transition-colors shrink-0">
                                <span className="text-gray-600 font-bold text-sm tracking-wider">{user?.name?.charAt(0) || 'U'}</span>
                            </div>
                            <div className="hidden lg:block text-sm">
                                <p className="font-semibold text-gray-900 leading-none mb-1">{user?.name || 'User'}</p>
                                <p className="text-gray-500 text-xs font-medium">Administrator</p>
                            </div>
                            <svg className="w-4 h-4 text-gray-400 hidden lg:block group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </div>
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
