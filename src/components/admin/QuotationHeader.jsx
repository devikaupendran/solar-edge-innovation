import React from 'react';
import { assets } from '../../assets/assets';
import { MapPin, Phone, Mail } from 'lucide-react';

export const QuotationHeader = ({ refNo, date }) => {
    return (
        <div className="w-full relative z-10 bg-[#ECF5FE] font-sans text-[#0D4379]">
            {/* Top Light Blue Banner with Angled Accent Polygons */}
            <div className="relative h-6 w-full bg-[#97CEF7] overflow-hidden flex items-center justify-end">
                {/* SVG Corner Polygons matching exact PDF screenshot header */}
                <svg className="absolute right-0 top-0 h-6 w-72 pointer-events-none" viewBox="0 0 280 24" preserveAspectRatio="none">
                    {/* Secondary lighter blue angled bar */}
                    <polygon points="60,0 280,0 280,24 0,24" fill="#6FB4ED" />
                    {/* Primary darker blue angled right end block */}
                    <polygon points="140,0 280,0 280,24 95,24" fill="#3E86C7" />
                </svg>
            </div>

            {/* Main Header Content Area */}
            <div className="px-6 pt-3 pb-2">
                <div className="flex items-center justify-between gap-2">
                    {/* Left: Brand Logo & Title */}
                    <div className="flex items-center gap-3">
                        <img
                            src={assets.logo}
                            alt="Solaredge Innovations"
                            className="w-16 h-16 object-contain shrink-0"
                        />
                        <div className="flex flex-col">
                            <h1 className="text-3xl font-extrabold tracking-tight leading-none text-[#0D4379]">
                                Solaredge
                            </h1>
                            <span className="text-2xl font-medium tracking-tight text-[#4CA0E3] leading-tight mt-0.5">
                                Innovations
                            </span>
                        </div>
                    </div>

                    {/* Middle: Address Details */}
                    <div className="flex items-start gap-1.5 max-w-[270px]">
                        <MapPin className="w-4 h-4 text-[#0D4379] fill-[#0D4379] shrink-0 mt-0.5" />
                        <div className="text-[11px] font-semibold text-[#0D4379] leading-snug">
                            <p>Elakamon, Ayiroor, Varkala</p>
                            <p>Varkala Paravoor Road Near Post Office. Pin: 695310</p>
                        </div>
                    </div>

                    {/* Right: Phone & Email Contact Details */}
                    <div className="space-y-1 text-[11px] font-semibold text-[#0D4379]">
                        <div className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-[#0D4379] fill-[#0D4379] shrink-0" />
                            <span className="font-bold text-xs tracking-tight text-[#0D4379]">
                                9526801406, 8289841004
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5 text-[#0D4379] fill-[#0D4379] shrink-0" />
                            <span className="text-[#0D4379] font-medium">
                                solaredgeinnovations25@gmail.com
                            </span>
                        </div>
                    </div>
                </div>

                {/* Services Ribbon Bar */}
                <div className="mt-3 pt-1.5 pb-1 border-t border-[#C5E1FA] flex items-center justify-between text-[11px] font-semibold text-[#0D4379]">
                    <span className="font-extrabold text-[#0D4379]">
                        Our Services :
                    </span>
                    <span className="text-[#0D4379]">Hybrid Solar System</span>
                    <span className="text-[#97CEF7]">|</span>
                    <span className="text-[#0D4379]">On Grid Solar System</span>
                    <span className="text-[#97CEF7]">|</span>
                    <span className="text-[#0D4379]">Off Grid Solar System</span>
                    <span className="text-[#97CEF7]">|</span>
                    <span className="text-[#0D4379]">Battery and Invertor</span>
                    <span className="text-[#97CEF7]">|</span>
                    <span className="text-[#0D4379]">CCTV</span>
                </div>
            </div>

            {/* Reference No & Date Line */}
            {refNo && date && (
                <div className="mx-6 pb-2 pt-1 border-t border-[#B1D8F8] flex items-center justify-between text-xs font-semibold text-[#0D4379]">
                    <span>Qt; Reference No:- {refNo}</span>
                    <span>Date : {date}</span>
                </div>
            )}
        </div>
    );
};
