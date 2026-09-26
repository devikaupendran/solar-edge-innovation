import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import { assets } from '../assets/assets';

export default function ProfileCard() {
    return (
        <div className="w-full px-4 sm:px-8 md:px-16 lg:px-20 py-6 flex items-center justify-center">
            <div className="w-full max-w-7xl h-full lg:h-[800px] 2xl:h-[900px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-xl overflow-hidden">
                <div className="flex flex-col lg:flex-row h-full">
                    {/* Left Section - Image */}
                    <div className="w-full lg:w-1/2 h-1/2 lg:h-full">
                        <img
                            src={assets.JoseJo}
                            alt="Profile"
                            className="w-full h-full object-cover object-top"
                        />
                    </div>

                    {/* Right Section - Content */}
                    <div className="w-full lg:w-1/2 h-1/2 lg:h-full p-8 lg:p-12 flex flex-col justify-between bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
                        {/* Solar Panel Pattern Background */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="solar-panel" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                                        {/* Solar panel grid */}
                                        <rect x="5" y="5" width="50" height="50" fill="none" stroke="#374151" strokeWidth="2"/>
                                        <line x1="30" y1="5" x2="30" y2="55" stroke="#374151" strokeWidth="1"/>
                                        <line x1="5" y1="30" x2="55" y2="30" stroke="#374151" strokeWidth="1"/>
                                        
                                        <rect x="65" y="5" width="50" height="50" fill="none" stroke="#374151" strokeWidth="2"/>
                                        <line x1="90" y1="5" x2="90" y2="55" stroke="#374151" strokeWidth="1"/>
                                        <line x1="65" y1="30" x2="115" y2="30" stroke="#374151" strokeWidth="1"/>
                                        
                                        <rect x="5" y="65" width="50" height="50" fill="none" stroke="#374151" strokeWidth="2"/>
                                        <line x1="30" y1="65" x2="30" y2="115" stroke="#374151" strokeWidth="1"/>
                                        <line x1="5" y1="90" x2="55" y2="90" stroke="#374151" strokeWidth="1"/>
                                        
                                        <rect x="65" y="65" width="50" height="50" fill="none" stroke="#374151" strokeWidth="2"/>
                                        <line x1="90" y1="65" x2="90" y2="115" stroke="#374151" strokeWidth="1"/>
                                        <line x1="65" y1="90" x2="115" y2="90" stroke="#374151" strokeWidth="1"/>
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#solar-panel)" />
                            </svg>
                        </div>

                        {/* Content - with relative positioning to appear above pattern */}
                        <div className="relative z-10 flex flex-col h-full">
                            {/* Logo */}
                            <div className="flex justify-end mb-8">
                                <div className="text-right">
                                    <div className="flex items-center justify-end gap-3 mb-1">
                                        <div className="w-16 h-16 border border-green-600 rounded-full flex items-center justify-center shadow-md">
                                           <img src={assets.logo} alt="" />
                                        </div>
                                        <div>
                                            <div className="text-2xl md:text-3xl font-bold text-gray-800">SolarEdge</div>
                                            <div className="text-xs md:text-sm text-gray-600 uppercase tracking-wider">Innovation</div>
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-500 italic mt-1">Powering Tomorrow's Energy</div>
                                </div>
                            </div>

                            {/* Quote Marks */}
                            <div className="mb-4">
                                <FaQuoteLeft className="text-6xl md:text-7xl text-green-600" />
                            </div>

                            {/* Main Content */}
                            <div className="flex-grow flex flex-col justify-center">
                                <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8">
                                    Innovation isn't just about creating new technology—it's about transforming how we harness and distribute clean energy for generations to come. At SolarEdge Innovation, we're not just building solar solutions; we're architecting a sustainable future where every ray of sunlight becomes a promise of progress.
                                </p>

                                {/* Name Badge */}
                                <div className="inline-block">
                                    <div className="bg-gradient-to-r from-green-medium to-green-dark text-white px-6 md:px-8 py-4 md:py-5 rounded-r-lg shadow-lg -ml-8 lg:-ml-12">
                                        <div className="font-bold text-lg md:text-xl">Mr. Jose Jo,</div>
                                        <div className="text-sm md:text-base mt-1">Owner</div>
                                        <div className="text-xs md:text-sm mt-1 opacity-90">SolarEdge Innovation</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}