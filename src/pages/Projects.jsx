import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { projectGalleryImages } from '../assets/assets';
import { X, ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';

const Projects = () => {
    // Show 10 images initially
    const [visibleCount, setVisibleCount] = useState(10);
    // Selected image index for full-screen preview lightbox modal (null when closed)
    const [previewIndex, setPreviewIndex] = useState(null);

    const visibleImages = projectGalleryImages.slice(0, visibleCount);
    const hasMore = visibleCount < projectGalleryImages.length;

    const handleLoadMore = () => {
        setVisibleCount((prev) => Math.min(prev + 10, projectGalleryImages.length));
    };

    const openPreview = (index) => {
        setPreviewIndex(index);
    };

    const closePreview = () => {
        setPreviewIndex(null);
    };

    const prevPreview = (e) => {
        e.stopPropagation();
        setPreviewIndex((prev) => (prev === 0 ? projectGalleryImages.length - 1 : prev - 1));
    };

    const nextPreview = (e) => {
        e.stopPropagation();
        setPreviewIndex((prev) => (prev === projectGalleryImages.length - 1 ? 0 : prev + 1));
    };

    return (
        <>
            {/* SEO Meta Tags for Projects Page */}
            <Helmet>
                <title>Project Gallery | Solar Edge Innovation - Installed Solar & Security Systems</title>
                <meta
                    name="description"
                    content="Explore the official project gallery of Solar Edge Innovation featuring real solar panel rooftop installations, inverters, and CCTV systems across Kerala."
                />
                <meta
                    name="keywords"
                    content="solar projects, solar gallery, solar panel installation photo, Solar Edge Innovation portfolio, Kerala solar projects"
                />
                <link rel="canonical" href="https://www.solaredgeinnovation.in/projects" />
            </Helmet>

            <div className="min-h-screen bg-[#FAFCFA] py-16 sm:py-24 px-6 sm:px-10 lg:px-16 font-sans">
                <div className="max-w-7xl xl:max-w-[1380px] mx-auto mt-16 sm:mt-20">

                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                        <div className="inline-flex items-center gap-2 bg-[#E5F3E7] text-[#1A4D2E] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4 shadow-2xs">
                            <Sparkles className="w-3.5 h-3.5 fill-[#1A4D2E]" />
                            <span>OUR WORK GALLERY</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold font-playfair text-neutral-900 leading-tight mb-4 tracking-tight">
                            Project Showcase
                        </h1>
                        <p className="text-neutral-600 text-sm sm:text-base font-medium leading-relaxed max-w-xl mx-auto">
                            A clean visual showcase of our real solar rooftop installations and security systems. Click any image to preview.
                        </p>
                    </div>

                    {/* Image Gallery Grid (Clean image cards with no text) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                        {visibleImages.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: (index % 10) * 0.05 }}
                                whileHover={{ y: -6 }}
                                onClick={() => openPreview(index)}
                                className="group relative h-72 sm:h-80 rounded-3xl overflow-hidden shadow-xs hover:shadow-2xl border border-neutral-200/80 bg-neutral-900 cursor-pointer transition-all duration-300"
                            >
                                <img
                                    src={item.src}
                                    alt="Solar Edge Innovation Project Preview"
                                    className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-108"
                                />

                                {/* Subtle Hover Eye Icon Overlay */}
                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-5">
                                    <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md text-white flex items-center justify-center transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-md">
                                        <Eye className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Load More Button */}
                    {hasMore && (
                        <div className="flex justify-center mt-12 sm:mt-16">
                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={handleLoadMore}
                                className="px-8 py-3.5 bg-[#1A4D2E] hover:bg-[#143e24] text-white rounded-full text-xs font-bold tracking-widest uppercase shadow-md hover:shadow-xl transition-all cursor-pointer"
                            >
                                Load More Projects ({projectGalleryImages.length - visibleCount} Remaining)
                            </motion.button>
                        </div>
                    )}

                </div>
            </div>

            {/* Lightbox / Preview Modal (When image card is clicked - Pure Image Preview) */}
            <AnimatePresence>
                {previewIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8"
                        onClick={closePreview}
                    >
                        {/* Modal Box */}
                        <motion.div
                            initial={{ scale: 0.92, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.92, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={closePreview}
                                className="absolute -top-12 right-0 sm:top-4 sm:right-4 z-50 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20 backdrop-blur-md"
                                aria-label="Close preview"
                            >
                                <X className="w-5 h-5 text-white" />
                            </button>

                            {/* Left Navigation Arrow */}
                            <button
                                onClick={prevPreview}
                                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 backdrop-blur-md"
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="w-6 h-6 text-white" />
                            </button>

                            {/* Right Navigation Arrow */}
                            <button
                                onClick={nextPreview}
                                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 backdrop-blur-md"
                                aria-label="Next image"
                            >
                                <ChevronRight className="w-6 h-6 text-white" />
                            </button>

                            {/* Main Preview Image */}
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 max-h-[82vh] flex items-center justify-center bg-black/40">
                                <img
                                    src={projectGalleryImages[previewIndex].src}
                                    alt="Solar Edge Project Preview"
                                    className="max-h-[82vh] w-auto max-w-full object-contain block select-none"
                                />
                            </div>

                            {/* Image Counter Bar */}
                            <div className="mt-4 flex items-center justify-center w-full text-white/90">
                                <span className="text-xs font-mono text-white/70 font-bold bg-white/10 px-4 py-1.5 rounded-full border border-white/15">
                                    {previewIndex + 1} / {projectGalleryImages.length}
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Projects;