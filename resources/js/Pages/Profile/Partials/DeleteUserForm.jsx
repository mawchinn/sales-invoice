import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                    Delete Account
                </h2>

                <p className="mt-2 text-sm font-medium text-gray-500">
                    Once your account is deleted, all of its resources and data will be permanently deleted.
                </p>
            </header>

            <button 
                onClick={confirmUserDeletion}
                className="px-8 py-4 bg-red-600 text-white rounded-2xl font-bold text-sm hover:bg-red-700 transform active:scale-[0.98] transition-all shadow-lg shadow-red-500/10"
            >
                Permanently Delete Account
            </button>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-10">
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                        Confirm Deletion
                    </h2>

                    <p className="mt-3 text-sm font-medium text-gray-500 leading-relaxed">
                        This action cannot be undone. Please enter your password to confirm you would like to permanently delete your account.
                    </p>

                    <div className="mt-8">
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="text-[11px] font-black !text-black uppercase tracking-widest mb-3 ml-1"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="block w-full py-4 px-6 !bg-gray-100 !text-black !border-none rounded-2xl focus:ring-2 focus:ring-black focus:bg-white transition-all text-sm font-medium shadow-none placeholder:transition-opacity focus:placeholder:opacity-0"
                            isFocused
                            placeholder="Enter password to confirm"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-10 flex gap-3">
                        <button 
                            type="button"
                            onClick={closeModal}
                            className="flex-1 py-4 bg-gray-100 text-gray-900 rounded-2xl font-bold text-sm hover:bg-gray-200 transition-all"
                        >
                            Keep Account
                        </button>

                        <button 
                            className="flex-1 py-4 bg-red-600 text-white rounded-2xl font-bold text-sm hover:bg-red-700 transition-all disabled:opacity-50"
                            disabled={processing}
                        >
                            Delete Forever
                        </button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
