import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ProjectShowcase = () => {
    const navigate = useNavigate();

    // Staggered scroll animations
    const fadeInScale = {
        hidden: { opacity: 0, y: 30, scale: 0.98 },
        visible: (customDelay) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.6, delay: customDelay, ease: [0.16, 1, 0.3, 1] }
        })
    };

    const projects = {
        one: { title: "Domestic 5kW Rooftop Array", location: "Trivandrum" },
        two: { title: "Commercial Grid Synergy Install", location: "Kollam" },
        three: { title: "10kW Premium Hybrid Backup", location: "Varkala" },
        four: { title: "Industrial Solar Storage Complex", location: "Parippally" },
        five: { title: "Integrated CCTV Security Network", location: "Elakamon" },
        six: { title: "Smart Irrigation Solar System", location: "Attingal" }
    };

    return (
        <section className="w-full px-6 sm:px-8 md:px-16 lg:px-20 py-20">
            <div className="max-w-7xl mx-auto flex flex-col items-center w-full">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 w-full gap-6">
                <div>
                    <span className="text-[11px] text-green-700 font-semibold tracking-widest uppercase font-mono">OUR PORTFOLIO</span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-playfair tracking-tight text-neutral-900 mt-2">
                        Featured Operations & Highlights
                    </h2>
                </div>
                <p className="text-sm text-neutral-500 font-light max-w-sm leading-relaxed">
                    Explore our state-of-the-art residential arrays, commercial hybrid inverters, and high-security surveillance systems installed across Kerala.
                </p>
            </div>

            {/* Bento Grid */}
            <main className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Column 1: Stack of Two Small Cards */}
                    <div className="md:col-span-1 flex flex-col gap-6">
                        {/* Project 1 */}
                        <motion.div
                            custom={0.1}
                            variants={fadeInScale}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            className="relative h-[220px] rounded-[28px] overflow-hidden shadow-xs hover:shadow-md border border-neutral-100/60 group cursor-pointer"
                        >
                            <img
                                src={assets.one}
                                alt={projects.one.title}
                                className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                            <div className="absolute bottom-0 left-0 w-full p-6 z-20 text-white flex flex-col justify-end">
                                <span className="text-[9px] text-green-400 font-bold uppercase tracking-widest font-mono">
                                    {projects.one.location}
                                </span>
                                <h4 className="text-lg font-bold font-playfair tracking-tight mt-1 group-hover:translate-x-1 transition-transform duration-300 text-white">
                                    {projects.one.title}
                                </h4>
                            </div>
                        </motion.div>

                        {/* Project 2 */}
                        <motion.div
                            custom={0.2}
                            variants={fadeInScale}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            className="relative h-[220px] rounded-[28px] overflow-hidden shadow-xs hover:shadow-md border border-neutral-100/60 group cursor-pointer"
                        >
                            <img
                                src={assets.two}
                                alt={projects.two.title}
                                className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                            <div className="absolute bottom-0 left-0 w-full p-6 z-20 text-white flex flex-col justify-end">
                                <span className="text-[9px] text-green-400 font-bold uppercase tracking-widest font-mono">
                                    {projects.two.location}
                                </span>
                                <h4 className="text-lg font-bold font-playfair tracking-tight mt-1 group-hover:translate-x-1 transition-transform duration-300 text-white">
                                    {projects.two.title}
                                </h4>
                            </div>
                        </motion.div>
                    </div>

                    {/* Column 2 & 3: Large Double-Wide Card */}
                    <motion.div
                        custom={0.3}
                        variants={fadeInScale}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className="relative md:col-span-2 h-[464px] rounded-[28px] overflow-hidden shadow-xs hover:shadow-md border border-neutral-100/60 group cursor-pointer"
                    >
                        <img
                            src={assets.three}
                            alt={projects.three.title}
                            className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                        <div className="absolute bottom-0 left-0 w-full p-8 z-20 text-white flex flex-col justify-end">
                            <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest font-mono">
                                {projects.three.location}
                            </span>
                            <h4 className="text-2xl font-bold font-playfair tracking-tight mt-1 group-hover:translate-x-1.5 transition-transform duration-300 text-white">
                                {projects.three.title}
                            </h4>
                        </div>
                    </motion.div>

                    {/* Second Row - Column 1 & 2: Large Double-Wide Card */}
                    <motion.div
                        custom={0.4}
                        variants={fadeInScale}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className="relative md:col-span-2 h-[464px] rounded-[28px] overflow-hidden shadow-xs hover:shadow-md border border-neutral-100/60 group cursor-pointer"
                    >
                        <img
                            src={assets.four}
                            alt={projects.four.title}
                            className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                        <div className="absolute bottom-0 left-0 w-full p-8 z-20 text-white flex flex-col justify-end">
                            <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest font-mono">
                                {projects.four.location}
                            </span>
                            <h4 className="text-2xl font-bold font-playfair tracking-tight mt-1 group-hover:translate-x-1.5 transition-transform duration-300 text-white">
                                {projects.four.title}
                            </h4>
                        </div>
                    </motion.div>

                    {/* Second Row - Column 3: Stack of Two Small Cards */}
                    <div className="md:col-span-1 flex flex-col gap-6">
                        {/* Project 5 */}
                        <motion.div
                            custom={0.5}
                            variants={fadeInScale}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            className="relative h-[220px] rounded-[28px] overflow-hidden shadow-xs hover:shadow-md border border-neutral-100/60 group cursor-pointer"
                        >
                            <img
                                src={assets.five}
                                alt={projects.five.title}
                                className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                            <div className="absolute bottom-0 left-0 w-full p-6 z-20 text-white flex flex-col justify-end">
                                <span className="text-[9px] text-green-400 font-bold uppercase tracking-widest font-mono">
                                    {projects.five.location}
                                </span>
                                <h4 className="text-lg font-bold font-playfair tracking-tight mt-1 group-hover:translate-x-1 transition-transform duration-300 text-white">
                                    {projects.five.title}
                                </h4>
                            </div>
                        </motion.div>

                        {/* Project 6 */}
                        <motion.div
                            custom={0.6}
                            variants={fadeInScale}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            className="relative h-[220px] rounded-[28px] overflow-hidden shadow-xs hover:shadow-md border border-neutral-100/60 group cursor-pointer"
                        >
                            <img
                                src={assets.six}
                                alt={projects.six.title}
                                className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                            <div className="absolute bottom-0 left-0 w-full p-6 z-20 text-white flex flex-col justify-end">
                                <span className="text-[9px] text-green-400 font-bold uppercase tracking-widest font-mono">
                                    {projects.six.location}
                                </span>
                                <h4 className="text-lg font-bold font-playfair tracking-tight mt-1 group-hover:translate-x-1 transition-transform duration-300 text-white">
                                    {projects.six.title}
                                </h4>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Link to project page */}
                <div className="flex w-full justify-start md:justify-end mt-12">
                    <button
                        onClick={() => navigate('/projects')}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-900 text-white hover:bg-green-800 rounded-full text-xs font-bold tracking-widest transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer uppercase font-sans group"
                    >
                        View all Projects
                        <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                </div>
            </main>
            </div>
        </section>
    );
};

export default ProjectShowcase;
