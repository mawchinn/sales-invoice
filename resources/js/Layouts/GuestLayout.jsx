import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 selection:bg-black selection:text-white">
            <div className="mb-10">
                <Link href="/" className="transition-transform hover:scale-105 inline-block">
                    <img src="/powermac-logo.png" alt="Power Mac Center" className="h-16 object-contain" />
                </Link>
            </div>

            <div className="w-full max-w-md bg-white p-10 rounded-[40px] shadow-2xl shadow-black/5 border border-gray-100 animate-in fade-in zoom-in duration-500">
                {children}
            </div>
            
            <p className="mt-8 text-xs font-bold text-gray-400 uppercase tracking-widest">
                © 2024 Power Mac Center
            </p>
        </div>
    );
}
