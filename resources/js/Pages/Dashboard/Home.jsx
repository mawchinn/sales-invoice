import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head } from '@inertiajs/react';
import React from 'react';

export default function Home() {
    return (
        <SidebarLayout>
            <Head title="Home" />
            <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-gray-400">
                <svg className="w-24 h-24 mb-4 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <h2 className="text-xl font-medium text-gray-600">Welcome to the Dashboard</h2>
                <p className="text-sm mt-2 text-gray-400">Select an option from the sidebar to get started.</p>
            </div>
        </SidebarLayout>
    );
}
