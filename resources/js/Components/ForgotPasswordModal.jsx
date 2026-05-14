import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function ForgotPasswordModal({ isOpen, onClose, onSwitchToLogin }) {
    if (!isOpen) return null;

    const { status } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'), {
            onSuccess: () => {
                // Usually we'd show a success message here, but for now we'll just keep it simple
            }
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
                            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Reset Password</h2>
                            <p className="text-sm font-medium text-gray-500 mt-2">We'll email you a link to reset your password.</p>
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
                    
                    {status && (
                        <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-2xl border border-emerald-100 animate-in fade-in slide-in-from-top-1 duration-300">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
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

                        <button 
                            className="w-full py-3 bg-black text-white rounded-2xl font-bold text-sm hover:bg-gray-800 transform active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg shadow-black/5"
                            disabled={processing}
                        >
                            {processing ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                        <p className="text-sm font-medium text-gray-500">
                            Remembered your password? <button onClick={onSwitchToLogin} className="text-black font-bold hover:underline">Log in</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
