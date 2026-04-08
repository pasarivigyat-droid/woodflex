import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Product } from '../src/data/products';
import { LazyImage } from './LazyImage';

interface ProductModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [showFullTechnical, setShowFullTechnical] = useState(false);

    useEffect(() => {
        if (isOpen && product) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300); // Wait for fade out
            return () => clearTimeout(timer);
        }
    }, [isOpen, product]);

    // Handle ESC key for full-screen view
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (showFullTechnical) setShowFullTechnical(false);
                else onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [showFullTechnical, onClose]);

    if (!isVisible && !isOpen) return null;

    // Use product from props or null to avoid crash during closing animation
    const displayProduct = product;

    return (
        <>
            {/* MAIN MODAL */}
            <div
                className={`fixed inset-0 z-[60] bg-[#eff1f3]/95 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            >
                <div className="absolute inset-0" onClick={onClose} />

                {displayProduct && (
                    <div className={`relative w-[95vw] h-[90vh] bg-white shadow-2xl rounded-sm border border-[#2d2a26]/10 flex flex-col md:flex-row overflow-hidden transform transition-all duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>

                        {/* LEFT: VISUAL (Full width for Planters) */}
                        <div className={`h-full p-12 flex items-center justify-center bg-gray-50 relative border-r border-[#2d2a26]/5 transition-all duration-500 ${displayProduct.category === 'PLANTER_STAND' ? 'w-full' : 'w-full md:w-1/2'}`}>
                            <LazyImage
                                src={displayProduct.imagePath}
                                alt={displayProduct.title}
                                aspectRatio="h-full w-full"
                                className="drop-shadow-2xl animate-fade-in-up"
                            />
                            <div className="absolute bottom-8 left-8">
                                <h2 className="font-serif text-4xl md:text-5xl text-[#2d2a26] mb-2">{displayProduct.title}</h2>
                                <p className="text-sm uppercase tracking-widest text-[#2d2a26]/50">{displayProduct.category.replace('_', ' ')} Collection</p>
                            </div>
                        </div>

                        {/* RIGHT: TECHNICAL BOARD (Hidden for Planters) */}
                        {displayProduct.category !== 'PLANTER_STAND' && (
                            <div className="w-full md:w-1/2 h-full bg-[#fcfcfc] text-[#2d2a26] flex flex-col items-center justify-center relative p-8">
                                {displayProduct.technicalDrawing ? (
                                    <div
                                        className="relative w-full h-[85%] flex items-center justify-center cursor-zoom-in group"
                                        onClick={() => setShowFullTechnical(true)}
                                    >
                                        <LazyImage
                                            src={displayProduct.technicalDrawing}
                                            alt="Technical Board"
                                            aspectRatio="h-full w-full"
                                            className="opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-sm mix-blend-multiply"
                                        />
                                        <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full border border-black/5 text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                            Click to Expand
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-[#2d2a26]/20 font-serif italic text-lg">Technical Board Unavailable</div>
                                )}

                                {/* Caption / Helper */}
                                <div className="absolute top-8 left-8 pointer-events-none">
                                    <span className="text-[10px] uppercase tracking-widest text-[#2d2a26]/40 font-bold block mb-1">Technical Board</span>
                                    <span className="text-xs text-[#2d2a26]/60 font-mono block">Scale 1:20 • {displayProduct.id}</span>
                                </div>
                            </div>
                        )}

                        {/* CLOSE BUTTON */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-50 p-2 bg-[#2d2a26]/5 hover:bg-[#2d2a26]/10 rounded-full text-[#2d2a26] transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>
                )}
            </div>

            {/* FULL SCREEN TECHNICAL OVERLAY */}
            {showFullTechnical && displayProduct && displayProduct.technicalDrawing && (
                <div className="fixed inset-0 z-[70] bg-white flex items-center justify-center animate-fade-in">
                    <div className="absolute top-8 right-8 z-50">
                        <button
                            onClick={() => setShowFullTechnical(false)}
                            className="p-3 bg-black/5 hover:bg-black/10 rounded-full transition-colors"
                        >
                            <X size={32} className="text-[#2d2a26]" />
                        </button>
                    </div>

                    <div className="w-[95vw] h-[95vh] flex items-center justify-center p-4">
                        <img
                            src={displayProduct.technicalDrawing}
                            alt="Full Technical Board"
                            className="max-w-full max-h-full object-contain mix-blend-multiply"
                        />
                    </div>

                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#2d2a26]/40 font-mono text-xs uppercase tracking-widest">
                        Press ESC to close
                    </div>
                </div>
            )}
        </>
    );
};
