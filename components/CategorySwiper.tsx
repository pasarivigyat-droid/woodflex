import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { X, Heart, Ruler, ChevronRight, Check, Sparkles, ArrowRight } from 'lucide-react';
import { Product, RoomCategory, CATEGORY_LABELS } from '../src/data/products';
import { trackEvent } from '../src/utils/analytics';
import { useImagePreload } from '../src/hooks/useImagePreload';
import { LazyImage } from './LazyImage';

interface CategorySwiperProps {
    roomType: "living" | "dining";
    category: RoomCategory;
    products: Product[];
    onCategoryDone: (category: RoomCategory, likedIds: string[]) => void;
}

const WAVE_SIZE = 8;

export const CategorySwiper: React.FC<CategorySwiperProps> = ({
    roomType,
    category,
    products,
    onCategoryDone
}) => {
    const [waveIndex, setWaveIndex] = useState(0);
    const [currentIndexInWave, setCurrentIndexInWave] = useState(0);
    const [likedIds, setLikedIds] = useState<string[]>([]);
    const [showSummary, setShowSummary] = useState(false);
    const [techProduct, setTechProduct] = useState<Product | null>(null);

    const allProductsForCategory = useMemo(() => {
        // Map old categories to new ones if necessary
        const mapping: Record<string, string> = {
            'SOFA': 'sofa',
            'LOUNGE_CHAIR': 'lounge_chair',
            'CENTER_TABLE': 'center_table',
            'SIDE_TABLE': 'center_table', // Map side tables to center table step
            'PLANTER_STAND': 'planter',
            'DINING_TABLE': 'dining_table',
            'DINING_CHAIR': 'dining_chair',
            'JHULA': 'jhula'
        };

        return products.filter(p => {
            const normalizedCat = mapping[p.category] || p.category.toLowerCase();
            return normalizedCat === category;
        });
    }, [products, category, roomType]);

    const waves = useMemo(() => {
        const result = [];
        for (let i = 0; i < allProductsForCategory.length; i += WAVE_SIZE) {
            result.push(allProductsForCategory.slice(i, i + WAVE_SIZE));
        }
        return result;
    }, [allProductsForCategory]);

    const currentWave = waves[waveIndex] || [];
    const currentProduct = currentWave[currentWave.length - 1 - currentIndexInWave];

    // PRELOAD: Capture the next 6 images in the wave to eliminate lag
    const nextImages = useMemo(() => {
        const remaining = currentWave.slice(0, currentWave.length - 1 - currentIndexInWave);
        return remaining.slice(-6).map(p => p.imagePath);
    }, [currentWave, currentIndexInWave]);

    useImagePreload(nextImages);

    const handleSwipe = (direction: 'left' | 'right', product: Product) => {
        trackEvent("houseowner_product_swiped", {
            direction,
            productId: product.id,
            productTitle: product.title,
            category,
            roomType
        });

        if (direction === 'right') {
            setLikedIds(prev => [...prev, product.id]);
        }

        if (currentIndexInWave + 1 >= currentWave.length) {
            setShowSummary(true);
        } else {
            setCurrentIndexInWave(prev => prev + 1);
        }
    };

    const handleNextWave = () => {
        setWaveIndex(prev => prev + 1);
        setCurrentIndexInWave(0);
        setShowSummary(false);
    };

    const handleFinishCategory = () => {
        onCategoryDone(category, likedIds);
    };

    if (currentWave.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center text-white/60">
                <p>No products found for {CATEGORY_LABELS[category] || category.replace('_', ' ')}.</p>
                <button
                    onClick={handleFinishCategory}
                    className="mt-6 px-8 py-3 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs"
                >
                    Next Category
                </button>
            </div>
        );
    }

    return (
        <div className="relative w-full max-w-sm aspect-[3/4] mx-auto">
            {/* Header */}
            <div className="absolute -top-32 left-0 w-full text-center px-4">
                <h3 className="text-white/30 text-[9px] uppercase tracking-[0.5em] mb-2">
                    {roomType.replace('_', ' ')} Selection
                </h3>
                <h2 className="text-white font-serif text-4xl leading-tight">
                    {CATEGORY_LABELS[category] || category.replace('_', ' ')}
                </h2>
                <div className="text-white/40 font-sans text-[10px] mt-1 uppercase tracking-[0.2em] font-medium">
                    {currentIndexInWave + 1} of {currentWave.length} in this wave
                </div>
            </div>

            <div className="relative w-full h-full">
                <AnimatePresence mode='popLayout'>
                    {!showSummary ? (
                        currentWave.slice(0, currentWave.length - currentIndexInWave).map((product, idx) => {
                            const isFront = idx === currentWave.length - currentIndexInWave - 1;
                            if (idx < currentWave.length - currentIndexInWave - 2) return null;

                            return (
                                <div key={product.id}>
                                    <SwipableCard
                                        product={product}
                                        isFront={isFront}
                                        onSwipe={(dir) => handleSwipe(dir, product)}
                                        onShowTech={() => setTechProduct(product)}
                                    />
                                </div>
                            );
                        })
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute inset-0 bg-white rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl"
                        >
                            <div className="w-16 h-16 bg-[#eff1f3] rounded-full flex items-center justify-center mb-6">
                                <Sparkles size={32} className="text-[#2d2a26]" />
                            </div>
                            <h3 className="font-serif text-2xl text-[#2d2a26] mb-2">Wave Complete</h3>
                            <p className="text-[#2d2a26]/60 text-sm mb-8">
                                You've seen {currentWave.length} {CATEGORY_LABELS[category] || category.replace('_', ' ')}.<br />
                                You liked {likedIds.filter(id => currentWave.some(p => p.id === id)).length}.
                            </p>

                            <div className="w-full space-y-3">
                                {waveIndex + 1 < waves.length && (
                                    <button
                                        onClick={handleNextWave}
                                        className="w-full py-4 bg-[#eff1f3] text-[#2d2a26] rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-[#e5e7e9] transition-colors"
                                    >
                                        Show More {CATEGORY_LABELS[category] || category.replace('_', ' ')}
                                    </button>
                                )}
                                <button
                                    onClick={handleFinishCategory}
                                    className="w-full py-4 bg-[#2d2a26] text-white rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2"
                                >
                                    Next Category <ChevronRight size={14} />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Tech Overlay */}
            <AnimatePresence>
                {techProduct && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setTechProduct(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl"
                        >
                            <div className="p-6 border-b flex justify-between items-center">
                                <h3 className="font-serif text-xl">{techProduct.title} Details</h3>
                                <button onClick={() => setTechProduct(null)} className="p-2 hover:bg-gray-100 rounded-full">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="p-8">
                                {techProduct.technicalDrawing ? (
                                    <LazyImage src={techProduct.technicalDrawing} alt="Technical Drawing" aspectRatio="aspect-video" className="mb-8 p-4 bg-[#f9fafb] rounded-xl" />
                                ) : (
                                    <div className="w-full aspect-video bg-gray-100 rounded-xl flex items-center justify-center mb-8">
                                        <p className="text-gray-400">No technical drawing available</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="p-4 bg-[#f9fafb] rounded-xl text-center">
                                        <div className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Width</div>
                                        <div className="font-bold text-sm">{techProduct.dimensions?.width || 'N/A'}</div>
                                    </div>
                                    <div className="p-4 bg-[#f9fafb] rounded-xl text-center">
                                        <div className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Depth</div>
                                        <div className="font-bold text-sm">{techProduct.dimensions?.depth || 'N/A'}</div>
                                    </div>
                                    <div className="p-4 bg-[#f9fafb] rounded-xl text-center">
                                        <div className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Height</div>
                                        <div className="font-bold text-sm">{techProduct.dimensions?.height || 'N/A'}</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

const SwipableCard = ({ product, isFront, onSwipe, onShowTech }: { product: Product, isFront: boolean, onSwipe: (dir: 'left' | 'right') => void, onShowTech: () => void }) => {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-25, 25]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

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
            className="absolute inset-0 bg-white rounded-3xl overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing origin-bottom"
        >
            <LazyImage src={product.imagePath} alt={product.title} className="pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            <button
                onClick={(e) => { e.stopPropagation(); onShowTech(); }}
                className="absolute top-5 right-5 w-16 h-16 rounded-full bg-black/20 backdrop-blur-xl flex flex-col items-center justify-center text-white hover:bg-black/40 transition-all z-10 border border-white/10 shadow-2xl group/measure"
            >
                <Ruler size={22} className="group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                <span className="text-[7px] uppercase font-bold mt-1 tracking-[0.1em] opacity-80">Dimensions</span>
            </button>

            <div className="absolute bottom-0 left-0 p-8 w-full pointer-events-none">
                <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-[10px] uppercase tracking-widest text-white mb-3">
                    {product.style || "Standard"}
                </div>
                <h3 className="text-white font-serif text-2xl leading-none mb-1">{product.title}</h3>
                <p className="text-white/60 text-xs">{product.type}</p>
            </div>

            <motion.div style={{ opacity: likeOpacity }} className="absolute top-8 left-8 border-4 border-[#4aff93] rounded-lg px-4 py-2 -rotate-12 pointer-events-none">
                <span className="text-[#4aff93] text-2xl font-black uppercase tracking-widest">LIKE</span>
            </motion.div>
            <motion.div style={{ opacity: nopeOpacity }} className="absolute top-8 right-8 border-4 border-[#ff4b4b] rounded-lg px-4 py-2 rotate-12 pointer-events-none">
                <span className="text-[#ff4b4b] text-2xl font-black uppercase tracking-widest">NOPE</span>
            </motion.div>
        </motion.div>
    );
};
