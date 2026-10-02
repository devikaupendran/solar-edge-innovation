import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { defaultQuotationData } from '../../data/defaultQuotationData';
import { QuotationFormControls } from './QuotationFormControls';
import { QuotationPreview6Pages } from './QuotationPreview6Pages';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export const QuotationEditor = ({ onLogout }) => {
    // Load initial quotation data from localStorage or default
    const [quotationData, setQuotationData] = useState(() => {
        const saved = localStorage.getItem('solar_quotation_data');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse saved quotation data", e);
            }
        }
        return defaultQuotationData;
    });

    const [notification, setNotification] = useState(null);

    const showToast = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3500);
    };

    // Save quotation to local storage
    const handleSave = () => {
        try {
            localStorage.setItem('solar_quotation_data', JSON.stringify(quotationData));
            showToast("Quotation data saved successfully!");
        } catch (e) {
            showToast("Failed to save quotation data.", "error");
        }
    };

    // Reset to initial default template
    const handleReset = () => {
        if (window.confirm("Are you sure you want to reset all fields to the default 6-page template?")) {
            setQuotationData(defaultQuotationData);
            localStorage.removeItem('solar_quotation_data');
            showToast("Reset to default 6-page template values.");
        }
    };

    // Generate & Download 6-Page PDF matching exact live preview per page
    const handleGeneratePdf = async () => {
        handleSave();
        setNotification(null); // Clear any active toast overlay before capturing

        const container = document.querySelector('.quotation-preview-container');
        if (!container) {
            window.print();
            return;
        }

        showToast("Generating 6-page PDF document...", "success");

        // Create an off-screen clone for reliable multi-page DOM rendering
        const clone = container.cloneNode(true);
        clone.style.position = 'fixed';
        clone.style.left = '-9999px';
        clone.style.top = '0px';
        clone.style.width = '210mm';
        clone.style.height = 'auto';
        clone.style.zIndex = '-9999';
        clone.style.overflow = 'visible';
        clone.style.gap = '0px';
        clone.style.padding = '0px';
        clone.style.margin = '0px';
        clone.style.background = '#ffffff';

        document.body.appendChild(clone);

        try {
            const pages = clone.querySelectorAll('.quotation-page');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
                compress: true
            });

            const pdfWidth = 210;
            const pdfHeight = 297;

            for (let i = 0; i < pages.length; i++) {
                const pageEl = pages[i];
                pageEl.style.margin = '0px';
                pageEl.style.boxShadow = 'none';

                const canvas = await html2canvas(pageEl, {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                    backgroundColor: '#ffffff',
                    width: pageEl.offsetWidth || 794,
                    height: pageEl.offsetHeight || 1123,
                    ignoreElements: (el) => {
                        return el.classList && (
                            el.classList.contains('toast-notification') ||
                            el.classList.contains('no-print')
                        );
                    }
                });

                const imgData = canvas.toDataURL('image/jpeg', 0.98);

                if (i > 0) {
                    pdf.addPage('a4', 'portrait');
                }

                pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
            }

            if (document.body.contains(clone)) {
                document.body.removeChild(clone);
            }

            const fileName = `Solaredge_Quotation_${(quotationData.refNo || 'DCR-09-26-13').replace(/[/\\?%*:|"<>]/g, '-')}.pdf`;
            pdf.save(fileName);
            showToast("Single 6-Page PDF downloaded successfully!");
        } catch (err) {
            if (document.body.contains(clone)) {
                document.body.removeChild(clone);
            }
            console.error("PDF generation failed, falling back to window.print()", err);
            window.print();
        }
    };

    return (
        <div className="w-full h-screen flex flex-col md:flex-row bg-neutral-100 overflow-hidden font-sans relative" data-lenis-prevent>
            {/* Notification Toast */}
            {notification && (
                <div className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 bg-neutral-900 text-white rounded-xl shadow-2xl border border-neutral-700 animate-bounce toast-notification no-print">
                    {notification.type === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                        <AlertCircle className="w-4 h-4 text-red-400" />
                    )}
                    <span className="text-xs font-semibold">{notification.message}</span>
                </div>
            )}

            {/* Comprehensive Print Stylesheet Injection for 6-Page A4 Multipage Output */}
            <style>{`
                @media print {
                    *, *::before, *::after {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        color-adjust: exact !important;
                    }

                    /* Hide non-printable UI elements */
                    header, footer, nav, .no-print, .quotation-editor-left-panel, button, .toast-notification {
                        display: none !important;
                    }

                    html, body, #root, #root > *, main, .w-full, .h-screen {
                        height: auto !important;
                        min-height: 0 !important;
                        max-height: none !important;
                        overflow: visible !important;
                        background: white !important;
                    }

                    .quotation-preview-right-panel,
                    .quotation-preview-container {
                        width: 210mm !important;
                        height: auto !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        gap: 0 !important;
                        overflow: visible !important;
                        background: white !important;
                        display: block !important;
                    }

                    .quotation-page {
                        width: 210mm !important;
                        height: 297mm !important;
                        min-height: 297mm !important;
                        max-height: 297mm !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        box-shadow: none !important;
                        border: none !important;
                        page-break-after: always !important;
                        break-after: page !important;
                        page-break-inside: avoid !important;
                        break-inside: avoid !important;
                        overflow: hidden !important;
                        box-sizing: border-box !important;
                        background: white !important;
                    }

                    .page-break-after-avoid {
                        page-break-after: avoid !important;
                        break-after: avoid !important;
                    }

                    @page {
                        size: A4 portrait;
                        margin: 0mm !important;
                    }
                }
            `}</style>

            {/* Left Column: Form Controls (Hidden during print) */}
            <div className="w-full md:w-[440px] lg:w-[480px] xl:w-[520px] h-[50vh] md:h-full shrink-0 quotation-editor-left-panel z-20 flex flex-col overflow-hidden" data-lenis-prevent>
                <QuotationFormControls
                    data={quotationData}
                    onChange={setQuotationData}
                    onSave={handleSave}
                    onReset={handleReset}
                    onGeneratePdf={handleGeneratePdf}
                    onLogout={onLogout}
                />
            </div>

            {/* Right Column: Live 6-Page Preview */}
            <div className="flex-1 h-[50vh] md:h-full overflow-y-auto quotation-preview-right-panel p-4 md:p-8 bg-neutral-200/80" data-lenis-prevent>
                <QuotationPreview6Pages data={quotationData} />
            </div>
        </div>
    );
};
