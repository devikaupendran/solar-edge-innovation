import React from 'react';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';
import {
    Leaf,
    ShieldCheck,
    Users,
    Headphones,
    Sun,
    BarChart3,
    ChevronRight,
    Home,
    Building2,
    Factory,
    Wrench,
    Award,
    FileText,
    Percent,
    Globe,
    ArrowUpRight
} from 'lucide-react';

export default function ServiceHero() {
    return (
        <section className="w-full bg-[#FAFCFA] pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-14 lg:pb-16 relative overflow-hidden font-sans">
            {/* =========================================================
                FLOATING BACKGROUND DECORATIVE LEAVES
            ========================================================= */}
            <img
                src={assets.rightSideLeaf}
                alt="Decorative leaf right"
                className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 w-72 sm:w-96 md:w-[540px] lg:w-[640px] pointer-events-none select-none z-0 opacity-95"
            />


            <div className="max-w-7xl xl:max-w-[1380px] 2xl:max-w-[1460px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 relative z-10">

                {/* =========================================================
                    FEATURE BAR (ASSURANCE BANNER) PLACED AT THE VERY TOP
                ========================================================= */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-10 sm:mb-14 lg:mb-16 bg-gradient-to-r from-[#0E361D] via-[#144A29] to-[#0A2A17] text-white rounded-3xl sm:rounded-[36px] p-6 sm:p-8 lg:p-9 shadow-2xl border border-emerald-700/40 relative overflow-hidden"
                >
                    {/* Ambient Background Glows */}
                    <div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-0 divide-y sm:divide-y-0 lg:divide-x divide-white/15 relative z-10">
                        
                        {/* 1. 10+ Year Warranty */}
                        <div className="flex items-center gap-3.5 lg:justify-center pt-4 sm:pt-0 lg:px-4 group cursor-pointer">
                            <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-300 shrink-0 shadow-md group-hover:scale-110 transition-transform">
                                <Award className="w-6 h-6 text-amber-300" />
                            </div>
                            <div>
                                <div className="text-base font-extrabold text-white leading-tight">10+ Year</div>
                                <div className="text-xs text-emerald-200/90 font-medium">Warranty</div>
                            </div>
                        </div>

                        {/* 2. 27-Year Production Guarantee */}
                        <div className="flex items-center gap-3.5 lg:justify-center pt-4 sm:pt-0 lg:px-4 group cursor-pointer">
                            <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-emerald-300 shrink-0 shadow-md group-hover:scale-110 transition-transform">
                                <ShieldCheck className="w-6 h-6 text-emerald-300" />
                            </div>
                            <div>
                                <div className="text-base font-extrabold text-white leading-tight">27-Year</div>
                                <div className="text-xs text-emerald-200/90 font-medium">Production Guarantee</div>
                            </div>
                        </div>

                        {/* 3. Fast Loan Approval */}
                        <div className="flex items-center gap-3.5 lg:justify-center pt-4 sm:pt-0 lg:px-4 group cursor-pointer">
                            <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-emerald-300 shrink-0 shadow-md group-hover:scale-110 transition-transform">
                                <FileText className="w-6 h-6 text-emerald-300" />
                            </div>
                            <div>
                                <div className="text-base font-extrabold text-white leading-tight">Fast Loan</div>
                                <div className="text-xs text-emerald-200/90 font-medium">Approval</div>
                            </div>
                        </div>

                        {/* 4. Govt. Subsidy Available */}
                        <div className="flex items-center gap-3.5 lg:justify-center pt-4 sm:pt-0 lg:px-4 group cursor-pointer">
                            <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-300 shrink-0 shadow-md group-hover:scale-110 transition-transform">
                                <Percent className="w-6 h-6 text-amber-300" />
                            </div>
                            <div>
                                <div className="text-base font-extrabold text-white leading-tight">Govt. Subsidy</div>
                                <div className="text-xs text-emerald-200/90 font-medium">Available</div>
                            </div>
                        </div>

                        {/* 5. Eco Friendly & Sustainable */}
                        <div className="flex items-center gap-3.5 lg:justify-center pt-4 sm:pt-0 lg:px-4 group cursor-pointer">
                            <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-emerald-300 shrink-0 shadow-md group-hover:scale-110 transition-transform">
                                <Globe className="w-6 h-6 text-emerald-300" />
                            </div>
                            <div>
                                <div className="text-base font-extrabold text-white leading-tight">Eco Friendly</div>
                                <div className="text-xs text-emerald-200/90 font-medium">& Sustainable</div>
                            </div>
                        </div>

                    </div>
                </motion.div>

                {/* =========================================================
                    HERO SECTION: TWO-COLUMN BANNER
                ========================================================= */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">

                    {/* Left Column: Heading & Subtitle */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:col-span-6 flex flex-col items-start"
                    >
                        {/* Overline Label */}
                        <div className="flex items-center gap-2.5 mb-4">
                            <span className="w-7 h-[2px] bg-[#1A4D2E]" />
                            <span className="text-xs font-bold tracking-[0.2em] text-[#1A4D2E] uppercase">
                                OUR SERVICES
                            </span>
                        </div>

                        {/* Main Headline */}
                        <h1 className="font-playfair font-bold text-4xl sm:text-5xl lg:text-[54px] xl:text-[62px] leading-[1.1] text-neutral-900 tracking-[-0.02em]">
                            Complete Solar <br />
                            Solutions for a <br />
                            <span className="text-[#1A4D2E]">Brighter Tomorrow</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="mt-5 text-neutral-600 text-sm sm:text-[15px] leading-relaxed max-w-xl font-medium">
                            From consultation to installation and long-term support, we provide end-to-end solar solutions tailored to your home, business, and industry.
                        </p>

                        {/* 4 Feature Pills Row */}
                        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-xl">
                            {/* Pill 1 */}
                            <div className="flex items-center gap-2.5 bg-white/90 backdrop-blur-xs border border-neutral-100/90 p-2.5 sm:p-3 rounded-2xl shadow-2xs">
                                <div className="w-8 h-8 rounded-full bg-[#E5F5E8] flex items-center justify-center text-[#1A4D2E] shrink-0">
                                    <Leaf className="w-4 h-4 fill-[#1A4D2E]" />
                                </div>
                                <span className="text-[11px] sm:text-xs font-bold text-neutral-800 leading-tight">
                                    Reliable<br />Performance
                                </span>
                            </div>

                            {/* Pill 2 */}
                            <div className="flex items-center gap-2.5 bg-white/90 backdrop-blur-xs border border-neutral-100/90 p-2.5 sm:p-3 rounded-2xl shadow-2xs">
                                <div className="w-8 h-8 rounded-full bg-[#E5F5E8] flex items-center justify-center text-[#1A4D2E] shrink-0">
                                    <ShieldCheck className="w-4 h-4" />
                                </div>
                                <span className="text-[11px] sm:text-xs font-bold text-neutral-800 leading-tight">
                                    Certified<br />Products
                                </span>
                            </div>

                            {/* Pill 3 */}
                            <div className="flex items-center gap-2.5 bg-white/90 backdrop-blur-xs border border-neutral-100/90 p-2.5 sm:p-3 rounded-2xl shadow-2xs">
                                <div className="w-8 h-8 rounded-full bg-[#E5F5E8] flex items-center justify-center text-[#1A4D2E] shrink-0">
                                    <Users className="w-4 h-4" />
                                </div>
                                <span className="text-[11px] sm:text-xs font-bold text-neutral-800 leading-tight">
                                    Expert<br />Installation
                                </span>
                            </div>

                            {/* Pill 4 */}
                            <div className="flex items-center gap-2.5 bg-white/90 backdrop-blur-xs border border-neutral-100/90 p-2.5 sm:p-3 rounded-2xl shadow-2xs">
                                <div className="w-8 h-8 rounded-full bg-[#E5F5E8] flex items-center justify-center text-[#1A4D2E] shrink-0">
                                    <Headphones className="w-4 h-4" />
                                </div>
                                <span className="text-[11px] sm:text-xs font-bold text-neutral-800 leading-tight">
                                    Ongoing<br />Support
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Hero Banner Image & Floating Badges */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="lg:col-span-6 relative flex items-center justify-center"
                    >
                        {/* Service Banner Image Container (Enlarged, No Border) */}
                        <div className="relative w-full max-w-[720px] xl:max-w-[760px] rounded-3xl sm:rounded-[36px] overflow-hidden">
                            <img
                                src={assets.serviceBannerImage}
                                alt="Complete Solar Solutions - Solar Edge Innovation"
                                className="w-full h-auto object-cover block"
                            />
                        </div>

                        {/* Floating Badge 1: Clean Energy (Top Left overlay) */}
                        <motion.div
                            animate={{ y: [-3, 3, -3] }}
                            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                            className="absolute top-4 sm:top-6 left-2 sm:left-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-xl border border-neutral-100 flex items-center gap-3"
                        >
                            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                                <Sun className="w-5 h-5 fill-amber-400 text-amber-500" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-neutral-900 leading-tight">Clean Energy</div>
                                <div className="text-[10px] sm:text-[11px] text-neutral-500 font-medium">Brighter Tomorrow</div>
                            </div>
                            {/* Curved Arrow pointer */}
                            <svg width="45" height="35" viewBox="0 0 50 40" fill="none" className="absolute -bottom-8 right-2 text-[#1A4D2E] pointer-events-none opacity-80">
                                <path d="M5 5 C 20 25, 35 20, 40 32" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                                <path d="M32 28 L 41 33 L 41 23" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                            </svg>
                        </motion.div>

                        {/* Floating Badge 2: Reduce Electricity Bills (Right overlay) */}
                        <motion.div
                            animate={{ y: [3, -3, 3] }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.3 }}
                            className="absolute top-1/2 -translate-y-1/2 -right-2 sm:-right-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-xl border border-neutral-100 flex items-center gap-3 max-w-[210px] sm:max-w-[230px]"
                        >
                            <div className="w-10 h-10 rounded-xl bg-[#E5F5E8] flex items-center justify-center text-[#1A4D2E] shrink-0">
                                <BarChart3 className="w-5 h-5 text-[#1A4D2E]" />
                            </div>
                            <div className="flex-1">
                                <div className="text-xs sm:text-sm font-bold text-neutral-900 leading-tight">Reduce Electricity Bills</div>
                                <div className="text-[10px] sm:text-[11px] text-neutral-500 font-medium mt-0.5">Save up to 70% annually</div>
                            </div>
                            <div className="w-7 h-7 rounded-full bg-[#E5F5E8] text-[#1A4D2E] flex items-center justify-center shrink-0">
                                <ChevronRight className="w-4 h-4" />
                            </div>
                        </motion.div>
                    </motion.div>

                </div>

                {/* =========================================================
                    THIRD SECTION: SERVICES WE OFFER (4 CARDS GRID)
                ========================================================= */}
                <div className="mt-16 sm:mt-20 lg:mt-24">

                    {/* Header Row */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
                        <div>
                            <div className="flex items-center gap-2.5 mb-2">
                                <span className="w-7 h-[2px] bg-[#1A4D2E]" />
                                <span className="text-xs font-bold tracking-[0.2em] text-[#1A4D2E] uppercase">
                                    OUR SERVICES
                                </span>
                            </div>
                            <h2 className="font-playfair font-bold text-3xl sm:text-4xl lg:text-[42px] text-neutral-900 leading-tight">
                                Services <span className="font-extrabold text-neutral-900">We Offer</span>
                            </h2>
                        </div>

                        <p className="text-neutral-500 text-xs sm:text-sm max-w-md leading-relaxed font-medium">
                            We deliver comprehensive solar solutions designed for residential, commercial, and industrial needs.
                        </p>

                        <div>
                            <a
                                href="#types-of-solars"
                                className="inline-flex items-center gap-2 bg-white hover:bg-neutral-50 border border-neutral-200/90 rounded-full px-5 py-2.5 text-xs font-bold text-neutral-800 shadow-2xs hover:shadow-sm transition-all"
                            >
                                Explore All Services
                                <ChevronRight className="w-4 h-4 text-[#1A4D2E]" />
                            </a>
                        </div>
                    </div>

                    {/* 4 Premium Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                        {/* Card 1: Residential Solar Solutions (Highlighted Featured Card) */}
                        <motion.div
                            whileHover={{ y: -8 }}
                            transition={{ duration: 0.3 }}
                            className="bg-gradient-to-b from-[#F2F8F4] to-white border-2 border-[#1A4D2E] rounded-3xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                        >
                            {/* Top Badge */}
                            <div className="absolute top-4 right-4 z-20">
                                <span className="bg-[#1A4D2E] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-2xs">
                                    Popular
                                </span>
                            </div>

                            <div>
                                {/* Image Container with Floating Glass Badge */}
                                <div className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-shadow">
                                    <img
                                        src={assets.one}
                                        alt="Residential Solar Solutions"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center text-[#1A4D2E] shadow-md border border-neutral-100">
                                        <Home className="w-5 h-5 text-[#1A4D2E]" />
                                    </div>
                                </div>

                                <h3 className="font-bold text-lg text-neutral-900 leading-snug group-hover:text-[#1A4D2E] transition-colors">
                                    Residential Solar
                                </h3>
                                <p className="mt-1.5 text-xs text-neutral-500 leading-relaxed font-medium">
                                    Custom rooftop solar systems engineered for homes to drastically cut electricity expenses.
                                </p>

                                {/* Feature Highlights */}
                                <div className="mt-4 pt-3 border-t border-neutral-200/60 space-y-1.5">
                                    <div className="flex items-center gap-2 text-[11px] font-semibold text-neutral-700">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#1A4D2E]" />
                                        Save up to 80% on monthly bills
                                    </div>
                                    <div className="flex items-center gap-2 text-[11px] font-semibold text-neutral-700">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#1A4D2E]" />
                                        Net metering & KSEB grid support
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-between">
                                <span className="text-xs font-bold text-[#1A4D2E]">Learn More</span>
                                <div className="w-9 h-9 rounded-full bg-[#E5F5E8] text-[#1A4D2E] flex items-center justify-center group-hover:bg-[#1A4D2E] group-hover:text-white transition-all shadow-2xs">
                                    <ArrowUpRight className="w-4 h-4" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 2: Commercial Solar Systems */}
                        <motion.div
                            whileHover={{ y: -8 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white border border-neutral-200/90 rounded-3xl p-5 shadow-2xs hover:shadow-xl hover:border-emerald-200 transition-all duration-300 flex flex-col justify-between group"
                        >
                            {/* Top Badge */}
                            <div className="absolute top-4 right-4 z-20">
                                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                                    Commercial
                                </span>
                            </div>

                            <div>
                                <div className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden mb-4 shadow-2xs">
                                    <img
                                        src={assets.commercialImage}
                                        alt="Commercial Solar Systems"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center text-[#1A4D2E] shadow-md border border-neutral-100">
                                        <Building2 className="w-5 h-5 text-[#1A4D2E]" />
                                    </div>
                                </div>

                                <h3 className="font-bold text-lg text-neutral-900 leading-snug group-hover:text-[#1A4D2E] transition-colors">
                                    Commercial Solar
                                </h3>
                                <p className="mt-1.5 text-xs text-neutral-500 leading-relaxed font-medium">
                                    Scalable high-yield solutions for corporate offices, schools, and retail spaces.
                                </p>

                                <div className="mt-4 pt-3 border-t border-neutral-100 space-y-1.5">
                                    <div className="flex items-center gap-2 text-[11px] font-semibold text-neutral-700">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                                        Accelerated tax depreciation
                                    </div>
                                    <div className="flex items-center gap-2 text-[11px] font-semibold text-neutral-700">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                                        Optimized peak-load offset
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-between">
                                <span className="text-xs font-bold text-neutral-700 group-hover:text-[#1A4D2E] transition-colors">Learn More</span>
                                <div className="w-9 h-9 rounded-full bg-[#E5F5E8] text-[#1A4D2E] flex items-center justify-center group-hover:bg-[#1A4D2E] group-hover:text-white transition-all shadow-2xs">
                                    <ArrowUpRight className="w-4 h-4" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 3: Industrial Solar Solutions */}
                        <motion.div
                            whileHover={{ y: -8 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white border border-neutral-200/90 rounded-3xl p-5 shadow-2xs hover:shadow-xl hover:border-emerald-200 transition-all duration-300 flex flex-col justify-between group"
                        >
                            {/* Top Badge */}
                            <div className="absolute top-4 right-4 z-20">
                                <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                                    Industrial
                                </span>
                            </div>

                            <div>
                                <div className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden mb-4 shadow-2xs">
                                    <img
                                        src={assets.industrialImage}
                                        alt="Industrial Solar Solutions"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center text-[#1A4D2E] shadow-md border border-neutral-100">
                                        <Factory className="w-5 h-5 text-[#1A4D2E]" />
                                    </div>
                                </div>

                                <h3 className="font-bold text-lg text-neutral-900 leading-snug group-hover:text-[#1A4D2E] transition-colors">
                                    Industrial Solar
                                </h3>
                                <p className="mt-1.5 text-xs text-neutral-500 leading-relaxed font-medium">
                                    Heavy-capacity solar infrastructure built for factories, warehouses, and manufacturing plants.
                                </p>

                                <div className="mt-4 pt-3 border-t border-neutral-100 space-y-1.5">
                                    <div className="flex items-center gap-2 text-[11px] font-semibold text-neutral-700">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                                        Megawatt scale installations
                                    </div>
                                    <div className="flex items-center gap-2 text-[11px] font-semibold text-neutral-700">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                                        Custom HT & LT grid integration
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-between">
                                <span className="text-xs font-bold text-neutral-700 group-hover:text-[#1A4D2E] transition-colors">Learn More</span>
                                <div className="w-9 h-9 rounded-full bg-[#E5F5E8] text-[#1A4D2E] flex items-center justify-center group-hover:bg-[#1A4D2E] group-hover:text-white transition-all shadow-2xs">
                                    <ArrowUpRight className="w-4 h-4" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 4: Maintenance & Support */}
                        <motion.div
                            whileHover={{ y: -8 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white border border-neutral-200/90 rounded-3xl p-5 shadow-2xs hover:shadow-xl hover:border-emerald-200 transition-all duration-300 flex flex-col justify-between group"
                        >
                            {/* Top Badge */}
                            <div className="absolute top-4 right-4 z-20">
                                <span className="bg-slate-100 text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                                    24/7 Support
                                </span>
                            </div>

                            <div>
                                <div className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden mb-4 shadow-2xs bg-gradient-to-tr from-slate-100 to-emerald-50 flex items-center justify-center">
                                    <img
                                        src={assets.three}
                                        alt="Maintenance & Support"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center text-[#1A4D2E] shadow-md border border-neutral-100">
                                        <Wrench className="w-5 h-5 text-[#1A4D2E]" />
                                    </div>
                                </div>

                                <h3 className="font-bold text-lg text-neutral-900 leading-snug group-hover:text-[#1A4D2E] transition-colors">
                                    Maintenance & Support
                                </h3>
                                <p className="mt-1.5 text-xs text-neutral-500 leading-relaxed font-medium">
                                    Comprehensive maintenance, panel cleaning, and annual maintenance contracts (AMC).
                                </p>

                                <div className="mt-4 pt-3 border-t border-neutral-100 space-y-1.5">
                                    <div className="flex items-center gap-2 text-[11px] font-semibold text-neutral-700">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                                        Rapid on-site emergency repair
                                    </div>
                                    <div className="flex items-center gap-2 text-[11px] font-semibold text-neutral-700">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                                        Performance optimization checks
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-between">
                                <span className="text-xs font-bold text-neutral-700 group-hover:text-[#1A4D2E] transition-colors">Learn More</span>
                                <div className="w-9 h-9 rounded-full bg-[#E5F5E8] text-[#1A4D2E] flex items-center justify-center group-hover:bg-[#1A4D2E] group-hover:text-white transition-all shadow-2xs">
                                    <ArrowUpRight className="w-4 h-4" />
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>

            </div>
        </section>
    );
}
