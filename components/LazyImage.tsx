import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LazyImageProps {
    src: string;
    alt: string;
    className?: string;
    aspectRatio?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className = '', aspectRatio = 'aspect-[4/5]' }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setIsLoaded(false);
        setError(false);
        const img = new Image();
        img.src = src;
        img.onload = () => setIsLoaded(true);
        img.onerror = () => setError(true);
    }, [src]);

    return (
        <div className={`relative overflow-hidden bg-gray-50 ${aspectRatio} ${className}`}>
            {/* Skeleton / Placeholder */}
            {!isLoaded && !error && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 bg-[length:200%_100%] animate-shimmer" />
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-300 bg-gray-50 p-4 text-center">
                    <p className="text-[10px] uppercase tracking-widest font-bold">Image Unavailable</p>
                </div>
            )}

            {/* Actual Image */}
            <motion.img
                key={src}
                src={src}
                alt={alt}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{
                    opacity: isLoaded ? 1 : 0,
                    scale: isLoaded ? 1 : 1.05
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`w-full h-full object-contain mix-blend-multiply ${isLoaded ? '' : 'absolute inset-0'}`}
            />

            <style>{`
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                .animate-shimmer {
                    animation: shimmer 1.5s infinite linear;
                }
            `}</style>
        </div>
    );
};
