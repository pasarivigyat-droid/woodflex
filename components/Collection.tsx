"use client";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

import { products } from "../src/data/products";

// Use the first 20 products for now to avoid overwhelming the list, or all of them.
// Let's us all of them but maybe slice if it's too long.
const items = products;


export const Collection: React.FC = () => {
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Move the cursor/image container
        const moveCursor = (e: MouseEvent) => {
            if (cursorRef.current) {
                gsap.to(cursorRef.current, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.5,
                    ease: "power2.out",
                });
            }
        };
        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, []);

    useEffect(() => {
        if (cursorRef.current) {
            if (activeImage) {
                gsap.to(cursorRef.current, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.3,
                });
            } else {
                gsap.to(cursorRef.current, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3,
                });
            }
        }
    }, [activeImage]);

    return (
        <section className="relative w-full py-24 border-t border-[#1a1a1a]/20 cursor-default" ref={containerRef}>

            {/* Floating Image Preview */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-[300px] h-[400px] pointer-events-none z-50 rounded-lg overflow-hidden shadow-2xl opacity-0 hidden md:block"
                style={{ transform: "translate(-50%, -50%) scale(0)" }}
            >
                {activeImage && (
                    <img
                        src={activeImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                    />
                )}
            </div>

            <div className="px-6 md:px-12 mb-12">
                <span className="text-sm uppercase tracking-widest text-[#1a1a1a]/60">Collection</span>
            </div>

            <div className="w-full">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="group py-8 border-b border-[#1a1a1a]/10 px-6 md:px-12 hover:bg-white/50 transition-colors cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center"
                        onMouseEnter={() => setActiveImage(item.imagePath)}
                        onMouseLeave={() => setActiveImage(null)}
                    >
                        <h2 className="text-4xl md:text-6xl font-serif text-[#1a1a1a] transition-transform duration-500 group-hover:translate-x-4">
                            {item.title}
                        </h2>
                        <div className="flex gap-12 mt-4 md:mt-0 opacity-50 text-sm uppercase tracking-widest group-hover:opacity-100 transition-opacity">
                            <span>{item.category}</span>
                            <span className="hidden md:inline">{item.type}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
