import React from 'react';

export default function AboutModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" 
                onClick={onClose}
            ></div>
            
            <div className="relative w-full max-w-xl bg-white rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="p-8 sm:p-12">
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-2">About the System</h2>
                            <p className="text-gray-500 font-medium">Power Mac Center Sales & Invoice Portal</p>
                        </div>
                        <button 
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Our Mission</h3>
                            <p className="text-gray-600 leading-relaxed font-medium text-sm">
                                Designed specifically for Power Mac Center, this portal streamlines the sales and invoicing workflow. We provide a high-performance, secure environment for managing Apple product inventory and customer transactions with precision and elegance.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                                <h4 className="text-[10px] font-black text-black uppercase tracking-widest mb-2">Version</h4>
                                <p className="text-lg font-black text-gray-900">2.4.0</p>
                            </div>
                            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                                <h4 className="text-[10px] font-black text-black uppercase tracking-widest mb-2">Status</h4>
                                <p className="text-lg font-black text-emerald-600">Secure</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Core Features</h3>
                            <ul className="grid grid-cols-2 gap-3 text-xs font-bold text-gray-700">
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                                    Real-time Inventory
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                                    Dynamic Reporting
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                                    Invoice Generation
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                                    Automated VAT
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-50 flex items-center justify-between">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">© 2026 Power Mac Center Inc.</p>
                        <button 
                            onClick={onClose}
                            className="px-8 py-3 bg-black text-white rounded-full font-bold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-black/10 hover:shadow-xl active:scale-[0.98]"
                        >
                            Got it
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
