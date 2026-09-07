import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LazyImageProps {
    src?: string;
    alt?: string;
    className?: string;
    aspectRatio?: string;
    objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
    onClick?: () => void;
    showWatermark?: boolean;
}

export const LazyImage: React.FC<LazyImageProps> = ({
    src,
    alt = "Woodflex Furniture Design",
    className = "",
    aspectRatio = "aspect-[4/5]",
    objectFit = "contain",
    onClick,
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Viewport detection: preload when within 250px of viewport
    useEffect(() => {
        if (!containerRef.current) return;
        if (!("IntersectionObserver" in window)) {
            setIsInView(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "250px" }
        );

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    // Load image only when in view
    useEffect(() => {
        if (!isInView || !src) {
            if (!src) setError(true);
            return;
        }

        setIsLoaded(false);
        setError(false);

        const img = new Image();
        img.src = src;
        img.onload = () => setIsLoaded(true);
        img.onerror = () => {
            setError(true);
        };

        return () => {
            img.onload = null;
            img.onerror = null;
        };
    }, [src, isInView]);

    const isBlendMultiply = className.includes("mix-blend-multiply") || (!className.includes("object-cover") && objectFit === "contain");

    return (
        <div
            ref={containerRef}
            onClick={onClick}
            className={`relative overflow-hidden bg-[#faf8f5] select-none ${aspectRatio} ${className} ${onClick ? "cursor-pointer" : ""}`}
        >
            {/* 1. SKELETON / LOADING SHIMMER STATE */}
            <AnimatePresence>
                {!isLoaded && !error && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#faf8f5]"
                    >
                        {/* Shimmer overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f1ebe1]/60 to-transparent bg-[length:200%_100%] animate-warm-shimmer" />

                        {/* Minimalist Woodflex Brand Mark */}
                        <div className="relative z-10 flex flex-col items-center justify-center opacity-40">
                            <div className="w-8 h-8 rounded-full border border-[#8b6f4e]/30 flex items-center justify-center mb-2">
                                <span className="text-[10px] font-serif font-semibold text-[#8b6f4e]">W</span>
                            </div>
                            <span className="text-[9px] uppercase tracking-[0.25em] text-[#8b6f4e]/70 font-medium">
                                Woodflex
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 2. LUXURY ERROR / UNAVAILABLE FALLBACK CARD */}
            {error && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#faf8f5] to-[#f4eee4] border border-[#e8dfd1]/50">
                    <div className="w-12 h-12 rounded-xl bg-white/80 shadow-sm border border-[#e8dfd1] flex items-center justify-center mb-3">
                        <svg
                            className="w-6 h-6 text-[#8b6f4e]/60"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        >
                            <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l9 6 9-6M3 7l9-4 9 4" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.3" />
                        </svg>
                    </div>
                    <p className="text-[11px] font-serif text-[#2d2a26] font-medium tracking-wide line-clamp-2 max-w-[85%] mb-1">
                        {alt}
                    </p>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#8b6f4e] font-semibold bg-[#8b6f4e]/10 px-2 py-0.5 rounded">
                        Custom Spec
                    </span>
                </div>
            )}

            {/* 3. ACTUAL IMAGE (Fades in with smooth Framer Motion) */}
            {isInView && src && !error && (
                <motion.img
                    key={src}
                    src={src}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{
                        opacity: isLoaded ? 1 : 0,
                        scale: isLoaded ? 1 : 1.03,
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className={`w-full h-full object-${objectFit} ${isBlendMultiply ? "mix-blend-multiply" : ""} ${isLoaded ? "" : "absolute inset-0"}`}
                />
            )}

            <style>{`
                @keyframes warmShimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                .animate-warm-shimmer {
                    animation: warmShimmer 1.8s infinite linear;
                }
            `}</style>
        </div>
    );
};
