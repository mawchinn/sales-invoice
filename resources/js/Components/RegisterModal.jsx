import React from 'react';
import { useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
    if (!isOpen) return null;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
            onSuccess: () => onClose(),
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl transform transition-all animate-in fade-in zoom-in duration-300">
                <div className="p-10">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Create Account</h2>
                            <p className="text-sm font-medium text-gray-500 mt-2">Join us to start managing your business.</p>
                        </div>
                        <button 
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <InputLabel htmlFor="name" value="Full Name" className="text-[11px] font-black !text-black uppercase tracking-widest mb-2 ml-1" />
                            <TextInput
                                id="name"
                                value={data.name}
                                className="block w-full py-3 !bg-gray-100 !text-black !border-none rounded-2xl focus:ring-2 focus:ring-black focus:bg-white transition-all text-sm font-medium shadow-none placeholder:transition-opacity focus:placeholder:opacity-0"
                                autoComplete="name"
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="John Doe"
                                required
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Email Address" className="text-[11px] font-black !text-black uppercase tracking-widest mb-2 ml-1" />
                            <TextInput
                                id="email"
                                type="email"
                                value={data.email}
                                className="block w-full py-3 !bg-gray-100 !text-black !border-none rounded-2xl focus:ring-2 focus:ring-black focus:bg-white transition-all text-sm font-medium shadow-none placeholder:transition-opacity focus:placeholder:opacity-0"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="name@example.com"
                                required
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="Password" className="text-[11px] font-black !text-black uppercase tracking-widest mb-2 ml-1" />
                            <TextInput
                                id="password"
                                type="password"
                                value={data.password}
                                className="block w-full py-3 !bg-gray-100 !text-black !border-none rounded-2xl focus:ring-2 focus:ring-black focus:bg-white transition-all text-sm font-medium shadow-none placeholder:transition-opacity focus:placeholder:opacity-0"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="text-[11px] font-black !text-black uppercase tracking-widest mb-2 ml-1" />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                className="block w-full py-3 !bg-gray-100 !text-black !border-none rounded-2xl focus:ring-2 focus:ring-black focus:bg-white transition-all text-sm font-medium shadow-none placeholder:transition-opacity focus:placeholder:opacity-0"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        <button 
                            className="w-full py-3 bg-black text-white rounded-2xl font-bold text-sm hover:bg-gray-800 transform active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg shadow-black/5 mt-4"
                            disabled={processing}
                        >
                            {processing ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                        <p className="text-sm font-medium text-gray-500">
                            Already have an account? <button onClick={onSwitchToLogin} className="text-black font-bold hover:underline">Log in</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
