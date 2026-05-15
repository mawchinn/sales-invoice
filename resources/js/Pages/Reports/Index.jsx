import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useMemo } from 'react';
import Dropdown from '@/Components/Dropdown';

export default function ReportsIndex() {
    const [reportType, setReportType] = useState('Sales Summary');
    const [dateRange, setDateRange] = useState('Last 30 Days');
    const [customFrom, setCustomFrom] = useState('2026-05-01');
    const [customTo, setCustomTo] = useState('2026-05-15');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Reset page when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [reportType, dateRange, customFrom, customTo]);

    const reportsData = {
        'Sales Summary': {
            headers: ['Date', 'Invoice', 'Customer', 'Amount', 'Payment Method'],
            data: [
                { id: 1, col1: '2026-05-15', col2: '#11793', col3: 'MARIA LEONOR', col4: 12500.00, col5: 'CASH' },
                { id: 2, col1: '2026-05-14', col2: '#11792', col3: 'ANTONIO LUNA', col4: 235062.00, col5: 'INSTALLMENT' },
                { id: 3, col1: '2026-05-10', col2: '#11791', col3: 'ISABELLA GARCIA', col4: 423895.00, col5: 'CASH' },
                { id: 4, col1: '2026-04-28', col2: '#11790', col3: 'GABRIEL REYES', col4: 319174.00, col5: 'INSTALLMENT' },
                { id: 5, col1: '2026-04-15', col2: '#11789', col3: 'SOPHIA CHUA', col4: 218729.00, col5: 'CASH' },
                { id: 6, col1: '2026-03-22', col2: '#11788', col3: 'RICARDO PASCUAL', col4: 88500.00, col5: 'CASH' },
                { id: 7, col1: '2026-03-05', col2: '#11787', col3: 'ELENA SANTOS', col4: 156000.00, col5: 'INSTALLMENT' },
                { id: 8, col1: '2026-02-18', col2: '#11786', col3: 'RAFAEL MENDEZ', col4: 45200.00, col5: 'CASH' },
                { id: 9, col1: '2026-02-10', col2: '#11785', col3: 'ANTONIO LUNA', col4: 92000.00, col5: 'INSTALLMENT' },
                { id: 10, col1: '2026-01-25', col2: '#11784', col3: 'MARIA LEONOR', col4: 120500.00, col5: 'CASH' },
            ]
        },
        'Inventory Valuation': {
            headers: ['Product Name', 'SKU', 'In Stock', 'Unit Cost', 'Total Value'],
            data: [
                { id: 1, col1: 'iPhone 15 Pro', col2: 'IP15-PRO-128', col3: 45, col4: 55000.00, col5: 2475000.00 },
                { id: 2, col1: 'MacBook Pro 14"', col2: 'MBP-14-M3', col3: 12, col4: 98000.00, col5: 1176000.00 },
                { id: 3, col1: 'AirPods Pro 2', col2: 'AP-PRO-2', col3: 88, col4: 12500.00, col5: 1100000.00 },
                { id: 4, col1: 'iPad Air 5', col2: 'IPA-5-64', col3: 24, col4: 32000.00, col5: 768000.00 },
                { id: 5, col1: 'Apple Watch S9', col2: 'AW-S9-41', col3: 31, col4: 22000.00, col5: 682000.00 },
            ]
        },
        'Customer Aging': {
            headers: ['Customer Name', '1-30 Days', '31-60 Days', '61-90 Days', '90+ Days'],
            data: [
                { id: 1, col1: 'RICARDO PASCUAL', col2: 12500.00, col3: 0.00, col4: 0.00, col5: 0.00 },
                { id: 2, col1: 'ELENA SANTOS', col2: 45000.00, col3: 12000.00, col4: 0.00, col5: 0.00 },
                { id: 3, col1: 'RAFAEL MENDEZ', col2: 0.00, col3: 8800.00, col4: 15600.00, col5: 0.00 },
                { id: 4, col1: 'SOPHIA CHUA', col2: 75000.00, col3: 0.00, col4: 0.00, col5: 12000.00 },
                { id: 5, col1: 'GABRIEL REYES', col2: 0.00, col3: 0.00, col4: 0.00, col5: 4500.00 },
            ]
        },
        'Tax Summary': {
            headers: ['Tax Period', 'Gross Sales', 'Taxable Amount', 'VAT (12%)', 'Net Amount'],
            data: [
                { id: 1, col1: '2026-05-31', col2: 1250400.00, col3: 1116428.57, col4: 133971.43, col5: 1116428.57 },
                { id: 2, col1: '2026-04-30', col2: 980500.00, col3: 875446.43, col4: 105053.57, col5: 875446.43 },
                { id: 3, col1: '2026-03-31', col2: 1450200.00, col3: 1294821.43, col4: 155378.57, col5: 1294821.43 },
                { id: 4, col1: '2026-02-28', col2: 820100.00, col3: 732232.14, col4: 87867.86, col5: 732232.14 },
                { id: 5, col1: '2026-01-31', col2: 1120600.00, col3: 1000535.71, col4: 120064.29, col5: 1000535.71 },
                { id: 6, col1: '2025-12-31', col2: 1340000.00, col3: 1196428.57, col4: 143571.43, col5: 1196428.57 },
            ]
        }
    };

    const currentReport = reportsData[reportType] || reportsData['Sales Summary'];

    const filteredData = useMemo(() => {
        // Find if the first column contains a date (YYYY-MM-DD format)
        const hasDate = currentReport.data[0]?.col1 && /^\d{4}-\d{2}-\d{2}$/.test(currentReport.data[0].col1);
        
        if (!hasDate) return currentReport.data;
        
        const today = new Date('2026-05-15');
        today.setHours(0, 0, 0, 0);
        
        return currentReport.data.filter(item => {
            const itemDate = new Date(item.col1);
            itemDate.setHours(0, 0, 0, 0);
            
            const diffTime = today - itemDate;
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            
            if (dateRange === 'Today') return diffDays === 0;
            if (dateRange === 'Last 7 Days') return diffDays >= 0 && diffDays < 7;
            if (dateRange === 'Last 30 Days') return diffDays >= 0 && diffDays < 30;
            if (dateRange === 'This Month') return itemDate.getMonth() === today.getMonth() && itemDate.getFullYear() === today.getFullYear();
            if (dateRange === 'This Quarter') {
                const todayQuarter = Math.floor(today.getMonth() / 3);
                const itemQuarter = Math.floor(itemDate.getMonth() / 3);
                return todayQuarter === itemQuarter && today.getFullYear() === itemDate.getFullYear();
            }
            if (dateRange === 'Custom Range') {
                const from = new Date(customFrom);
                const to = new Date(customTo);
                from.setHours(0,0,0,0);
                to.setHours(23,59,59,999);
                return itemDate >= from && itemDate <= to;
            }
            
            return true;
        });
    }, [currentReport, dateRange, customFrom, customTo]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleExport = () => {
        const headers = currentReport.headers;
        const rows = filteredData.map(item => [
            item.col1,
            item.col2,
            item.col3,
            item.col4,
            item.col5
        ]);
        
        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        
        link.setAttribute("href", url);
        link.setAttribute("download", `${reportType.replace(/\s+/g, '_').toLowerCase()}_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const reportCards = [
        { title: 'Sales Summary', description: 'Monthly revenue and sales performance', icon: (
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
        )},
        { title: 'Inventory Valuation', description: 'Total value of current stock on hand', icon: (
            <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
        )},
        { title: 'Customer Aging', description: 'Outstanding balances by customer', icon: (
            <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        )},
        { title: 'Tax Summary', description: 'VAT and other tax liabilities', icon: (
            <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
        )},
    ];

    return (
        <SidebarLayout>
            <Head title="Reports" />
            
            <div className="flex flex-col gap-8 pb-10">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Reports</h1>
                        <p className="text-sm font-medium text-gray-500 mt-1">Generate and export detailed business performance data.</p>
                    </div>
                </div>

                {/* Filters & Export Toolbar */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col lg:flex-row gap-4 items-center justify-between">
                    <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                        <div className="flex flex-col">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Report Type</label>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center justify-between gap-3 px-4 py-2.5 bg-gray-50 border border-transparent hover:border-gray-200 rounded-xl text-sm font-bold text-gray-700 transition-all min-w-[200px]">
                                        {reportType}
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content align="left" width="60" contentClasses="py-2 bg-white shadow-xl border border-gray-100">
                                    {reportCards.map(r => (
                                        <button key={r.title} onClick={() => setReportType(r.title)} className="block w-full px-4 py-2.5 text-start text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                                            {r.title}
                                        </button>
                                    ))}
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Date Range</label>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center justify-between gap-3 px-4 py-2.5 bg-gray-50 border border-transparent hover:border-gray-200 rounded-xl text-sm font-bold text-gray-700 transition-all min-w-[180px]">
                                        {dateRange}
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content align="left" width="48" contentClasses="py-2 bg-white shadow-xl border border-gray-100">
                                    {['Today', 'Last 7 Days', 'Last 30 Days', 'This Month', 'This Quarter', 'Custom Range'].map(range => (
                                        <button key={range} onClick={() => setDateRange(range)} className="block w-full px-4 py-2.5 text-start text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                                            {range}
                                        </button>
                                    ))}
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {dateRange === 'Custom Range' && (
                            <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
                                <div className="flex flex-col">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">From</label>
                                    <input 
                                        type="date" 
                                        value={customFrom}
                                        onChange={(e) => setCustomFrom(e.target.value)}
                                        className="px-4 py-2 bg-gray-50 border-none rounded-xl text-sm font-bold text-gray-700 focus:ring-2 focus:ring-black transition-all"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">To</label>
                                    <input 
                                        type="date" 
                                        value={customTo}
                                        onChange={(e) => setCustomTo(e.target.value)}
                                        className="px-4 py-2 bg-gray-50 border-none rounded-xl text-sm font-bold text-gray-700 focus:ring-2 focus:ring-black transition-all"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <button 
                        onClick={handleExport}
                        className="w-full lg:w-auto mt-4 lg:mt-0 bg-black hover:bg-gray-900 text-white px-8 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-black/10 hover:shadow-lg hover:-translate-y-0.5"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        Download {reportType} (.CSV)
                    </button>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                        <h2 className="font-bold text-gray-900">Preview: {reportType}</h2>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-white px-2 py-1 rounded border border-gray-100 shadow-sm">
                            {filteredData.length} Records Found
                        </span>
                    </div>
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 text-gray-400">
                                {currentReport.headers.map((header, idx) => (
                                    <th key={idx} className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {paginatedData.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4 font-medium text-gray-600">{item.col1}</td>
                                    <td className="px-6 py-4 font-bold text-gray-900 group-hover:text-black transition-colors">
                                        {typeof item.col2 === 'number' ? `PHP ${item.col2.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : item.col2}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-800">
                                        {typeof item.col3 === 'number' ? `PHP ${item.col3.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : item.col3}
                                    </td>
                                    <td className="px-6 py-4 font-black text-gray-900">
                                        {typeof item.col4 === 'number' ? `PHP ${item.col4.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : item.col4}
                                    </td>
                                    <td className="px-6 py-4">
                                        {typeof item.col5 === 'number' ? (
                                            <span className="font-black text-gray-900">PHP {item.col5.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                        ) : (
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                                item.col5 === 'CASH' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                                            }`}>
                                                {item.col5}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {totalPages > 1 && (
                        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-gray-100 bg-white gap-4">
                            <div className="text-sm font-medium text-gray-500">
                                Showing <span className="font-bold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-bold text-gray-900">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> of <span className="font-bold text-gray-900">{filteredData.length}</span>
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
                    )}
                </div>
            </div>
        </SidebarLayout>
    );
}
