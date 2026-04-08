import React, { useState } from 'react';
import { products, Product } from '../src/data/products';
import { Header } from './Header';
import { Footer } from './Footer';

export const ProductCatalog: React.FC = () => {
    const [filter, setFilter] = useState('All');

    // Get unique categories
    const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

    const filteredProducts = filter === 'All'
        ? products
        : products.filter(p => p.category === filter);

    return (
        <div className="min-h-screen bg-[#f5f5f0] text-[#1a1a1a] font-sans pt-24">
            <Header />
            <main className="container mx-auto px-6 py-12">
                <div className="mb-12 text-center">
                    <h1 className="font-serif text-4xl md:text-5xl mb-4">Our Collection</h1>
                    <p className="text-lg text-[#1a1a1a]/60 max-w-2xl mx-auto">
                        Explore our complete library of handcrafted furniture pieces, designed for modern living and workspaces.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex overflow-x-auto gap-4 mb-12 pb-4 justify-center scrollbar-hide">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full text-sm uppercase tracking-widest transition-all whitespace-nowrap ${filter === cat
                                    ? 'bg-[#1a1a1a] text-white'
                                    : 'bg-white border border-[#1a1a1a]/10 hover:border-[#1a1a1a]'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="group bg-white rounded-sm overflow-hidden border border-transparent hover:border-[#1a1a1a]/10 hover:shadow-xl transition-all duration-300">
                            <div className="aspect-square bg-gray-50 relative overflow-hidden flex items-center justify-center p-8">
                                <img
                                    src={product.imagePath}
                                    alt={product.title}
                                    className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6 border-t border-[#1a1a1a]/5">
                                <h3 className="font-serif text-xl mb-1 truncate">{product.title}</h3>
                                <p className="text-xs uppercase tracking-widest text-[#1a1a1a]/50 mb-4">{product.category}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-mono text-[#1a1a1a]/40">{product.id}</span>
                                    {/* Placeholder for price or action if needed */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};
