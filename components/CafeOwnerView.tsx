import React, { useState } from 'react';
import { products } from '../src/data/products';
import { Link } from 'react-router-dom';
import { ArrowLeft, Coffee, Gem, UtensilsCrossed } from 'lucide-react';

type Vibe = 'luxury' | 'rustic' | 'minimalist';

export const CafeOwnerView: React.FC = () => {
    const [activeVibe, setActiveVibe] = useState<Vibe>('luxury');

    // Filter products based on Vibe
    // Logic: 
    // Luxury -> Jewelry Chairs, sleek Dining Tables
    // Rustic -> WFC Chairs, wooden tables
    // Minimalist -> Selection of simple items
    const vibeProducts = products.filter(p => {
        if (activeVibe === 'luxury') return p.category.includes('Jewelry') || p.title.includes('Jewelry') || p.id.includes('JC');
        if (activeVibe === 'rustic') return p.category.includes('Chairs') && !p.title.includes('Jewelry');
        if (activeVibe === 'minimalist') return p.category.includes('Side Tables'); // Just for demo differentiation
        return false;
    });

    // Backgrounds for vibes (Unsplash Placeholders)
    const vibeBackgrounds = {
        luxury: 'https://images.unsplash.com/photo-1596196230492-f2f5344d5670?auto=format&fit=crop&q=80&w=2000', // High end store/interior
        rustic: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=2000', // Wooden cafe
        minimalist: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?auto=format&fit=crop&q=80&w=2000' // Clean space
    };

    return (
        <div className="min-h-screen w-full relative bg-[#1a1a1a] text-white font-sans overflow-x-hidden transition-all duration-700">

            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={vibeBackgrounds[activeVibe]}
                    alt={activeVibe}
                    className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-colors duration-700" />
            </div>

            {/* Header */}
            <div className="relative z-10 p-8 flex justify-between items-center border-b border-white/10">
                <Link to="/" className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors">
                    <ArrowLeft size={16} /> Home
                </Link>
                <div className="flex gap-8">
                    {/* Vibe Selectors */}
                    <button
                        onClick={() => setActiveVibe('luxury')}
                        className={`flex items-center gap-2 pb-2 border-b-2 transition-all ${activeVibe === 'luxury' ? 'border-white text-white' : 'border-transparent text-white/40'}`}
                    >
                        <Gem size={16} /> <span className="uppercase tracking-widest text-sm">Luxury Boutique</span>
                    </button>
                    <button
                        onClick={() => setActiveVibe('rustic')}
                        className={`flex items-center gap-2 pb-2 border-b-2 transition-all ${activeVibe === 'rustic' ? 'border-white text-white' : 'border-transparent text-white/40'}`}
                    >
                        <UtensilsCrossed size={16} /> <span className="uppercase tracking-widest text-sm">Rustic / Cafe</span>
                    </button>
                    <button
                        onClick={() => setActiveVibe('minimalist')}
                        className={`flex items-center gap-2 pb-2 border-b-2 transition-all ${activeVibe === 'minimalist' ? 'border-white text-white' : 'border-transparent text-white/40'}`}
                    >
                        <Coffee size={16} /> <span className="uppercase tracking-widest text-sm">Cozy Minimalist</span>
                    </button>
                </div>
            </div>

            {/* Content Stage */}
            <div className="relative z-10 container mx-auto px-6 py-12">
                <div className="text-center mb-16">
                    <h1 className="font-serif text-5xl md:text-6xl mb-4 capitalize animate-fade-in-up">Retail & Café Concepts (Coming Soon)</h1>
                    <p className="text-white/60 max-w-xl mx-auto">
                        We’re building a dedicated view for boutiques, cafés and fine-dining spaces – with pre-curated sets and material options. For now, reach out through the consultation form and we’ll share options directly.
                    </p>
                </div>

                {/* Product Showcase Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {vibeProducts.slice(0, 3).map((product, idx) => ( // Show top 3 matching items
                        <div
                            key={product.id}
                            className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300"
                        >
                            <div className="h-64 p-8 flex items-center justify-center relative">
                                <img
                                    src={product.imagePath}
                                    alt={product.title}
                                    className="max-h-full max-w-full object-contain drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-xs font-bold uppercase tracking-widest bg-white text-black px-2 py-1 rounded-sm">View</span>
                                </div>
                            </div>
                            <div className="p-6 border-t border-white/5">
                                <h3 className="font-serif text-2xl mb-2">{product.title}</h3>
                                <p className="text-white/40 text-sm uppercase tracking-widest">{product.category}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {vibeProducts.length === 0 && (
                    <div className="text-center py-24 text-white/30 border-2 border-dashed border-white/10 rounded-xl">
                        No specific configurations found for this style.
                    </div>
                )}

            </div>

        </div>
    );
};
