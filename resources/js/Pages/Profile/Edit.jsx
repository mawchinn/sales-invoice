import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <SidebarLayout>
            <Head title="Profile" />

            <div className="flex flex-col gap-10 pb-10">
                <div>
                    <h1 className="text-5xl font-black text-gray-900 tracking-tight">Settings</h1>
                    <p className="text-lg font-medium text-gray-500 mt-2">Manage your account preferences and security.</p>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    <div className="bg-white p-8 lg:p-12 rounded-[32px] border border-gray-100 shadow-sm">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-2xl"
                        />
                    </div>

                    <div className="bg-white p-8 lg:p-12 rounded-[32px] border border-gray-100 shadow-sm">
                        <UpdatePasswordForm className="max-w-2xl" />
                    </div>

                    <div className="bg-white p-8 lg:p-12 rounded-[32px] border border-red-50 shadow-sm">
                        <DeleteUserForm className="max-w-2xl" />
                    </div>
                </div>
            </div>
        </SidebarLayout>
    );
}
