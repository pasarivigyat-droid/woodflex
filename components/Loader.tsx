"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export const Loader: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + Math.floor(Math.random() * 10) + 1;
            });
        }, 100);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (progress >= 100 && containerRef.current) {
            // Animation when loading is complete
            const tl = gsap.timeline();

            tl.to(counterRef.current, {
                opacity: 0,
                duration: 0.5,
                delay: 0.2,
            })
                .to(containerRef.current, {
                    y: "-100%",
                    duration: 1.5,
                    ease: "power4.inOut",
                });
        }
    }, [progress]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-50 flex items-center justify-center bg-wood-900 text-wood-50"
        >
            <div ref={counterRef} className="text-9xl font-serif">
                {Math.min(100, progress)}%
            </div>
        </div>
    );
};
