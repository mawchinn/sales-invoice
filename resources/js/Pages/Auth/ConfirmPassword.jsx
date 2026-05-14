import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
            <header className="mb-8 text-center">
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Secure Area</h2>
                <p className="text-sm font-medium text-gray-500 mt-2">Please confirm your password to continue.</p>
            </header>

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="password" value="Password" className="text-[11px] font-black !text-black uppercase tracking-widest mb-2 ml-1" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="block w-full py-4 px-6 !bg-gray-100 !text-black !border-none rounded-2xl focus:ring-2 focus:ring-black focus:bg-white transition-all text-sm font-medium shadow-none placeholder:transition-opacity focus:placeholder:opacity-0"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="••••••••"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="pt-2">
                    <button 
                        disabled={processing}
                        className="w-full py-4 bg-black text-white rounded-2xl font-bold text-sm hover:bg-gray-800 transform active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg shadow-black/5"
                    >
                        Confirm Identity
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}
