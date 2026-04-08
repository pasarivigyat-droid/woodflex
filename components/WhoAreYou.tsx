import React, { useRef, useLayoutEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { trackEvent } from '../src/utils/analytics';

gsap.registerPlugin(ScrollTrigger);

const personas = [
    {
        id: 'architects',
        title: 'Architects',
        description: 'We collaborate to bring visionary spatial concepts to life with precision and craft.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
        link: '/architect'
    },
    {
        id: 'homeowners',
        title: 'House Owners',
        description: 'Bespoke furniture solutions that transform your house into a sanctuary of style.',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200',
        link: '/house-owner'
    },
    {
        id: 'cafeowners',
        title: 'Cafe Owners',
        description: 'Durable, aesthetic, and functional designs to elevate your customer experience.',
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200',
        link: '/cafe-owner'
    }
];

export const WhoAreYou: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Animate Title - Ensure it starts visible if JS fails by using fromTo
            gsap.fromTo(titleRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 85%", // Trigger earlier
                    }
                }
            );

            // Animate Cards Stagger
            gsap.fromTo(".persona-card",
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%", // Trigger earlier
                    }
                }
            );

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="w-full py-24 md:py-32 px-6 md:px-12 bg-white text-[#1a1a1a] min-h-[80vh]">
            <div className="max-w-[1800px] mx-auto">

                {/* Header */}
                <div className="mb-20 md:mb-32">
                    <h2 ref={titleRef} className="font-serif text-[10vw] md:text-[8vw] leading-[0.9] text-[#1a1a1a]">
                        Who are you?
                    </h2>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                    {personas.map((persona) => (
                        <Link
                            to={persona.link}
                            key={persona.id}
                            onClick={() => {
                                let personaTag: "architect" | "houseowner" | "retail" | null = null;
                                if (persona.id === 'architects') personaTag = "architect";
                                else if (persona.id === 'homeowners') personaTag = "houseowner";
                                else if (persona.id === 'cafeowners') personaTag = "retail";

                                if (personaTag) {
                                    trackEvent("persona_selected", {
                                        persona: personaTag,
                                    });
                                }
                            }}
                            className="persona-card group relative h-[60vh] md:h-[70vh] w-full overflow-hidden rounded-xl bg-gray-100 cursor-pointer block transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl opacity-0" // start opacity-0 handled by gsap
                            style={{ opacity: 0 }} // Ensure it's hidden initially for GSAP to reveal
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <img
                                    src={persona.image}
                                    alt={persona.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                                <div className="flex justify-between items-start">
                                    <span className="text-sm font-medium tracking-widest uppercase border border-white/30 px-3 py-1 rounded-full backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-colors">
                                        0{personas.indexOf(persona) + 1}
                                    </span>
                                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300 group-hover:rotate-45">
                                        <ArrowUpRight size={20} />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-serif text-4xl md:text-5xl mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        {persona.title}
                                    </h3>
                                    <p className="max-w-xs text-sm md:text-base text-white/80 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                        {persona.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
};
