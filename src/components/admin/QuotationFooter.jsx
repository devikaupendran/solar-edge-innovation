import React from 'react';
import { assets } from '../../assets/assets';

export const QuotationFooter = () => {
    return (
        <div className="w-full relative pointer-events-none select-none mt-auto">
            {/* Background Faded Graphic Accent */}
            <div className="absolute left-4 bottom-6 opacity-15 w-48 h-28 flex items-end">
                <img
                    src={assets.logo}
                    alt="Watermark Accent"
                    className="w-24 h-24 object-contain filter grayscale contrast-50"
                />
            </div>

            {/* Bottom Angled Blue Gradient Banner */}
            <div className="relative h-7 w-full bg-gradient-to-r from-[#2F6CA3] via-[#1A4B82] to-[#0E335C] overflow-hidden flex items-center justify-start">
                <div className="absolute left-0 top-0 h-7 w-44 bg-[#5698D4] transform skew-x-[-35deg] -translate-x-6 opacity-90" />
                <div className="absolute left-32 top-0 h-7 w-24 bg-[#3B7BB7] transform skew-x-[-35deg] opacity-70" />
            </div>
        </div>
    );
};
