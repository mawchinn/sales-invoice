import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                    Profile Information
                </h2>

                <p className="mt-2 text-sm font-medium text-gray-500">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-10 space-y-8">
                <div>
                    <InputLabel htmlFor="name" value="Full Name" className="text-[11px] font-black !text-black uppercase tracking-widest mb-3 ml-1" />

                    <TextInput
                        id="name"
                        className="block w-full py-4 px-6 !bg-gray-100 !text-black !border-none rounded-2xl focus:ring-2 focus:ring-black focus:bg-white transition-all text-sm font-medium shadow-none placeholder:transition-opacity focus:placeholder:opacity-0"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email Address" className="text-[11px] font-black !text-black uppercase tracking-widest mb-3 ml-1" />

                    <TextInput
                        id="email"
                        type="email"
                        className="block w-full py-4 px-6 !bg-gray-100 !text-black !border-none rounded-2xl focus:ring-2 focus:ring-black focus:bg-white transition-all text-sm font-medium shadow-none placeholder:transition-opacity focus:placeholder:opacity-0"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                        <p className="text-sm font-medium text-amber-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="ml-2 font-bold underline hover:text-amber-900 transition-colors"
                            >
                                Re-send verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-xs font-bold text-emerald-600 uppercase tracking-wider">
                                A new verification link has been sent.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-6 pt-2">
                    <button 
                        disabled={processing}
                        className="px-10 py-4 bg-black text-white rounded-2xl font-bold text-sm hover:bg-gray-800 transform active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg shadow-black/5"
                    >
                        Save Changes
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0 translate-x-2"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0 translate-x-2"
                    >
                        <p className="text-sm font-bold text-emerald-600 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                            Saved Successfully
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
