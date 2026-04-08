import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { showcaseItems, ShowcaseItem, FurnitureType } from '../src/data/showcase';
import { cdn } from '../src/utils/cdn';
import { X, Maximize2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { LazyImage } from './LazyImage';

const CATEGORIES: { label: string; value: FurnitureType | 'all' }[] = [
    { label: 'All Projects', value: 'all' },
    { label: 'Chairs', value: 'chair' },
    { label: 'Sofas', value: 'sofa' },
    { label: 'Bed Frames', value: 'bed' },
];

export const OurWork: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<FurnitureType | 'all'>('all');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const masonryRef = useRef<HTMLDivElement>(null);

    const filteredItems = useMemo(() => {
        if (activeCategory === 'all') return showcaseItems;
        return showcaseItems.filter((item) => item.type === activeCategory);
    }, [activeCategory]);

    const getCount = (val: FurnitureType | 'all') => {
        if (val === 'all') return showcaseItems.length;
        return showcaseItems.filter(item => item.type === val).length;
    };

    // Entry Animations
    useEffect(() => {
        if (!containerRef.current) return;
        const ctx = gsap.context(() => {
            gsap.from(".hero-content > *", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
            });
            gsap.from(".hero-image", {
                scale: 1.05,
                opacity: 0,
                duration: 1.2,
                ease: "power2.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    // Grid Animations on Category Change
    useEffect(() => {
        if (!masonryRef.current) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(".work-card",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.03, ease: "power2.out" }
            );
        }, masonryRef);
        return () => ctx.revert();
    }, [activeCategory]);

    return (
        <div ref={containerRef} className="min-h-screen bg-[#FDFCFB] text-[#1a1a1a] font-sans selection:bg-wood-100">
            <Header />

            <main className="pt-24 md:pt-32 pb-24">
                {/* HERO SECTION - IMPROVED ASPECT RATIO */}
                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-20 md:mb-32">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
                        <div className="w-full lg:w-5/12 hero-content text-center lg:text-left">
                            <span className="text-xs uppercase tracking-[0.3em] text-wood-600 font-bold mb-6 block">Project Showcase</span>
                            <h1 className="font-serif text-5xl md:text-8xl leading-[0.9] mb-8 tracking-tighter">
                                Built for <br />
                                <span className="italic relative">
                                    Real Homes
                                    <svg className="absolute -bottom-2 left-0 w-full h-3 text-wood-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0 5 Q 25 0, 50 5 T 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                                    </svg>
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl font-light text-[#1a1a1a]/60 max-w-lg mx-auto lg:mx-0 leading-relaxed mb-10">
                                A curated gallery of our workshop creations. Every piece is allowed to keep its natural story, precisely as it lives in a home.
                            </p>
                            <div className="flex justify-center lg:justify-start">
                                <button
                                    onClick={() => document.getElementById('work-grid')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="px-8 py-4 bg-[#1a1a1a] text-white rounded-full text-xs uppercase tracking-widest hover:bg-black transition-all flex items-center gap-3 group"
                                >
                                    View Gallery <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>

                        <div className="w-full lg:w-7/12">
                            {/* Adjusted to a more cinematic 16:10 ratio for the horizontal bed photo */}
                            <div className="hero-image aspect-[16/10] md:aspect-[16/9] bg-wood-50 overflow-hidden rounded-2xl shadow-2xl relative group">
                                <LazyImage
                                    src={cdn("Showcase/bed frames/our-work-hero.png")}
                                    alt="Hero Showcase"
                                    className="w-full h-full object-cover"
                                    aspectRatio="h-full w-full"
                                />
                                <div className="absolute inset-0 bg-black/5 transition-colors duration-500" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* CATEGORY BAR */}
                <div className="sticky top-20 z-40 bg-[#FDFCFB]/90 backdrop-blur-md border-b border-[#1a1a1a]/5 py-4 mb-16 overflow-x-auto scrollbar-hide">
                    <div className="px-6 md:px-12 max-w-7xl mx-auto flex gap-10 min-w-max justify-center lg:justify-start">
                        {CATEGORIES.map((cat) => {
                            const isActive = activeCategory === cat.value;
                            const count = getCount(cat.value);
                            return (
                                <button
                                    key={cat.value}
                                    onClick={() => setActiveCategory(cat.value)}
                                    className={`group relative pb-2 text-sm uppercase tracking-widest transition-all ${isActive ? 'text-[#1a1a1a] font-bold' : 'text-[#1a1a1a]/40 hover:text-[#1a1a1a]'
                                        }`}
                                >
                                    {cat.label} <span className="text-[10px] align-top opacity-50 ml-1">({count})</span>
                                    <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#1a1a1a] transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'
                                        }`} />
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* PROJECT MASONRY GRID */}
                <section id="work-grid" className="px-6 md:px-12 max-w-7xl mx-auto scroll-mt-32">
                    <div
                        ref={masonryRef}
                        className="columns-1 md:columns-2 lg:columns-3 gap-8"
                    >
                        {filteredItems.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => setSelectedImage(item.image)}
                                className="work-card group cursor-pointer break-inside-avoid relative overflow-hidden rounded-xl bg-wood-50 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 mb-8"
                            >
                                <img
                                    src={item.image}
                                    alt="Showcase Project"
                                    className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
                                    loading="lazy"
                                />

                                {/* Badges */}
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <div className="bg-white/80 backdrop-blur-md px-3 py-1 rounded-sm shadow-sm border border-black/5">
                                        <span className="text-[10px] uppercase tracking-widest font-black text-wood-700">
                                            {item.context === 'studio' ? 'Workshop' : 'Real Home'}
                                        </span>
                                    </div>
                                </div>

                                {/* Zoom Icon Overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/30 scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500">
                                        <Maximize2 className="text-white w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />

            {/* LIGHTBOX MODAL */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-[#FDFCFB]/98 backdrop-blur-xl flex items-center justify-center md:p-12 p-6"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-8 right-8 text-[#1a1a1a]/40 hover:text-[#1a1a1a] transition-colors p-2 bg-[#1a1a1a]/5 rounded-full"
                        >
                            <X size={28} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.4, ease: "circOut" }}
                            className="relative max-w-7xl w-full h-full flex items-center justify-center"
                            onClick={e => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage}
                                alt="Showcase Project Detail"
                                className="max-w-full max-h-[90vh] object-contain shadow-2xl rounded-lg"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
