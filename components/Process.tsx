import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Process: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".process-item", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                },
                y: 50,
                opacity: 0,
                stagger: 0.2,
                duration: 1
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="w-full py-24 bg-[#1a1a1a] text-[#e8e6e1]">
            <div className="px-6 md:px-12 max-w-[1800px] mx-auto">

                {/* How We Work */}
                <div className="mb-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    <div className="process-item">
                        <span className="block text-sm uppercase tracking-widest text-[#e8e6e1]/60 mb-4">Our Method</span>
                        <h2 className="font-serif text-5xl md:text-7xl leading-none">
                            How we<br />work
                        </h2>
                    </div>
                    <div className="process-item space-y-8 md:pt-4">
                        <p className="text-xl md:text-2xl font-light leading-relaxed text-[#e8e6e1]/80">
                            We believe in a collaborative process that starts with understanding your needs and ends with a piece of furniture that is truly yours. From sketch to final polish, every step is handled with care.
                        </p>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-lg font-serif mb-2">01. Discovery</h4>
                                <p className="text-sm text-[#e8e6e1]/60">Understanding your space and functional requirements.</p>
                            </div>
                            <div>
                                <h4 className="text-lg font-serif mb-2">02. Design</h4>
                                <p className="text-sm text-[#e8e6e1]/60">Creating sketches and 3D models for approval.</p>
                            </div>
                            <div>
                                <h4 className="text-lg font-serif mb-2">03. Crafting</h4>
                                <p className="text-sm text-[#e8e6e1]/60">Precision woodworking using sustainable materials.</p>
                            </div>
                            <div>
                                <h4 className="text-lg font-serif mb-2">04. Delivery</h4>
                                <p className="text-sm text-[#e8e6e1]/60">Installation and final touches in your space.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Testing One / Materials */}
                <div className="process-item border-t border-[#e8e6e1]/10 pt-24">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        <h2 className="font-serif text-5xl md:text-7xl leading-none">Testing One</h2>
                        <p className="max-w-md text-[#e8e6e1]/60 mt-6 md:mt-0">
                            Our commitment to quality means rigorous testing of materials and joinery. We ensure longevity and durability in every piece we create.
                        </p>
                    </div>

                    <div className="w-full h-[50vh] bg-[#2a2a2a] rounded-xl overflow-hidden relative group">
                        {/* Placeholder for a video or technical image */}
                        <div className="absolute inset-0 flex items-center justify-center text-[#e8e6e1]/20 group-hover:text-[#e8e6e1]/40 transition-colors">
                            <span className="text-lg uppercase tracking-widest">[ Material Stress Test Visualization ]</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};
