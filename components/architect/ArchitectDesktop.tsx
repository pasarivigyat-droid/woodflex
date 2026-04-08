import React, { useState, useMemo, useEffect } from 'react';
import { products, Product, getRemoteProducts } from '../../src/data/products';
import { CATEGORIES } from '../../src/data/categories';
import { ArrowLeft, X, ChevronRight, Grid, Maximize2, Search, Plus, ListChecks, Download, Trash2, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../../src/utils/analytics';
import { motion, AnimatePresence } from 'framer-motion';
import { useImagePreload } from '../../src/hooks/useImagePreload';
import { LazyImage } from '../LazyImage';

export const ArchitectDesktop: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0].id);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [expandedImage, setExpandedImage] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
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
        let prods = activeCatDef ? sessionProducts.filter(activeCatDef.filter) : [];
        if (searchQuery) {
            prods = prods.filter(p =>
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.id.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        return prods.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' }));
    }, [activeCatDef, searchQuery, sessionProducts]);

    // PRELOAD: Preload first 20 images of the active category to reduce lag
    const topImages = useMemo(() =>
        filteredProducts.slice(0, 20).map(p => p.imagePath),
        [filteredProducts]
    );
    useImagePreload(topImages);

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
        const message = `Hi Woodflex Designs, I'm an architect and I've shortlisted these items for my project:\n\n${shortlistText}\n\nPlease provide technical specs and pricing for these.`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank");
        trackEvent('architect_whatsapp_export', { count: specList.length });
    };

    const handlePrintSummary = () => {
        trackEvent('architect_print_summary', { count: specList.length });
        window.print();
    };

    return (
        <div className="h-screen bg-[#F8F9FA] flex overflow-hidden font-sans">
            {/* LEFT SIDEBAR: THE CONTROL PANEL */}
            <aside className="w-[35rem] bg-white border-r border-gray-200 flex flex-col z-20 shadow-xl">
                <div className="p-8">
                    <Link to="/" className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-all mb-12 group">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Lobby
                    </Link>

                    <h1 className="font-serif text-3xl mb-2 text-gray-900">Architect Studio</h1>
                </div>

                <nav className="flex-grow overflow-y-auto px-4 space-y-1 py-4 custom-scrollbar">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => {
                                setActiveCategory(cat.id);
                                trackEvent('architect_category_selected', { category: cat.id, label: cat.label });
                            }}
                            className={`w-full flex items-center justify-between px-10 py-8 rounded-2xl text-left transition-all group ${activeCategory === cat.id
                                ? 'bg-[#1A1A1A] text-white shadow-2xl translate-x-2'
                                : 'text-gray-500 hover:bg-gray-50 hover:translate-x-1'
                                }`}
                        >
                            <div className="flex flex-col">
                                <span className={`text-[9px] uppercase tracking-widest mb-1 ${activeCategory === cat.id ? 'text-white/40' : 'text-gray-400'}`}>
                                    {cat.sublabel}
                                </span>
                                <span className="font-bold text-sm uppercase tracking-wider">{cat.label}</span>
                            </div>
                            <ChevronRight size={16} className={`transition-transform ${activeCategory === cat.id ? 'translate-x-0' : '-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                        </button>
                    ))}
                </nav>

            </aside>

            {/* MAIN AREA: THE CANVAS */}
            <main className="flex-grow flex flex-col relative overflow-hidden bg-white">
                {/* Top Banner with Search */}
                <header className="h-24 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-12 z-10 sticky top-0">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white">
                            <Grid size={18} />
                        </div>
                        <div>
                            <h2 className="text-xl font-serif text-gray-900">{activeCatDef?.label} Library</h2>
                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{filteredProducts.length} Assets Loaded</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative w-80 group">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-black" />
                            <input
                                type="text"
                                placeholder="Filter by Name or ID..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-100 rounded-full py-3 pl-12 pr-6 text-xs focus:bg-white focus:border-black transition-all outline-none"
                            />
                        </div>

                        <button
                            onClick={() => setIsSpecManagerOpen(true)}
                            className="flex items-center gap-3 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-black transition-all shadow-lg active:scale-95 relative"
                        >
                            <ListChecks size={18} />
                            <span className="text-[10px] uppercase font-bold tracking-widest">Project Specs</span>
                            {specList.length > 0 && (
                                <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white animate-in zoom-in">
                                    {specList.length}
                                </span>
                            )}
                        </button>
                    </div>
                </header>

                {/* Product Grid */}
                <div className="flex-grow overflow-y-auto p-12 custom-scrollbar">
                    <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
                        {filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                layoutId={product.id}
                                onClick={() => {
                                    setSelectedProduct(product);
                                    trackEvent('architect_product_opened', { category: activeCategory, productId: product.id, title: product.title });
                                }}
                                className="group relative cursor-pointer"
                            >
                                <div className="aspect-[4/5] w-full bg-[#F9FAFB] rounded-3xl overflow-hidden border border-gray-100 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 group-hover:border-black/5">
                                    <LazyImage
                                        src={product.imagePath}
                                        alt={product.title}
                                        className="transition-transform duration-700 group-hover:scale-110"
                                    />

                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="bg-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform">
                                            View Specifications
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <p className="text-[9px] font-mono tracking-widest text-gray-400 mb-1 uppercase">{product.id}</p>
                                    <h4 className="text-base font-serif text-gray-900 group-hover:underline underline-offset-4 decoration-1">{product.title}</h4>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="h-96 flex flex-col items-center justify-center text-gray-300">
                            <Search size={64} className="mb-6 opacity-20" />
                            <p className="font-serif text-xl italic text-gray-400">No assets found matching your filter</p>
                        </div>
                    )}
                </div>

                {/* Footer Status */}
                <footer className="h-10 bg-gray-50 border-t border-gray-100 px-8 flex items-center justify-between text-[10px] font-mono text-gray-400 tracking-widest uppercase">
                    <span>Precision Engine v2.0.4</span>
                    <span>© Woodflex Designs India</span>
                </footer>
            </main>

            {/* PRODUCT SPEC OVERLAY */}
            <AnimatePresence>
                {selectedProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-20"
                    >
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setSelectedProduct(null)} />

                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative w-full max-w-7xl h-full bg-white rounded-3xl overflow-hidden shadow-2xl flex border border-white/10"
                        >
                            {/* Close Button */}
                            <button onClick={() => setSelectedProduct(null)} className="absolute top-8 right-8 z-50 p-3 bg-gray-50 hover:bg-gray-100 rounded-full transition-all">
                                <X size={24} />
                            </button>

                            {/* LEFT: HERO PREVIEW */}
                            <div className="w-1/2 h-full bg-[#F5F5F5] p-16 flex flex-col">
                                <div className="flex-grow flex items-center justify-center relative group cursor-zoom-in" onClick={() => setExpandedImage(selectedProduct.imagePath)}>
                                    <LazyImage
                                        src={selectedProduct.imagePath}
                                        alt={selectedProduct.title}
                                        aspectRatio="h-full w-full"
                                        className="drop-shadow-2xl transition-transform group-hover:scale-105"
                                    />
                                    <div className="absolute top-0 right-0 p-4 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><Maximize2 size={24} /></div>
                                </div>
                                <div className="mt-12 pt-12 border-t border-gray-200">
                                    <h3 className="font-serif text-5xl text-gray-900 mb-4">{selectedProduct.title}</h3>
                                    <div className="flex gap-12">
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Product ID</p>
                                            <p className="font-mono text-sm">{selectedProduct.id}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Category</p>
                                            <p className="font-mono text-sm capitalize">{selectedProduct.category.toLowerCase().replace('_', ' ')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT: TECHNICAL ANALYSIS */}
                            <div className="w-1/2 h-full bg-white border-l border-gray-100 p-16 flex flex-col">
                                <div className="flex-grow bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden cursor-zoom-in group border border-gray-100 relative" onClick={() => selectedProduct.technicalDrawing && setExpandedImage(selectedProduct.technicalDrawing)}>
                                    {selectedProduct.technicalDrawing ? (
                                        <img src={selectedProduct.technicalDrawing} className="max-w-[80%] max-h-[80%] object-contain mix-blend-multiply opacity-80 group-hover:scale-105 transition-transform" />
                                    ) : (
                                        <div className="text-gray-300 italic font-serif text-lg text-center p-12">Detailed blueprint pending release. We can provide custom drawings on request.</div>
                                    )}
                                    {selectedProduct.technicalDrawing && <div className="absolute top-4 right-4 p-4 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><Maximize2 size={24} /></div>}
                                </div>

                                <div className="mt-12 grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => toggleSpec(selectedProduct.id)}
                                        className={`flex items-center justify-center gap-3 py-5 rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all ${specList.includes(selectedProduct.id)
                                            ? 'bg-red-50 text-red-500 border border-red-100'
                                            : 'bg-gray-900 text-white hover:bg-black shadow-xl active:scale-95'
                                            }`}
                                    >
                                        {specList.includes(selectedProduct.id) ? <Trash2 size={16} /> : <Plus size={16} />}
                                        {specList.includes(selectedProduct.id) ? 'Remove from Project' : 'Add to Project Specs'}
                                    </button>

                                    {selectedProduct.technicalDrawing && (
                                        <a
                                            href={selectedProduct.technicalDrawing}
                                            download={`${selectedProduct.id}_drawing.png`}
                                            className="flex items-center justify-center gap-3 py-5 bg-gray-100 text-gray-900 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-gray-200 transition-all active:scale-95"
                                        >
                                            <Download size={16} /> Download Drawing
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* LIGHTBOX FOR ZOOM */}
            <AnimatePresence>
                {expandedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setExpandedImage(null)}
                        className="fixed inset-0 z-[200] bg-white flex items-center justify-center p-20 cursor-zoom-out"
                    >
                        <img src={expandedImage} className="max-w-full max-h-full object-contain drop-shadow-2xl" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* SPEC MANAGER DRAWER */}
            <AnimatePresence>
                {isSpecManagerOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSpecManagerOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-screen w-[40rem] bg-white z-[160] shadow-[-20px_0_50px_rgba(0,0,0,0.1)] flex flex-col"
                        >
                            <div className="p-12 border-b border-gray-100 flex items-center justify-between">
                                <div>
                                    <h2 className="font-serif text-3xl text-gray-900 mb-1">Project Spec List</h2>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{specList.length} Items Selected</p>
                                </div>
                                <button onClick={() => setIsSpecManagerOpen(false)} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-full transition-all">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex-grow overflow-y-auto p-12 custom-scrollbar">
                                {specProducts.length > 0 ? (
                                    <div className="space-y-6">
                                        {specProducts.map(p => (
                                            <div key={p.id} className="flex gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100 group relative">
                                                <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center p-3 border border-gray-100">
                                                    <img src={p.imagePath} className="w-full h-full object-contain mix-blend-multiply" />
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">{p.id}</p>
                                                    <h4 className="font-serif text-lg text-gray-900 mb-2">{p.title}</h4>
                                                    <p className="text-[10px] uppercase font-bold text-gray-600 tracking-wider bg-white px-3 py-1 inline-block rounded-full border border-gray-100">
                                                        {p.category.replace('_', ' ')}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => toggleSpec(p.id)}
                                                    className="absolute top-6 right-6 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                                        <ListChecks size={64} className="mb-6" />
                                        <p className="font-serif text-xl italic mb-2">Your project list is empty</p>
                                        <p className="text-sm max-w-[250px]">Add designs from the library to build your project specifications.</p>
                                    </div>
                                )}
                            </div>

                            <div className="p-12 border-t border-gray-100 bg-gray-50">
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        disabled={specList.length === 0}
                                        onClick={handlePrintSummary}
                                        className="flex items-center justify-center gap-3 py-5 bg-white border border-gray-200 text-gray-900 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-gray-100 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Download size={18} /> Export as PDF
                                    </button>
                                    <button
                                        disabled={specList.length === 0}
                                        onClick={handleWhatsAppExport}
                                        className="flex items-center justify-center gap-3 py-5 bg-[#25D366] text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-[#128C7E] transition-all shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Send size={18} /> WhatsApp Quote
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* HIDDEN PRINT-ONLY SPECIFICATION CATALOG */}
            <div className="hidden print:block fixed inset-0 bg-white z-[9999] overflow-y-auto p-12">
                <div className="max-w-4xl mx-auto">
                    {/* Catalog Header */}
                    <div className="flex justify-between items-start border-b-2 border-black pb-8 mb-12">
                        <div>
                            <h1 className="font-serif text-5xl uppercase tracking-tighter mb-2">WOODFLEX DESIGNS</h1>
                            <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-gray-500">Project Specification Catalog · v2.1</p>
                        </div>
                        <div className="text-right font-mono text-xs">
                            <p>Date: {new Date().toLocaleDateString()}</p>
                            <p>Items: {specProducts.length}</p>
                        </div>
                    </div>

                    {/* Items List */}
                    <div className="space-y-20">
                        {specProducts.map((p, idx) => (
                            <div key={p.id} className="page-break-after-always">
                                <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
                                    <span className="bg-black text-white px-2 py-1 text-[10px] font-bold">ITEM {idx + 1}</span>
                                    <h2 className="font-serif text-3xl">{p.title}</h2>
                                    <span className="ml-auto font-mono text-sm text-gray-400">{p.id}</span>
                                </div>

                                <div className="grid grid-cols-2 gap-12 items-start">
                                    {/* Visual Representation */}
                                    <div className="bg-gray-50 rounded-2xl p-8 aspect-square flex items-center justify-center overflow-hidden border border-gray-100">
                                        <img src={p.imagePath} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                                    </div>

                                    {/* Technical Drawing & Details */}
                                    <div className="space-y-8">
                                        {p.technicalDrawing ? (
                                            <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
                                                <p className="text-[9px] uppercase tracking-widest font-black text-gray-400 mb-3">Technical Blueprint</p>
                                                <img src={p.technicalDrawing} className="max-h-60 mx-auto object-contain mix-blend-multiply" />
                                            </div>
                                        ) : (
                                            <div className="h-40 bg-gray-50 rounded-xl border border-dashed border-gray-200 flex items-center justify-center text-[10px] uppercase text-gray-400 font-bold tracking-widest">
                                                Technical Drawing Pending
                                            </div>
                                        )}

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-4 bg-gray-50 rounded-xl">
                                                <p className="text-[8px] uppercase tracking-widest font-black text-gray-400 mb-1">Collection</p>
                                                <p className="text-xs font-bold capitalize">{p.category.replace('_', ' ')}</p>
                                            </div>
                                            <div className="p-4 bg-gray-50 rounded-xl">
                                                <p className="text-[8px] uppercase tracking-widest font-black text-gray-400 mb-1">Style</p>
                                                <p className="text-xs font-bold">{p.style || "Premium Minimal"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-20 pt-12 border-t border-gray-100 text-center">
                        <p className="font-serif italic text-lg text-gray-400">© Woodflex Designs · Furniture Manufacturing · Surat, India</p>
                    </div>
                </div>
            </div>

            <style>{`
                @media print {
                    @page { margin: 2cm; size: A4; }
                    .page-break-after-always { page-break-after: always; }
                    body { background: white !important; }
                    .no-print { display: none !important; }
                }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #EEE; border-radius: 10px; }
            `}</style>
        </div>
    );
};
