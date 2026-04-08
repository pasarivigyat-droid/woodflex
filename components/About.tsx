import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { SmoothScroll } from './SmoothScroll';

export const About: React.FC = () => {
    return (
        <SmoothScroll>
            <div className="min-h-screen flex flex-col w-full overflow-x-hidden bg-[#e8e6e1] text-[#1a1a1a] font-sans selection:bg-[#2d2a26] selection:text-white">
                <Header />

                <main className="flex-grow pt-40">
                    {/* SECTION 1: INTRO */}
                    <section className="px-6 md:px-12 py-24 border-b border-[#1a1a1a]/10">
                        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
                            <div className="col-span-1">
                                <h2 className="text-sm uppercase tracking-[0.2em] font-bold text-[#1a1a1a]/40">About Woodflex Designs</h2>
                            </div>
                            <div className="col-span-1 md:col-span-2">
                                <h3 className="font-serif text-4xl md:text-6xl leading-[1.1] text-[#1a1a1a] mb-12">
                                    A small furniture workshop built for custom work, not catalogues.
                                </h3>
                                <p className="text-xl md:text-2xl leading-relaxed font-light text-[#1a1a1a]/80 max-w-3xl">
                                    Woodflex Designs is a manufacturing studio in Surat. We don’t run a design agency or a giant showroom. Architects, interior designers and homeowners bring us drawings, references or 3D views – we turn them into finished furniture with the right wood, polish and joinery. Every piece is built in small batches, inspected by hand, and delivered with the mindset that it should survive moves, kids and real life.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 2: WHO WE'RE FOR */}
                    <section className="px-6 md:px-12 py-24 bg-white">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="text-sm uppercase tracking-[0.2em] font-bold text-[#1a1a1a]/40 mb-16 px-0 md:px-0">Who we're for</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                                {/* Column 1 */}
                                <div>
                                    <h4 className="font-serif text-3xl mb-8">For architects & interior designers</h4>
                                    <ul className="space-y-6">
                                        {[
                                            "You own the design. We focus only on execution.",
                                            "We work off DWG, PDFs, moodboards or even rough sketches with sizes.",
                                            "You get material options, realistic timelines and transparent costing.",
                                            "Need 1 prototype or 30 pieces for a project? We’re set up for both."
                                        ].map((bullet, i) => (
                                            <li key={i} className="flex gap-4 items-start text-lg text-[#1a1a1a]/70">
                                                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#1a1a1a]/30 flex-shrink-0" />
                                                {bullet}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {/* Column 2 */}
                                <div>
                                    <h4 className="font-serif text-3xl mb-8">For homeowners</h4>
                                    <ul className="space-y-6">
                                        {[
                                            "When store catalogues don’t match your space, we build to size.",
                                            "You can start with a reference photo and basic measurements.",
                                            "We help you choose wood and finishes that will actually age well.",
                                            "Once a piece is delivered, we stay available for touch-ups and repeats."
                                        ].map((bullet, i) => (
                                            <li key={i} className="flex gap-4 items-start text-lg text-[#1a1a1a]/70">
                                                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#1a1a1a]/30 flex-shrink-0" />
                                                {bullet}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 3: WHY A SMALL WORKSHOP */}
                    <section className="px-6 md:px-12 py-24 bg-[#1a1a1a] text-[#e8e6e1]">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="font-serif text-4xl md:text-5xl mb-16">Why teams trust a small workshop</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16">
                                {[
                                    { title: "Direct access to makers", desc: "You talk to the people who actually build your pieces." },
                                    { title: "Custom over compromise", desc: "Dimensions, wood and polish tuned to your project, not forced Products." },
                                    { title: "Quality over volume", desc: "Solid frames, clean joinery, hardware we’d use in our own homes." },
                                    { title: "Predictable outcomes", desc: "We’d rather say no than over-promise on timelines or complexity." }
                                ].map((item, i) => (
                                    <div key={i} className="border-t border-white/10 pt-8">
                                        <h4 className="font-serif text-xl mb-3 tracking-wide">{item.title}</h4>
                                        <p className="text-[#e8e6e1]/60 leading-relaxed font-light">
                                            {item.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </SmoothScroll>
    );
};
