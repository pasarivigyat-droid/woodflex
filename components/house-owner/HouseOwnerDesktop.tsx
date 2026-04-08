import React from 'react';
import { products, Product, RoomCategory, CATEGORY_LABELS } from '../../src/data/products';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, X, Send, Plus, MessageSquare, Sparkles, Ruler } from 'lucide-react';
import { CategorySwiper } from '../CategorySwiper';
import { motion, AnimatePresence } from 'framer-motion';
import { useHouseOwnerLogic } from './useHouseOwnerLogic';

export const HouseOwnerDesktop: React.FC = () => {
    const {
        roomType, setRoomType,
        categoryIndex,
        likedByCategory,
        showShortlist,
        userData, setUserData,
        isLeadModalOpen, setIsLeadModalOpen,
        isSaving,
        showOnboarding, setShowOnboarding,
        flow, currentCategory,
        handleCategoryDone,
        handleWhatsAppShortlist,
        handleDownloadTxt,
        handlePrint,
        shuffledProducts
    } = useHouseOwnerLogic();

    // --- RENDERERS ---

    // 1. Entry Screen
    if (!roomType) {
        return (
            <div className="h-screen bg-[#1a1a1a] flex overflow-hidden font-sans">
                <div className="w-1/2 p-20 flex flex-col justify-center">
                    <Link to="/" className="text-white/40 hover:text-white flex items-center gap-2 text-xs uppercase tracking-widest transition-colors mb-20 self-start">
                        <ArrowLeft size={14} /> Back to Lobby
                    </Link>

                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="max-w-xl">
                        <h1 className="font-serif text-6xl text-white mb-8 leading-tight">
                            Personalize your space.
                        </h1>
                        <p className="text-white/40 text-xl leading-relaxed font-light mb-12">
                            Select a room to begin your curation. Every choice is recorded to help us build your perfect furniture.
                        </p>
                        <div className="flex gap-4">
                            <div className="px-4 py-2 rounded-full border border-white/10 text-[10px] uppercase tracking-widest text-white/40">Step 1: Choose Room</div>
                            <div className="px-4 py-2 rounded-full border border-white/5 text-[10px] uppercase tracking-widest text-white/10">Step 2: Swipe Picks</div>
                            <div className="px-4 py-2 rounded-full border border-white/5 text-[10px] uppercase tracking-widest text-white/10">Step 3: Review</div>
                        </div>
                    </motion.div>
                </div>

                <div className="w-1/2 grid grid-cols-2 gap-px bg-white/5">
                    <button
                        onClick={() => setRoomType('living')}
                        className="group relative overflow-hidden flex flex-col items-center justify-center p-12 transition-all hover:bg-white/5"
                    >
                        <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-40 transition-opacity" />
                        <div className="relative text-center">
                            <h3 className="text-white font-serif text-4xl mb-4 transform transition-transform group-hover:-translate-y-2">Living Room</h3>
                            <p className="text-white/40 text-xs uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity">Explore Sofas & Tables</p>
                        </div>
                    </button>

                    <button
                        onClick={() => setRoomType('dining')}
                        className="group relative overflow-hidden flex flex-col items-center justify-center p-12 transition-all hover:bg-white/5"
                    >
                        <img src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-40 transition-opacity" />
                        <div className="relative text-center">
                            <h3 className="text-white font-serif text-4xl mb-4 transform transition-transform group-hover:-translate-y-2">Dining Area</h3>
                            <p className="text-white/40 text-xs uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity">Explore Tables & Chairs</p>
                        </div>
                    </button>
                </div>
            </div>
        );
    }

    // 2. Final Shortlist Screen
    if (showShortlist) {
        return (
            <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center p-20">
                <div className="max-w-6xl w-full">
                    <header className="flex justify-between items-end mb-20 no-print">
                        <div>
                            <p className="text-[#2d2a26]/40 uppercase tracking-[0.3em] text-[10px] font-black mb-4">Your Expert Selection</p>
                            <h1 className="font-serif text-6xl text-[#1A1A1A]">Curated Collection</h1>
                        </div>
                        <div className="flex gap-4">
                            <button onClick={handleDownloadTxt} className="px-8 py-4 bg-white border border-gray-200 text-[#1A1A1A] rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:border-black transition-all flex items-center gap-3">
                                <Plus size={16} className="rotate-45" /> Export Selection
                            </button>
                            <button onClick={handlePrint} className="px-8 py-4 bg-[#1A1A1A] text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-3 shadow-xl">
                                <MessageSquare size={16} /> Print Catalogue
                            </button>
                        </div>
                    </header>

                    {/* Print-only Header */}
                    <div className="hidden print:block text-center mb-12 border-b-2 border-black pb-8">
                        <h1 className="font-serif text-4xl text-black mb-2 uppercase tracking-tighter">WOODFLEX DESIGNS</h1>
                        <p className="text-xs uppercase tracking-[0.5em] mb-4">Precision Manufacturing & Joinery</p>
                        <div className="grid grid-cols-2 text-left gap-4 text-sm mt-8 border-t pt-8">
                            <div><strong>Client:</strong> {userData.name || 'Valued Guest'}</div>
                            <div><strong>Date:</strong> {new Date().toLocaleDateString()}</div>
                            <div><strong>Category:</strong> {roomType?.toUpperCase()} Selection</div>
                            <div><strong>Location:</strong> {userData.city || 'India'}</div>
                        </div>
                    </div>

                    <div className="space-y-24">
                        {flow.map(cat => {
                            const ids = likedByCategory[cat];
                            if (!ids || ids.length === 0) return null;

                            return (
                                <section key={cat} className="group">
                                    <div className="flex items-baseline gap-4 mb-10 border-b border-gray-100 pb-6">
                                        <h3 className="text-[11px] uppercase tracking-[0.4em] font-black text-gray-900">
                                            {CATEGORY_LABELS[cat] || cat.replace('_', ' ')}
                                        </h3>
                                        <span className="text-gray-300 text-[10px] font-mono">{ids.length} Selected</span>
                                    </div>
                                    <div className="grid grid-cols-4 gap-8">
                                        {ids.map(id => {
                                            const p = shuffledProducts.find(prod => prod.id === id);
                                            if (!p) return null;
                                            return (
                                                <div key={id} className="group/item">
                                                    <div className="aspect-[4/5] bg-white rounded-3xl overflow-hidden border border-gray-100 group-hover/item:shadow-2xl transition-all p-8 flex items-center justify-center mb-6">
                                                        <img src={p.imagePath} className="max-w-full max-h-full object-contain group-hover/item:scale-110 transition-transform duration-700 mx-auto" />
                                                    </div>
                                                    <p className="text-[9px] text-gray-400 font-mono tracking-widest mb-1 uppercase">{p.id}</p>
                                                    <h4 className="font-serif text-lg text-gray-900 leading-tight">{p.title}</h4>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </section>
                            );
                        })}
                    </div>

                    {/* Final CTA Card Desktop */}
                    <div className="mt-32 p-20 bg-gray-900 rounded-[4rem] text-center text-white relative overflow-hidden shadow-2xl no-print">
                        <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
                            <Sparkles size={200} />
                        </div>
                        <h2 className="font-serif text-5xl mb-6 relative">Let's refine these details.</h2>
                        <p className="text-white/40 text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed relative">
                            Our team is ready to analyze your selection and provide custom wood, polish, and sizing recommendations.
                        </p>
                        <button
                            onClick={() => setIsLeadModalOpen(true)}
                            className="px-16 py-6 bg-white text-gray-900 rounded-full font-black uppercase tracking-[0.2em] text-[10px] hover:scale-110 transition-transform shadow-[0_0_50px_rgba(255,255,255,0.2)] flex items-center gap-4 mx-auto"
                        >
                            <Send size={16} /> Request Professional Quote
                        </button>
                    </div>
                </div>

                {/* Lead Modal Desktop (Glassmorphism) */}
                <AnimatePresence>
                    {isLeadModalOpen && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center">
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsLeadModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
                            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-xl bg-white rounded-[3rem] p-16 shadow-2xl">
                                <h3 className="font-serif text-4xl mb-4">Nearly there.</h3>
                                <p className="text-gray-400 mb-10 text-sm">Fill in your contact details to receive your curated catalog on WhatsApp.</p>
                                <div className="space-y-4 mb-10">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-[9px] uppercase tracking-widest font-black text-gray-400 ml-5">Full Name</label>
                                        <input type="text" placeholder="e.g. Rahul Sharma" className="w-full px-8 py-5 bg-gray-50 rounded-2xl border border-gray-100 focus:bg-white focus:border-black transition-all outline-none text-sm" value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-[9px] uppercase tracking-widest font-black text-gray-400 ml-5">City</label>
                                        <input type="text" placeholder="e.g. Surat" className="w-full px-8 py-5 bg-gray-50 rounded-2xl border border-gray-100 focus:bg-white focus:border-black transition-all outline-none text-sm" value={userData.city} onChange={(e) => setUserData({ ...userData, city: e.target.value })} />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-[9px] uppercase tracking-widest font-black text-gray-400 ml-5">WhatsApp Number</label>
                                        <input type="tel" placeholder="+91" className="w-full px-8 py-5 bg-gray-50 rounded-2xl border border-gray-100 focus:bg-white focus:border-black transition-all outline-none text-sm" value={userData.contact} onChange={(e) => setUserData({ ...userData, contact: e.target.value })} />
                                    </div>
                                </div>
                                <button
                                    onClick={handleWhatsAppShortlist}
                                    disabled={isSaving}
                                    className={`w-full py-6 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-4 transition-all shadow-xl ${isSaving ? 'opacity-70 cursor-wait' : 'hover:scale-[1.02] active:scale-95'}`}
                                >
                                    {isSaving ? 'Synchronizing...' : 'Submit & Connect via WhatsApp'} {!isSaving && <Send size={16} />}
                                </button>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    // 3. Swiper Flow Desktop: SPLIT SCREEN
    return (
        <div className="h-screen bg-[#141414] flex overflow-hidden font-sans relative">
            <button onClick={() => setRoomType(null)} className="absolute top-10 left-10 text-white/40 hover:text-white flex items-center gap-2 text-xs uppercase tracking-widest transition-colors z-[60]">
                <ArrowLeft size={14} /> Change Room
            </button>

            {/* LEFT: MOODBOARD PREVIEW (The "Desktop Premium" Feature) */}
            <div className="w-[45%] h-full bg-[#111] border-r border-white/5 flex flex-col p-16">
                <div className="mt-8">
                    <p className="text-white/20 text-[10px] uppercase tracking-[0.4em] font-black mb-4">Dynamic Moodboard</p>
                    <h2 className="font-serif text-5xl text-white mb-2 capitalize">{roomType} Collection</h2>
                    <p className="text-white/40 text-sm font-light">As you like items, they'll appear here.</p>
                </div>

                <div className="flex-grow my-12 grid grid-cols-2 grid-rows-2 gap-4">
                    {flow.map((cat, idx) => {
                        const likes = likedByCategory[cat];
                        const lastLike = likes && likes.length > 0 ? shuffledProducts.find(p => p.id === likes[likes.length - 1]) : null;

                        return (
                            <div key={cat} className={`rounded-3xl border border-white/5 flex flex-col p-6 transition-all duration-500 overflow-hidden relative ${idx === categoryIndex ? 'bg-white/5 border-white/20 ring-1 ring-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)]' : 'bg-transparent opacity-40'}`}>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-[9px] uppercase tracking-widest font-black text-white/40">{CATEGORY_LABELS[cat] || cat.replace('_', ' ')}</span>
                                    {likes && <span className="bg-white/10 text-white text-[9px] px-2 py-0.5 rounded-full font-mono">{likes.length}</span>}
                                </div>
                                <div className="flex-grow flex items-center justify-center relative">
                                    {lastLike ? (
                                        <motion.img initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} src={lastLike.imagePath} className="max-w-[80%] max-h-[80%] object-contain" />
                                    ) : (
                                        <div className="text-white/10 italic font-serif">Awaiting Choice...</div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex-grow h-px bg-white/10" />
                    <div className="flex gap-3">
                        {flow.map((_, idx) => (
                            <div key={idx} className={`w-3 h-3 rounded-full transition-all duration-500 ${idx === categoryIndex ? 'bg-white scale-125' : idx < categoryIndex ? 'bg-white/50' : 'bg-white/10'}`} />
                        ))}
                    </div>
                </div>
            </div>

            {/* RIGHT: THE INTERACTIVE SWIPER */}
            <div className="w-[55%] h-full flex flex-col items-center justify-center relative p-20">

                <div className="w-full max-w-lg mb-12">
                    <CategorySwiper
                        key={currentCategory}
                        roomType={roomType}
                        category={currentCategory}
                        products={shuffledProducts}
                        onCategoryDone={handleCategoryDone}
                    />
                </div>
            </div>

            <style>{`
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
            `}</style>
        </div>
    );
};
