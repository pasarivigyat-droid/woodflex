import React, { useRef, useLayoutEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Header } from './Header'; // Adjust path if necessary, Header is in components
import { WhoAreYou } from './WhoAreYou';
import { Process } from './Process';
import { WhyUs } from './WhyUs';
import { Footer } from './Footer';
import { Loader } from './Loader'; // Adjust if needed
import { SmoothScroll } from './SmoothScroll'; // Adjust if needed
import { gsap } from 'gsap';

export const Home: React.FC = () => {
    // Moved Hero Logic here from App.tsx
    const heroRef = useRef<HTMLElement>(null);
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 2.2 });
            tl.from(".hero-text-row h1", {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power4.out"
            });
        }, heroRef);
        return () => ctx.revert();
    }, []);

    return (
        <SmoothScroll>
            {/* Note: Loader might need to be global in App.tsx typically, but can stay here for Home */}
            <Loader />
            <div className="min-h-screen flex flex-col w-full overflow-x-hidden bg-[#e8e6e1] text-[#1a1a1a] font-sans selection:bg-wood-200 selection:text-wood-900">
                <Header />
                <main className="flex-grow">
                    {/* HERO */}
                    <section ref={heroRef} className="relative w-full pt-40 pb-20 px-6 md:px-12 min-h-screen flex flex-col justify-center">
                        <div className="hero-text-row overflow-hidden">
                            <h1 className="font-serif text-[7vw] leading-[0.85] uppercase text-[#1a1a1a]">Designed by you,</h1>
                        </div>
                        <div className="hero-text-row overflow-hidden">
                            <h1 className="font-serif text-[7vw] leading-[0.85] uppercase text-[#1a1a1a]">crafted by us.</h1>
                        </div>
                        <div className="mt-12 flex flex-col md:flex-row justify-between items-start w-full border-t border-[#1a1a1a]/20 pt-8">
                            <div className="max-w-md">
                                <p className="text-lg leading-relaxed font-light mb-6">
                                    We’re manufacturers, not a design studio. Bring us drawings, references, or moodboards, and we'll turn them into real furniture, complete with the right wood, joinery, polish, and after-sales support.
                                </p>

                            </div>
                            <div className="mt-8 md:mt-0">
                                <span className="block text-sm uppercase tracking-widest mb-2">Est. 2024</span>
                                <span className="block text-sm uppercase tracking-widest">Surat, India</span>
                            </div>
                        </div>
                    </section>

                    <WhoAreYou />
                    <Process />
                    <WhyUs />
                </main>
                <Footer />
            </div>
        </SmoothScroll>
    );
}
