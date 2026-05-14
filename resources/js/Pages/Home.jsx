import { Head, Link } from '@inertiajs/react';
import React, { useState } from 'react';
import LoginModal from '@/Components/LoginModal';
import RegisterModal from '@/Components/RegisterModal';
import ForgotPasswordModal from '@/Components/ForgotPasswordModal';

export default function Home({ auth }) {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);

    const openLogin = () => {
        setIsRegisterModalOpen(false);
        setIsForgotPasswordModalOpen(false);
        setIsLoginModalOpen(true);
    };

    const openRegister = () => {
        setIsLoginModalOpen(false);
        setIsForgotPasswordModalOpen(false);
        setIsRegisterModalOpen(true);
    };

    const openForgotPassword = () => {
        setIsLoginModalOpen(false);
        setIsRegisterModalOpen(false);
        setIsForgotPasswordModalOpen(true);
    };
    const categories = [
        { name: 'Mac', price: 'From ₱36,990', icon: (
            <svg className="w-12 h-12 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="12" rx="2" strokeWidth={1.5} /><path d="M8 20h8m-4-4v4" strokeWidth={1.5} strokeLinecap="round" /></svg>
        )},
        { name: 'iPhone', price: 'From ₱24,990', icon: (
            <svg className="w-12 h-12 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="7" y="2" width="10" height="20" rx="2" strokeWidth={1.5} /><path d="M12 18h.01" strokeWidth={2} strokeLinecap="round" /></svg>
        )},
        { name: 'iPad', price: 'From ₱18,990', icon: (
            <svg className="w-12 h-12 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="2" strokeWidth={1.5} /><path d="M12 18h.01" strokeWidth={2} strokeLinecap="round" /></svg>
        )},
        { name: 'WATCH', price: 'From ₱9,000', icon: (
            <svg className="w-12 h-12 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="7" y="6" width="10" height="12" rx="3" strokeWidth={1.5} /><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2m-6 12v2a1 1 0 001 1h4a1 1 0 001-1v-2" strokeWidth={1.5} strokeLinecap="round" /></svg>
        )},
        { name: 'Music', price: 'From ₱8,190', icon: (
            <svg className="w-12 h-12 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
        )},
        { name: 'TV & Home', price: 'From ₱8,000', icon: (
            <svg className="w-12 h-12 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
        )},
        { name: 'Accessories', price: 'From ₱100', icon: (
            <svg className="w-12 h-12 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
        )},
        { name: 'AirTag', price: 'From ₱1,890', icon: (
            <svg className="w-12 h-12 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
        )},
    ];

    return (
        <div className="h-screen overflow-hidden bg-white font-sans text-gray-900 selection:bg-black selection:text-white flex flex-col">
            <Head title="Home" />

            {/* Header */}
            <header className="shrink-0 bg-white/90 backdrop-blur-md border-b border-gray-100 px-8 py-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <img 
                        src="/powermac-logo.png" 
                        alt="Power Mac Center" 
                        className="h-14 object-contain" 
                    />
                    <img 
                        src="/apple-logo.png" 
                        alt="Apple Partner" 
                        className="h-12 object-contain" 
                    />
                </div>

                <nav className="flex items-center gap-8 text-sm font-semibold">
                    {!auth.user && (
                        <>
                            <Link 
                                href="/"
                                className="text-black transition-colors uppercase tracking-widest text-[11px] font-black border-b-2 border-black pb-1"
                            >
                                Home
                            </Link>
                            <Link 
                                href={route('about')}
                                className="text-gray-500 hover:text-black transition-colors uppercase tracking-widest text-[11px] font-black pb-1"
                            >
                                About
                            </Link>
                        </>
                    )}
                    {auth.user ? (
                        <Link 
                            href={route('dashboard')} 
                            className="px-6 py-2.5 bg-black text-white rounded-full hover:bg-gray-800 transition-colors tracking-wide"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <button 
                            onClick={() => setIsLoginModalOpen(true)}
                            className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors tracking-wide shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all"
                        >
                            Log in
                        </button>
                    )}
                </nav>
            </header>

            <LoginModal 
                isOpen={isLoginModalOpen} 
                onClose={() => setIsLoginModalOpen(false)} 
                onSwitchToRegister={openRegister}
                onSwitchToForgotPassword={openForgotPassword}
            />

            <RegisterModal
                isOpen={isRegisterModalOpen}
                onClose={() => setIsRegisterModalOpen(false)}
                onSwitchToLogin={openLogin}
            />

            <ForgotPasswordModal
                isOpen={isForgotPasswordModalOpen}
                onClose={() => setIsForgotPasswordModalOpen(false)}
                onSwitchToLogin={openLogin}
            />

            {/* Hero Section */}
            <main className="flex-1 min-h-0 w-full overflow-hidden">
                <img 
                    src="/hero.png" 
                    alt="Hero" 
                    className="w-full h-full object-cover" 
                />
            </main>

            {/* Categories Strip */}
            <section className="shrink-0 bg-white py-8 lg:py-12 px-6 border-t border-gray-100">
                <div className="max-w-[1400px] mx-auto flex flex-wrap justify-center md:justify-between items-end gap-x-8 gap-y-6">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center group cursor-pointer hover:-translate-y-1 transition-transform">
                            <div className="mb-2 lg:mb-4 text-gray-700 group-hover:text-black transition-colors scale-75 lg:scale-100">
                                {cat.icon}
                            </div>
                            <h3 className="font-bold text-[#1d1d1f] text-[12px] lg:text-sm mb-0.5">{cat.name}</h3>
                            <p className="text-[10px] text-[#86868b] font-medium tracking-wide">{cat.price}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
