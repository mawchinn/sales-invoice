import { Head, Link } from '@inertiajs/react';
import React, { useState } from 'react';
import LoginModal from '@/Components/LoginModal';
import RegisterModal from '@/Components/RegisterModal';
import ForgotPasswordModal from '@/Components/ForgotPasswordModal';

export default function About({ auth }) {
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

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-black selection:text-white flex flex-col">
            <Head title="About Us" />

            {/* Header - Replicated from Home for consistency */}
            <header className="shrink-0 bg-white/90 backdrop-blur-md border-b border-gray-100 px-8 py-5 flex items-center justify-between sticky top-0 z-50">
                <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
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
                </Link>

                <nav className="flex items-center gap-8 text-sm font-semibold">
                    <Link 
                        href="/"
                        className="text-gray-500 hover:text-black transition-colors uppercase tracking-widest text-[11px] font-black pb-1"
                    >
                        Home
                    </Link>
                    <Link 
                        href={route('about')}
                        className="text-black transition-colors uppercase tracking-widest text-[11px] font-black border-b-2 border-black pb-1"
                    >
                        About
                    </Link>
                    {auth.user ? (
                        <Link 
                            href={route('dashboard')} 
                            className="px-6 py-2.5 bg-black text-white rounded-full hover:bg-gray-800 transition-colors tracking-wide shadow-lg shadow-black/10"
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

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto px-8 pt-12 pb-20 lg:pt-20 lg:pb-32">
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-6 block">Our Legacy</span>
                        <h1 className="text-5xl lg:text-7xl font-black text-gray-900 tracking-tighter mb-12 leading-[0.9]">
                            Precision and <br/>
                            <span className="text-gray-400">Elegance in Every <br/> Transaction.</span>
                        </h1>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                            <div className="space-y-6">
                                <p className="text-lg font-bold text-gray-800 leading-relaxed">
                                    The Power Mac Center Sales & Invoice Portal is a custom-built solution designed to mirror the excellence of the Apple products we represent.
                                </p>
                                <p className="text-gray-500 font-medium leading-relaxed">
                                    Our platform streamlines complex business workflows into a seamless, high-performance experience. From real-time inventory tracking across all branches to precise tax-compliant invoicing, we ensure that the backend of your business is as refined as the products on your shelves.
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-[32px] p-8 border border-gray-100 shadow-sm">
                                <h3 className="text-xs font-black text-black uppercase tracking-widest mb-8">System Statistics</h3>
                                <div className="space-y-6">
                                    <div className="flex justify-between items-end pb-4 border-b border-gray-200">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Platform Version</span>
                                        <span className="font-black text-gray-900">v2.4.0 High-Sierra</span>
                                    </div>
                                    <div className="flex justify-between items-end pb-4 border-b border-gray-200">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Global Status</span>
                                        <span className="font-black text-emerald-600">Operational</span>
                                    </div>
                                    <div className="flex justify-between items-end pb-4 border-b border-gray-200">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Security Encryption</span>
                                        <span className="font-black text-gray-900">AES-256 Bit</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-32 pt-16 border-t border-gray-100">
                            <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.4em] mb-12">Core Values</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                <div>
                                    <h3 className="text-lg font-black text-gray-900 mb-4">Innovation</h3>
                                    <p className="text-sm text-gray-500 font-medium leading-relaxed">Constantly evolving our tech stack to provide the fastest data rendering in the industry.</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-gray-900 mb-4">Precision</h3>
                                    <p className="text-sm text-gray-500 font-medium leading-relaxed">Every decimal point in our invoicing is calculated with military-grade accuracy.</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-gray-900 mb-4">Integrity</h3>
                                    <p className="text-sm text-gray-500 font-medium leading-relaxed">A secure, transparent audit trail for every transaction made within the portal.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="bg-gray-50 py-12 px-8 border-t border-gray-100 mt-20">
                    <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">© 2026 Power Mac Center Inc. All Rights Reserved.</p>
                        <div className="flex gap-8">
                            <Link href="/" className="text-[10px] font-black text-gray-400 hover:text-black uppercase tracking-widest transition-colors">Home</Link>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Privacy</span>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Terms</span>
                        </div>
                    </div>
                </footer>
            </main>

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
                onBackToLogin={openLogin}
            />
        </div>
    );
}
