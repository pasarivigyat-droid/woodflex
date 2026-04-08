import React, { useState, useRef } from 'react';
import { showcaseItems } from '../src/data/showcase';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = ['All', 'Chair', 'Sofa', 'Bed', 'Dining'];

export const ProjectShowcase: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const containerRef = useRef<HTMLDivElement>(null);

    const filteredData = activeCategory === 'All'
        ? showcaseItems
        : showcaseItems.filter(item => item.type.toLowerCase() === activeCategory.toLowerCase());

    useGSAP(() => {
        gsap.fromTo(".project-card",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
        );
    }, { scope: containerRef, dependencies: [activeCategory] });

    return (
        <section className="py-24 bg-[#e8e6e1] text-[#1a1a1a]" ref={containerRef}>
            <div className="max-w-[1400px] mx-auto px-6">

                <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between border-b border-[#1a1a1a]/20 pb-8">
                    <div>
                        <span className="block text-sm font-mono tracking-widest text-wood-500 mb-2">/ ARCHIVE_01</span>
                        <h2 className="font-serif text-4xl md:text-6xl text-[#1a1a1a]">Workshop Archive</h2>
                    </div>

                    <div className="mt-8 md:mt-0 flex flex-wrap gap-4">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 text-sm uppercase tracking-wide border transition-all duration-300
                                    ${activeCategory === cat
                                        ? 'border-[#1a1a1a] bg-[#1a1a1a] text-[#e8e6e1]'
                                        : 'border-[#1a1a1a]/30 text-[#1a1a1a]/60 hover:border-[#1a1a1a] hover:text-[#1a1a1a]'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredData.map((project) => (
                        <div key={project.id} className="project-card group relative bg-white aspect-[4/5] overflow-hidden cursor-pointer">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-[#1a1a1a]/0 group-hover:bg-[#1a1a1a]/80 transition-colors duration-500 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                    <span className="inline-block px-2 py-1 bg-[#e8e6e1] text-[10px] font-mono uppercase tracking-widest mb-3">
                                        REF: {project.id.toUpperCase()}
                                    </span>
                                    <h3 className="font-serif text-2xl text-[#e8e6e1] mb-2">{project.title}</h3>
                                    <p className="text-[#e8e6e1]/70 font-light text-sm mb-4 line-clamp-2">
                                        {project.subtitle || 'A piece crafted with precision and care.'}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-[10px] uppercase border border-[#e8e6e1]/30 text-[#e8e6e1]/60 px-2 py-1 rounded-full">
                                            {project.type}
                                        </span>
                                        <span className="text-[10px] uppercase border border-[#e8e6e1]/30 text-[#e8e6e1]/60 px-2 py-1 rounded-full">
                                            {project.context}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};
