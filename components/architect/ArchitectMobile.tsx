import React, { useState, useMemo, useEffect } from 'react';
import { products, Product, getRemoteProducts } from '../../src/data/products';
import { CATEGORIES } from '../../src/data/categories';
import { ArrowLeft, X, ChevronRight, Grid, Maximize2, Plus, ListChecks, Download, Trash2, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../../src/utils/analytics';
import { motion, AnimatePresence } from 'framer-motion';

export const ArchitectMobile: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [specList, setSpecList] = useState<string[]>([]);
    const [isSpecManagerOpen, setIsSpecManagerOpen] = useState(false);
    const [liveProducts, setLiveProducts] = useState<Product[]>(products);

    useEffect(() => {
        getRemoteProducts().then(setLiveProducts);
    }, []);

    // No shuffling for Architect Studio - use fixed order
    const sessionProducts = liveProducts;

    const activeCatDef = useMemo(() => CATEGORIES.find(c => c.id === activeCategory), [activeCategory]);
    const filteredProducts = useMemo(() => {
        const prods = activeCatDef ? sessionProducts.filter(activeCatDef.filter) : [];
        // Sort by ID (usually has numbers or alphabetical prefix)
        return prods.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' }));
    }, [activeCatDef, sessionProducts]);

    const toggleSpec = (id: string) => {
        setSpecList(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
        trackEvent('architect_spec_toggled', { productId: id, action: specList.includes(id) ? 'removed' : 'added' });
    };

    const specProducts = useMemo(() =>
        products.filter(p => specList.includes(p.id)),
        [specList]
    );

    const handleWhatsAppExport = () => {
        const WHATSAPP_NUMBER = "919429004803";
        const shortlistText = specProducts.map(p => `• ${p.title} (ID: ${p.id})`).join('\n');
        const message = `Hi Woodflex Designs, I'm an architect and I've shortlisted these items for my project (Mobile):\n\n${shortlistText}\n\nPlease provide technical specs and pricing.`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank");
    };

    if (!activeCategory) {
        return (
            <div className="min-h-screen bg-white">
                <header className="p-8 pb-4">
                    <Link to="/" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-8">
                        <ArrowLeft size={14} /> Lobby
                    </Link>
                    <h1 className="font-serif text-4xl mb-2 text-gray-900 leading-tight">Architect Studio</h1>
                    <p className="text-gray-400 text-sm font-light">Select a collection to explore specs.</p>
                </header>

                <div className="px-6 py-6 space-y-4">
                    {CATEGORIES.map((cat) => {
                        const firstProd = products.find(cat.filter);
                        return (
                            <motion.div
                                key={cat.id}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                    setActiveCategory(cat.id);
                                    trackEvent('architect_category_selected', { category: cat.id, label: cat.label });
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="relative h-64 rounded-3xl overflow-hidden shadow-lg border border-gray-100"
                            >
                                <img src={firstProd?.imagePath} className="absolute inset-0 w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                    <p className="text-white/60 text-[9px] uppercase tracking-[0.3em] mb-1">{cat.sublabel}</p>
                                    <h3 className="text-white font-serif text-2xl">{cat.label}</h3>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8F9FA] pb-24">
            <header className="bg-white px-8 pt-12 pb-8 sticky top-0 z-30 border-b border-gray-100">
                <button onClick={() => setActiveCategory(null)} className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-6">
                    <ArrowLeft size={14} /> Back to Collections
                </button>
                <div className="flex items-center justify-between gap-4">
                    <h2 className="font-serif text-3xl text-gray-900">{activeCatDef?.label}</h2>
                    <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white shrink-0">
                        <Grid size={18} />
                    </div>
                </div>
            </header>

            <div className="p-6 grid grid-cols-1 gap-6">
                {filteredProducts.map((product) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        onClick={() => {
                            setSelectedProduct(product);
                            trackEvent('architect_product_opened', { category: activeCategory, productId: product.id, title: product.title });
                        }}
                        className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 p-8"
                    >
                        <div className="aspect-square bg-gray-50 rounded-2xl mb-8 flex items-center justify-center p-8">
                            <img src={product.imagePath} className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[9px] font-mono tracking-widest text-gray-400 mb-1 uppercase">{product.id}</p>
                                <h4 className="text-xl font-serif text-gray-900">{product.title}</h4>
                            </div>
                            <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center group-active:scale-95 transition-transform">
                                <Maximize2 size={18} className="text-gray-400" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* FULL SCREEN MOBILE SPEC VIEW */}
            <AnimatePresence>
                {selectedProduct && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[100] bg-white overflow-y-auto pb-12"
                    >
                        <header className="p-8 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-gray-100">
                            <button onClick={() => setSelectedProduct(null)} className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-900 font-bold">
                                <ArrowLeft size={16} /> Close Specifications
                            </button>
                        </header>

                        <div className="p-8">
                            <div className="aspect-square bg-[#F5F5F5] rounded-3xl flex items-center justify-center p-12 mb-10 overflow-hidden shadow-inner">
                                <motion.img
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    src={selectedProduct.imagePath}
                                    className="w-full h-full object-contain drop-shadow-2xl"
                                />
                            </div>

                            <h1 className="font-serif text-4xl text-gray-900 mb-2">{selectedProduct.title}</h1>
                            <p className="text-gray-400 text-sm font-mono tracking-widest uppercase mb-12 border-b border-gray-100 pb-8">{selectedProduct.id}</p>

                            <div className="mb-12">
                                <h3 className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-900 mb-6 flex items-center gap-3">
                                    Technical Blueprint <div className="h-px flex-grow bg-gray-100" />
                                </h3>
                                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 flex items-center justify-center min-h-[300px]">
                                    {selectedProduct.technicalDrawing ? (
                                        <img src={selectedProduct.technicalDrawing} className="max-w-full h-auto mix-blend-multiply opacity-80" />
                                    ) : (
                                        <p className="text-gray-300 italic font-serif text-center">Documentation in progress. Custom drawings available.</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 mt-8">
                                <button
                                    onClick={() => toggleSpec(selectedProduct.id)}
                                    className={`flex items-center justify-center gap-3 py-6 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all ${specList.includes(selectedProduct.id)
                                        ? 'bg-red-50 text-red-500 border border-red-100'
                                        : 'bg-gray-900 text-white shadow-xl'
                                        }`}
                                >
                                    {specList.includes(selectedProduct.id) ? <Trash2 size={18} /> : <Plus size={18} />}
                                    {specList.includes(selectedProduct.id) ? 'Remove from Project' : 'Add to Project Specs'}
                                </button>

                                {selectedProduct.technicalDrawing && (
                                    <a
                                        href={selectedProduct.technicalDrawing}
                                        download={`${selectedProduct.id}_drawing.png`}
                                        className="flex items-center justify-center gap-3 py-6 bg-gray-100 text-gray-900 rounded-2xl font-bold uppercase tracking-widest text-xs"
                                    >
                                        <Download size={18} /> Download Drawing
                                    </a>
                                )}
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FLOATING ACTION BUTTON */}
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={() => setIsSpecManagerOpen(true)}
                className="fixed bottom-8 right-8 w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-2xl z-40"
            >
                <ListChecks size={24} />
                {specList.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white">
                        {specList.length}
                    </span>
                )}
            </motion.button>

            {/* MOBILE SPEC MANAGER */}
            <AnimatePresence>
                {isSpecManagerOpen && (
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[150] bg-white flex flex-col"
                    >
                        <header className="p-8 flex justify-between items-center bg-white border-b border-gray-100">
                            <div>
                                <h2 className="font-serif text-2xl text-gray-900">Project Spec List</h2>
                                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{specList.length} Items Selected</p>
                            </div>
                            <button onClick={() => setIsSpecManagerOpen(false)} className="p-3 bg-gray-50 rounded-full">
                                <X size={24} />
                            </button>
                        </header>

                        <div className="flex-grow overflow-y-auto p-8 space-y-4">
                            {specProducts.length > 0 ? (
                                specProducts.map(p => (
                                    <div key={p.id} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 flex-wrap">
                                        <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center p-2 border border-gray-100 shrink-0">
                                            <img src={p.imagePath} className="w-full h-full object-contain mix-blend-multiply" />
                                        </div>
                                        <div className="flex-grow min-w-[150px]">
                                            <p className="text-[9px] font-mono text-gray-400 uppercase tracking-widest mb-1">{p.id}</p>
                                            <h4 className="font-serif text-base text-gray-900 mb-1">{p.title}</h4>
                                            <p className="text-[9px] uppercase font-bold text-gray-500 tracking-wider">
                                                {p.category.replace('_', ' ')}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => toggleSpec(p.id)}
                                            className="p-2 text-gray-300 hover:text-red-500 rounded-lg ml-auto"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                                    <ListChecks size={48} className="mb-4" />
                                    <p className="font-serif text-lg italic">No items shortlisted yet</p>
                                </div>
                            )}
                        </div>

                        <div className="p-8 border-t border-gray-100 space-y-3">
                            <button
                                onClick={handleWhatsAppExport}
                                disabled={specList.length === 0}
                                className="w-full flex items-center justify-center gap-3 py-5 bg-[#25D366] text-white rounded-2xl font-bold uppercase tracking-widest text-xs active:scale-95 disabled:opacity-50"
                            >
                                <Send size={18} /> WhatsApp Shortlist
                            </button>
                            <button
                                onClick={() => setIsSpecManagerOpen(false)}
                                className="w-full py-5 text-[10px] uppercase font-bold tracking-widest text-gray-400"
                            >
                                Back to Library
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
