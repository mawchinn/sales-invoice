import InvoiceTemplate from '@/Components/InvoiceTemplate';
import { Head } from '@inertiajs/react';

export default function Invoice() {
    return (
        <div className="min-h-screen bg-gray-100 py-10 print:py-0 print:bg-white flex justify-center">
            <Head title="Sales Invoice" />
            <InvoiceTemplate />
        </div>
    );
}