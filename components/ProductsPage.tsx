import React, { useState, useEffect, useRef, useMemo } from 'react';
import { products, Product, getRemoteProducts } from '../src/data/products';
import { useImagePreload } from '../src/hooks/useImagePreload';
import { ProductModal } from './ProductModal';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { LazyImage } from './LazyImage';
import { Link } from 'react-router-dom';
import { trackEvent } from '../src/utils/analytics';

const CATEGORIES = [
    { id: 'SOFA', label: 'Sofas', filter: (p: Product) => p.category === 'SOFA' },
    { id: 'DINING_TABLE', label: 'Dining Tables' },
    { id: 'LOUNGE_CHAIR', label: 'Lounges', filter: (p: Product) => p.category === 'LOUNGE_CHAIR' },
    { id: 'CHAIRS', label: 'Dining Chairs', filter: (p: Product) => p.category === 'DINING_CHAIR' },
    { id: 'TABLES', label: 'Center & Side Tables', filter: (p: Product) => p.category === 'CENTER_TABLE' || p.category === 'SIDE_TABLE' },
    { id: 'PLANTER_STAND', label: 'Planter Stands' },
    { id: 'JHULA', label: 'Jhulas / Swings' },
    { id: 'RETAIL_SEATING', label: 'Retail Seating' }
];

export const ProductsPage: React.FC = () => {
    // 1. STATE & FILTERING
    const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
    const [displayedProduct, setDisplayedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [liveProducts, setLiveProducts] = useState<Product[]>(products);

    const containerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        getRemoteProducts().then(setLiveProducts);
    }, []);

    const sessionProducts = useMemo(() => {
        return [...liveProducts].sort((a, b) =>
            a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' })
        );
    }, [liveProducts]);

    // 2. HELPERS
    const getProductsForCategory = (catId: string) => {
        const cat = CATEGORIES.find(c => c.id === catId);
        if (!cat) return [];
        if (cat.filter) {
            return sessionProducts.filter(cat.filter);
        }
        return sessionProducts.filter(p => p.category === catId);
    };

    const getCount = (catId: string) => {
        return getProductsForCategory(catId).length;
    };

    const filteredProducts = getProductsForCategory(activeCategory);

    // 3. PRELOAD
    const topImages = useMemo(() =>
        getProductsForCategory(activeCategory).slice(0, 12).map(p => p.imagePath),
        [activeCategory, liveProducts]
    );
    useImagePreload(topImages);

    // 3. ANIMATION ON CATEGORY CHANGE
    useEffect(() => {
        if (!gridRef.current) return;

        const ctx = gsap.context(() => {
            // Animate grid items IN
            gsap.fromTo(".product-card",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" }
            );
        }, gridRef);

        return () => ctx.revert();
    }, [activeCategory]);

    // Initial Load Animation
    useEffect(() => {
        if (!containerRef.current) return;
        const ctx = gsap.context(() => {
            gsap.from(".category-bar", {
                y: -20, opacity: 0, duration: 0.6, ease: "power2.out", delay: 0.2
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const handleProductClick = (product: Product) => {
        setDisplayedProduct(product);
        setIsModalOpen(true);
        trackEvent("view_sku_detail", {
            sku_id: product.id,
            name: product.title,
            category: product.category,
            persona: "catalog",
        });
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-[#f9f9f9] text-[#2d2a26] pb-20 pt-24 md:pt-32 px-6 md:px-12">

            {/* HEADLINE */}
            <div className="max-w-7xl mx-auto mb-12">
                <Link to="/" className="text-xs uppercase tracking-widest text-[#2d2a26]/50 hover:text-[#2d2a26] transition-colors mb-4 inline-block">Home</Link>
                <h1 className="font-serif text-4xl md:text-5xl">Product Collection</h1>
                <p className="text-[#2d2a26]/60 mt-4 max-w-2xl">
                    Explore our curated catalog of handcrafted furniture. Designed for modern living, built to last.
                </p>
            </div>

            {/* CATEGORY BAR */}
            <div className="category-bar sticky top-20 z-40 bg-[#f9f9f9]/90 backdrop-blur-sm border-b border-[#2d2a26]/10 mb-12 py-4 -mx-6 px-6 md:-mx-12 md:px-12 overflow-x-auto scrollbar-hide">
                <div className="flex gap-8 max-w-7xl mx-auto min-w-max">
                    {CATEGORIES.map(cat => {
                        const count = getCount(cat.id);
                        const isActive = activeCategory === cat.id;

                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`group relative pb-2 text-sm uppercase tracking-widest transition-colors ${isActive ? 'text-[#2d2a26] font-bold' : 'text-[#2d2a26]/50 hover:text-[#2d2a26]'
                                    }`}
                            >
                                {cat.label} <span className="text-[10px] align-top opacity-60 ml-1">({count})</span>
                                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#2d2a26] transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'
                                    }`} />
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* PRODUCT GRID */}
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 max-w-7xl mx-auto min-h-[50vh]">
                {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        onClick={() => handleProductClick(product)}
                        className="product-card group cursor-pointer"
                    >
                        {/* Image Container */}
                        <div className="w-full aspect-[4/5] bg-white rounded-sm overflow-hidden relative mb-4 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1">
                            <LazyImage
                                src={product.imagePath}
                                alt={product.title}
                                className="transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Overlay Label */}
                            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-end">
                                <span className="text-white text-xs uppercase tracking-widest flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                    View Details <ArrowRight size={12} />
                                </span>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-serif text-lg leading-tight group-hover:text-[#2d2a26]/80 transition-colors">{product.title}</h3>
                                <p className="text-xs uppercase tracking-widest text-[#2d2a26]/40 mt-1">{product.id}</p>
                            </div>
                            {/* Optional: Add price or other meta if available */}
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full py-20 text-center text-[#2d2a26]/40">
                        <p>No products found in this category.</p>
                    </div>
                )}
            </div>

            {/* MODAL */}
            <ProductModal
                product={displayedProduct}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

        </div>
    );
};
