import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <header className="mb-8 text-center">
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Verify Email</h2>
                <p className="text-sm font-medium text-gray-500 mt-2">One last step to secure your account.</p>
            </header>

            <div className="mb-8 text-sm font-medium text-gray-500 leading-relaxed text-center">
                Thanks for signing up! Please verify your email address by clicking the link we just sent you. If you didn't receive it, we'll gladly send another.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-8 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-sm font-bold text-emerald-700 text-center animate-in fade-in slide-in-from-top-2 duration-300">
                    A new verification link has been sent to your email address.
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <button 
                    disabled={processing}
                    className="w-full py-4 bg-black text-white rounded-2xl font-bold text-sm hover:bg-gray-800 transform active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg shadow-black/5"
                >
                    Resend Verification Email
                </button>

                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="w-full py-3 text-xs font-black text-gray-400 hover:text-red-600 uppercase tracking-widest transition-colors"
                >
                    Log Out
                </Link>
            </form>
        </GuestLayout>
    );
}
