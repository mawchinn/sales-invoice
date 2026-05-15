import CreateInvoiceModal from '@/Components/CreateInvoiceModal';
import Dropdown from '@/Components/Dropdown';
import InvoiceTemplate from '@/Components/InvoiceTemplate';
import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import React, { useState, useMemo, useEffect } from 'react';

const initialMockInvoices = [
    { id: 1, date: '17 Jan 2028', invoiceNumber: '11784', orderNumber: 'PO-9921', customerName: 'MARCIN A. PASCUA', address: '123 MAIN ST, MANDAUE CITY', status: 'CASH', dueDate: '17 Jan 2028', amount: 'PHP 70,990.00', balanceDue: 'PHP 0.00', items: [{ code: 'IP15-PRO', description: 'iPhone 15 Pro - 256GB Natural Titanium', cost: 70990.00, qty: 1 }], cashier: 'MMPONCE', salesPerson: 'LBSARINO' },
    { id: 2, date: '17 Jan 2028', invoiceNumber: '11785', orderNumber: 'PO-9922', customerName: 'RICARDO PASCUAL', address: '456 OAK AVE, CEBU CITY', status: 'CASH', dueDate: '20 Jan 2028', amount: 'PHP 26,490.00', balanceDue: 'PHP 26,490.00', items: [{ code: 'WATCH-S9', description: 'Apple Watch Series 9 GPS 41mm Midnight Aluminum', cost: 26490.00, qty: 1 }], cashier: 'MMPONCE', salesPerson: 'LBSARINO' },
    { id: 3, date: '16 Jan 2028', invoiceNumber: '11786', orderNumber: 'PO-9923', customerName: 'ELENA SANTOS', address: '789 PINE RD, LAPU-LAPU CITY', status: 'CASH', dueDate: '16 Feb 2028', amount: 'PHP 104,990.00', balanceDue: 'PHP 60,000.00', items: [{ code: 'MBP-M3', description: 'MacBook Pro 14" - M3 Chip 512GB Space Gray', cost: 104990.00, qty: 1 }], cashier: 'MMPONCE', salesPerson: 'LBSARINO' },
    { id: 4, date: '15 Jan 2028', invoiceNumber: '11787', orderNumber: 'PO-9924', customerName: 'RAFAEL MENDEZ', status: 'CASH', dueDate: '15 Feb 2028', amount: 'PHP 71,980.00', balanceDue: 'PHP 71,980.00', items: [{ code: 'IPAD-AIR5', description: 'iPad Air (5th Generation) Wi-Fi 64GB Blue', cost: 35990.00, qty: 2 }], cashier: 'MMPONCE', salesPerson: 'LBSARINO' },
    { id: 5, date: '14 Jan 2028', invoiceNumber: '11788', orderNumber: 'PO-9925', customerName: 'SOPHIA CHUA', status: 'CASH', dueDate: '14 Feb 2028', amount: 'PHP 171,960.00', balanceDue: 'PHP 76,105.00', items: [{ code: 'IP15-PRO', description: 'iPhone 15 Pro - 256GB Natural Titanium', cost: 70990.00, qty: 2 }, { code: 'AIRPODS-P2', description: 'AirPods Pro (2nd Generation)', cost: 14990.00, qty: 2 }], cashier: 'MMPONCE', salesPerson: 'LBSARINO' },
    { id: 6, date: '13 Jan 2028', invoiceNumber: '11789', orderNumber: 'PO-9926', customerName: 'GABRIEL REYES', status: 'CASH', dueDate: '13 Feb 2028', amount: 'PHP 224,970.00', balanceDue: 'PHP 224,970.00', items: [{ code: 'MBP-M3', description: 'MacBook Pro 14" - M3 Chip 512GB Space Gray', cost: 104990.00, qty: 2 }, { code: 'AIRPODS-P2', description: 'AirPods Pro (2nd Generation)', cost: 14990.00, qty: 1 }], cashier: 'MMPONCE', salesPerson: 'LBSARINO' },
    { id: 7, date: '12 Jan 2028', invoiceNumber: '11790', orderNumber: 'PO-9927', customerName: 'MARIA LEONOR', status: 'CASH', dueDate: '12 Jan 2028', amount: 'PHP 341,460.00', balanceDue: 'PHP 0.00', items: [{ code: 'MBP-M3', description: 'MacBook Pro 14" - M3 Chip 512GB Space Gray', cost: 104990.00, qty: 3 }, { code: 'WATCH-S9', description: 'Apple Watch Series 9 GPS 41mm Midnight Aluminum', cost: 26490.00, qty: 1 }], cashier: 'MMPONCE', salesPerson: 'LBSARINO' },
    { id: 8, date: '11 Jan 2028', invoiceNumber: '11791', orderNumber: 'PO-9928', customerName: 'ANTONIO LUNA', status: 'CASH', dueDate: '11 Feb 2028', amount: 'PHP 490,950.00', balanceDue: 'PHP 490,950.00', items: [{ code: 'MBP-M3', description: 'MacBook Pro 14" - M3 Chip 512GB Space Gray', cost: 104990.00, qty: 4 }, { code: 'IP15-PRO', description: 'iPhone 15 Pro - 256GB Natural Titanium', cost: 70990.00, qty: 1 }], cashier: 'MMPONCE', salesPerson: 'LBSARINO' },
    { id: 9, date: '10 Jan 2028', invoiceNumber: '11792', orderNumber: 'PO-9929', customerName: 'ISABELLA GARCIA', status: 'CASH', dueDate: '10 Feb 2028', amount: 'PHP 245,970.00', balanceDue: 'PHP 245,970.00', items: [{ code: 'MBP-M3', description: 'MacBook Pro 14" - M3 Chip 512GB Space Gray', cost: 104990.00, qty: 2 }, { code: 'IPAD-AIR5', description: 'iPad Air (5th Generation) Wi-Fi 64GB Blue', cost: 35990.00, qty: 1 }], cashier: 'MMPONCE', salesPerson: 'LBSARINO' },
];

export default function InvoicesIndex() {
    const { url } = usePage();
    
    const [invoices, setInvoices] = useState(initialMockInvoices);

    const handleDeleteInvoice = (invoiceNumber) => {
        if (confirm(`Are you sure you want to delete invoice #${invoiceNumber}?`)) {
            setInvoices(prev => prev.filter(invoice => invoice.invoiceNumber !== invoiceNumber));
        }
    };
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [invoiceToEdit, setInvoiceToEdit] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Initialize search query from URL if present
    const [searchQuery, setSearchQuery] = useState(() => {
        const params = new URLSearchParams(url.split('?')[1]);
        return params.get('search') || '';
    });
    
    const [statusFilter, setStatusFilter] = useState('CASH');
    const [currencyFilter, setCurrencyFilter] = useState('PHP');
    const [sortOrder, setSortOrder] = useState('Newest');

    // Update search query if URL changes (for global search from within the page)
    useEffect(() => {
        const params = new URLSearchParams(url.split('?')[1]);
        const search = params.get('search');
        if (search !== null) {
            setSearchQuery(search);
            setCurrentPage(1);
        }
    }, [url]);

    const filteredInvoices = useMemo(() => {
        return invoices
            .filter(invoice => {
                const matchesSearch = 
                    invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    invoice.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    invoice.orderNumber.toLowerCase().includes(searchQuery.toLowerCase());
                
                const matchesStatus = statusFilter === 'All Methods' || invoice.status === statusFilter;
                
                // For currency, we just check if the amount string contains the currency code
                const matchesCurrency = currencyFilter === 'All Currencies' || invoice.amount.includes(currencyFilter);
                
                return matchesSearch && matchesStatus && matchesCurrency;
            })
            .sort((a, b) => {
                if (sortOrder === 'Newest') return b.id - a.id;
                if (sortOrder === 'Oldest') return a.id - b.id;
                
                const amountA = parseFloat(a.amount.replace(/[^\d.-]/g, ''));
                const amountB = parseFloat(b.amount.replace(/[^\d.-]/g, ''));
                
                if (sortOrder === 'Amount: High to Low') return amountB - amountA;
                if (sortOrder === 'Amount: Low to High') return amountA - amountB;
                
                return 0;
            });
    }, [invoices, searchQuery, statusFilter, currencyFilter, sortOrder]);

    const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentInvoices = filteredInvoices.slice(startIndex, startIndex + itemsPerPage);

    const handleRefresh = () => {
        setSearchQuery('');
        setStatusFilter('CASH');
        setCurrencyFilter('PHP');
        setSortOrder('Newest');
        setCurrentPage(1);
    };

    const getStatusStyle = (status) => {
        switch(status) {
            case 'CASH': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
            case 'INSTALLMENT': return 'bg-amber-50 text-amber-600 border-amber-200';
            default: return 'bg-gray-50 text-gray-500 border-gray-200';
        }
    };

    return (
        <SidebarLayout>
            <Head title="Invoices" />
            
            <div className="flex flex-col gap-6 lg:gap-8 pb-10">
                
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Invoices</h1>
                        <p className="text-sm font-medium text-gray-500 mt-1">Manage and track your payment summaries.</p>
                    </div>
                    <button 
                        onClick={() => {
                            setInvoiceToEdit(null);
                            setIsModalOpen(true);
                        }}
                        className="bg-black hover:bg-gray-900 text-white px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all shadow-md shadow-black/10 hover:shadow-lg hover:-translate-y-0.5"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                        New Invoice
                    </button>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <button 
                        onClick={() => {
                            setStatusFilter('OPEN'); // Or logic to show both
                            setCurrentPage(1);
                        }}
                        className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex flex-col justify-between group hover:border-black/20 hover:shadow-lg transition-all cursor-pointer text-left w-full"
                    >
                        <div className="flex justify-between items-start mb-4 w-full">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-snug">Total<br/>Outstanding</span>
                            <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </div>
                        </div>
                        <div>
                            <div className="text-2xl font-black text-gray-900 tracking-tight">PHP 3,109</div>
                        </div>
                    </button>
                    
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] flex flex-col justify-between group hover:border-gray-200 transition-all cursor-default">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-snug mb-4">Due<br/>Today</span>
                        <div className="text-2xl font-black text-gray-900 tracking-tight">PHP 0.00</div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] flex flex-col justify-between group hover:border-gray-200 transition-all cursor-default">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-snug mb-4">Due Within<br/>30 Days</span>
                        <div className="text-2xl font-black text-gray-900 tracking-tight">PHP 0.00</div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] flex flex-col justify-between group hover:border-gray-200 transition-all cursor-default">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-snug mb-4">Overdue<br/>Invoice</span>
                        <div className="text-2xl font-black text-gray-900 tracking-tight">PHP 672.19</div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] flex flex-col justify-between group hover:border-gray-200 transition-all cursor-default">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-snug mb-4">Avg. Days<br/>to Get Paid</span>
                        <div className="text-2xl font-black text-gray-900 tracking-tight">0 <span className="text-lg font-bold text-gray-400">Days</span></div>
                    </div>
                </div>

                {/* Main Table Section */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col">
                    
                    {/* Toolbar */}
                    <div className="p-5 sm:p-6 border-b border-gray-100 flex flex-col lg:flex-row gap-5 items-center justify-between bg-gray-50/50">
                        <div className="relative w-full lg:w-80 group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-black transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>
                            <input 
                                type="text" 
                                placeholder="Search invoices..." 
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black/30 text-sm font-medium transition-all shadow-sm" 
                            />
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center justify-between gap-2 px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-colors shadow-sm">
                                        Sort: <span className="text-black">{sortOrder}</span>
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content align="right" width="48" contentClasses="py-2 bg-white shadow-xl border border-gray-100">
                                    {['Newest', 'Oldest', 'Amount: High to Low', 'Amount: Low to High'].map((order) => (
                                        <button
                                            key={order}
                                            onClick={() => {
                                                setSortOrder(order);
                                                setCurrentPage(1);
                                            }}
                                            className="block w-full px-4 py-2.5 text-start text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-black transition-colors"
                                        >
                                            {order}
                                        </button>
                                    ))}
                                </Dropdown.Content>
                            </Dropdown>

                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-gray-100 bg-white text-gray-400">
                                    <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest">Date</th>
                                    <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest">Invoice #</th>
                                    <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest">Order</th>
                                    <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest">Customer</th>

                                    <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-center">Qty</th>
                                    <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest">Unit Cost</th>
                                    <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest">Amount</th>
                                    <th className="px-4 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 bg-white">
                                {currentInvoices.map((invoice, idx) => {
                                    const totalQty = (invoice.items || []).reduce((acc, item) => acc + item.qty, 0);
                                    const firstItemCost = invoice.items && invoice.items.length > 0 ? invoice.items[0].cost : 0;
                                    const hasMultipleItems = invoice.items && invoice.items.length > 1;

                                    return (
                                        <tr 
                                            key={idx} 
                                            className="hover:bg-gray-50/50 transition-colors group cursor-pointer"
                                            onClick={() => setSelectedInvoice(invoice)}
                                        >
                                            <td className="px-4 py-4 font-medium text-gray-600 whitespace-nowrap">{invoice.date}</td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <span className="font-bold text-gray-900 group-hover:text-black group-hover:underline decoration-2 underline-offset-4 transition-all">#{invoice.invoiceNumber}</span>
                                            </td>
                                            <td className="px-4 py-4 text-gray-400 whitespace-nowrap">{invoice.orderNumber}</td>
                                            <td className="px-4 py-4 font-semibold text-gray-800">{invoice.customerName}</td>

                                            <td className="px-4 py-4 text-center font-bold text-gray-900">{totalQty}</td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-gray-900">PHP {firstItemCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                                    {hasMultipleItems && (
                                                        <span className="text-[9px] font-bold text-blue-500 uppercase tracking-tighter leading-none mt-0.5">+ {invoice.items.length - 1} other items</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 font-bold text-gray-900 whitespace-nowrap">{invoice.amount}</td>
                                            <td className="px-4 py-5 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button 
                                                        className="px-3 py-1.5 bg-black text-white rounded-lg text-xs font-bold hover:bg-gray-900 transition-all shadow-sm focus:outline-none"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedInvoice(invoice);
                                                        }}
                                                    >
                                                        View
                                                    </button>
                                                    <button 
                                                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors focus:outline-none"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setInvoiceToEdit(invoice);
                                                            setIsModalOpen(true);
                                                        }}
                                                        title="Edit"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                    </button>
                                                    <button 
                                                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors focus:outline-none"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteInvoice(invoice.invoiceNumber);
                                                        }}
                                                        title="Delete"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Pagination */}
                    <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-gray-100 bg-white gap-4">
                        <div className="text-sm font-medium text-gray-500">
                            Showing <span className="font-bold text-gray-900">{filteredInvoices.length > 0 ? startIndex + 1 : 0}</span> to <span className="font-bold text-gray-900">{Math.min(startIndex + itemsPerPage, filteredInvoices.length)}</span> of <span className="font-bold text-gray-900">{filteredInvoices.length}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                                <button 
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1 ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                    Prev
                                </button>
                                <div className="flex items-center">
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button 
                                            key={i}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-colors ${currentPage === i + 1 ? 'bg-black text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                                <button 
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                    disabled={currentPage === totalPages}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1 ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}
                                >
                                    Next
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Invoice Modal */}
            {selectedInvoice && (
                <div className="fixed inset-0 z-[100] flex justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-10 px-4 sm:px-10 opacity-100 transition-opacity">
                    <div className="relative w-full max-w-[850px] mx-auto animate-in fade-in zoom-in-95 duration-200">
                        {/* Modal Header / Controls */}
                        <div className="flex justify-between items-center mb-4 text-white">
                            <h2 className="text-xl font-bold">Invoice #{selectedInvoice.invoiceNumber}</h2>
                            <div className="flex gap-3">
                                <button 
                                    onClick={() => window.print()}
                                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-semibold backdrop-blur-md transition-colors flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                                    Print
                                </button>
                                <button 
                                    onClick={() => setSelectedInvoice(null)}
                                    className="px-4 py-2 bg-white text-black hover:bg-gray-100 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                                    Close
                                </button>
                            </div>
                        </div>

                        {/* Modal Content - Reusing the A4 Invoice Template */}
                        <div className="rounded-xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/10 print-container">
                            <style dangerouslySetInnerHTML={{ __html: `
                                @media print {
                                    body * { visibility: hidden; }
                                    .print-container, .print-container * { visibility: visible; }
                                    .print-container { 
                                        position: absolute; 
                                        left: 0; 
                                        top: 0; 
                                        width: 100%;
                                        margin: 0;
                                        padding: 0;
                                        box-shadow: none !important;
                                        ring: none !important;
                                    }
                                    @page { margin: 0; size: auto; }
                                }
                            `}} />
                            <InvoiceTemplate invoice={selectedInvoice} />
                        </div>
                    </div>
                </div>
            )}

            {/* Create/Edit Invoice Modal */}
            <CreateInvoiceModal 
                key={invoiceToEdit ? `edit-${invoiceToEdit.id}` : 'create'}
                isOpen={isModalOpen} 
                onClose={() => {
                    setIsModalOpen(false);
                    setInvoiceToEdit(null);
                }}
                invoice={invoiceToEdit}
                onCreate={(newInvoice) => {
                    setInvoices(prev => [newInvoice, ...prev]);
                    setIsModalOpen(false);
                }}
                onUpdate={(updatedInvoice) => {
                    setInvoices(prev => prev.map(inv => inv.id === updatedInvoice.id ? updatedInvoice : inv));
                    setIsModalOpen(false);
                    setInvoiceToEdit(null);
                }}
            />

        </SidebarLayout>
    );
}
