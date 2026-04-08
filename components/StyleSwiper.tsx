import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { X, Heart, Check, Sparkles } from 'lucide-react';
import { products, Product } from '../src/data/products';
import { supabase } from '../src/lib/supabase';

// Shuffle helper
const shuffle = (array: any[]) => array.sort(() => Math.random() - 0.5);

interface StyleSwiperProps {
    onComplete: (winningStyle: string) => void;
    onClose: () => void;
}

export const StyleSwiper: React.FC<StyleSwiperProps> = ({ onComplete, onClose }) => {
    const [cards, setCards] = useState<Product[]>([]);
    const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
    const [scores, setScores] = useState<Record<string, number>>({});
    const [showResult, setShowResult] = useState(false);
    const [winningStyle, setWinningStyle] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    // Load initial stack
    useEffect(() => {
        // Filter products that have a style tag
        const styledProducts = products.filter(p => p.style);
        // Shuffle and pick 10
        const selected = shuffle(styledProducts).slice(0, 10);
        setCards(selected);
        setIsLoading(false);
    }, []);

    const handleSwipe = (direction: 'left' | 'right', product: Product) => {
        setSwipeDirection(direction);

        if (direction === 'right' && product.style) {
            setScores(prev => ({
                ...prev,
                [product.style!]: (prev[product.style!] || 0) + 1
            }));
        }

        // Remove card after animation
        setTimeout(() => {
            setCards(prev => prev.slice(0, -1));
            setSwipeDirection(null);
        }, 200);
    };

    // Check for completion
    useEffect(() => {
        if (isLoading) return;

        if (cards.length === 0 && Object.keys(scores).length > 0) {
            calculateWinner();
        } else if (cards.length === 0 && Object.keys(scores).length === 0) {
            // User swiped left on everything? Default to Modern
            setWinningStyle('Modern');
            setShowResult(true);
        }
    }, [cards, isLoading]);

    const calculateWinner = async () => {
        const winner = Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b)[0];
        setWinningStyle(winner);
        setShowResult(true);

        // Save "Shadow Lead" to Supabase
        try {
            await supabase.from('leads').insert([
                { style_preference: winner, source: 'StyleSwiper' }
            ]);
        } catch (error) {
            console.error('Error saving style preference:', error);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2d2a26]/95 backdrop-blur-xl p-4 overflow-hidden">

            {/* Close Button */}
            <button onClick={onClose} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors z-[110]">
                <X size={32} />
            </button>

            {!showResult ? (
                <div className="relative w-full max-w-sm aspect-[3/4]">
                    {/* Header */}
                    <div className="absolute -top-20 left-0 w-full text-center">
                        <h2 className="text-white font-serif text-3xl mb-1">Vibe Check</h2>
                        <p className="text-white/40 text-xs uppercase tracking-widest">Swipe Right to Like • Left to Pass</p>
                    </div>

                    <div className="relative w-full h-full">
                        <AnimatePresence>
                            {cards.map((product, index) => {
                                // Only render the top 2 cards for performance
                                if (index < cards.length - 2) return null;
                                const isFront = index === cards.length - 1;

                                return (
                                    <SwipableCard
                                        product={product}
                                        isFront={isFront}
                                        onSwipe={(dir) => handleSwipe(dir, product)}
                                    />
                                );
                            })}
                        </AnimatePresence>

                        {cards.length === 0 && !isLoading && (
                            <div className="flex items-center justify-center h-full text-white/50">
                                <p>Finding your style...</p>
                            </div>
                        )}

                        {isLoading && (
                            <div className="flex items-center justify-center h-full text-white/50">
                                <p>Loading looks...</p>
                            </div>
                        )}
                    </div>

                    {/* Controls (for desktop mostly) */}
                    <div className="absolute -bottom-24 w-full flex justify-center gap-8">
                        <button
                            onClick={() => cards.length > 0 && handleSwipe('left', cards[cards.length - 1])}
                            className="w-16 h-16 rounded-full bg-[#ff4b4b] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                        >
                            <X size={24} />
                        </button>
                        <button
                            onClick={() => cards.length > 0 && handleSwipe('right', cards[cards.length - 1])}
                            className="w-16 h-16 rounded-full bg-[#4aff93] text-[#2d2a26] flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                        >
                            <Heart size={24} fill="currentColor" />
                        </button>
                    </div>
                </div>
            ) : (
                <ResultView style={winningStyle} onComplete={() => onComplete(winningStyle)} />
            )}
        </div>
    );
};

// --- Subcomponents ---

const SwipableCard = ({ product, isFront, onSwipe }: { product: Product, isFront: boolean, onSwipe: (dir: 'left' | 'right') => void }) => {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-25, 25]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

    // Color overlays
    const likeOpacity = useTransform(x, [0, 100], [0, 1]);
    const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

    const handleDragEnd = (_: any, info: any) => {
        if (info.offset.x > 100) onSwipe('right');
        else if (info.offset.x < -100) onSwipe('left');
    };

    return (
        <motion.div
            style={{ x, rotate, opacity, zIndex: isFront ? 50 : 0 }}
            drag={isFront ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            initial={{ scale: 0.95, y: 10 }}
            animate={{ scale: isFront ? 1 : 0.95, y: isFront ? 0 : 10 }}
            exit={{ x: x.get() < 0 ? -200 : 200, opacity: 0, transition: { duration: 0.2 } }}
            className="absolute inset-0 bg-white rounded-3xl overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing origin-bottom"
        >
            <img src={product.imagePath} alt={product.title} className="w-full h-full object-cover pointer-events-none" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-0 left-0 p-8 w-full pointer-events-none">
                <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-[10px] uppercase tracking-widest text-white mb-3">
                    {product.style || product.category}
                </div>
                <h3 className="text-white font-serif text-2xl leading-none mb-1">{product.title}</h3>
                <p className="text-white/60 text-xs">{product.type}</p>
            </div>

            {/* Swipe Indicators */}
            <motion.div style={{ opacity: likeOpacity }} className="absolute top-8 left-8 border-4 border-[#4aff93] rounded-lg px-4 py-2 -rotate-12 pointer-events-none">
                <span className="text-[#4aff93] text-2xl font-black uppercase tracking-widest">LIKE</span>
            </motion.div>
            <motion.div style={{ opacity: nopeOpacity }} className="absolute top-8 right-8 border-4 border-[#ff4b4b] rounded-lg px-4 py-2 rotate-12 pointer-events-none">
                <span className="text-[#ff4b4b] text-2xl font-black uppercase tracking-widest">NOPE</span>
            </motion.div>
        </motion.div>
    );
};

const ResultView = ({ style, onComplete }: { style: string, onComplete: () => void }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md p-8"
        >
            <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(255,255,255,0.3)]">
                <Sparkles size={40} className="text-[#2d2a26]" />
            </div>

            <h2 className="text-white/60 text-sm uppercase tracking-[0.3em] mb-2">We found your vibe</h2>
            <h1 className="text-white font-serif text-5xl md:text-6xl mb-8 capitalize">{style}</h1>

            <p className="text-white/60 leading-relaxed mb-10">
                We've curated a complete room package based on your {style} preferences.
                Everything is matched and ready to go.
            </p>

            <button
                onClick={onComplete}
                className="w-full bg-white text-[#2d2a26] py-5 rounded-xl font-bold uppercase tracking-[0.2em] hover:scale-[1.02] transition-transform shadow-2xl"
            >
                Build My Room
            </button>
        </motion.div>
    );
};
