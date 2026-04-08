import React from 'react';
import { products, Product, RoomCategory, CATEGORY_LABELS } from '../../src/data/products';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, X, Send, Plus, MessageSquare, Sparkles, Ruler } from 'lucide-react';
import { CategorySwiper } from '../CategorySwiper';
import { motion, AnimatePresence } from 'framer-motion';
import { useHouseOwnerLogic } from './useHouseOwnerLogic';

export const HouseOwnerMobile: React.FC = () => {
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
            <div className="min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-center p-6 text-center">
                <Link to="/" className="absolute top-8 left-8 text-white/40 hover:text-white flex items-center gap-2 text-xs uppercase tracking-widest transition-colors">
                    <ArrowLeft size={14} /> Back
                </Link>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl w-full">
                    <h1 className="font-serif text-4xl text-white mb-6">
                        What space are you choosing furniture for?
                    </h1>
                    <p className="text-white/40 mb-12 uppercase tracking-[0.2em] text-[10px]">Step 1 of 3: Select Room</p>

                    <div className="grid grid-cols-1 gap-4">
                        <button
                            onClick={() => setRoomType('living')}
                            className="group relative overflow-hidden aspect-[16/9] bg-[#2d2a26] rounded-3xl p-8 flex flex-col items-center justify-center border border-white/5"
                        >
                            <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover opacity-20" />
                            <h3 className="relative text-white font-serif text-2xl mb-1">Living Room</h3>
                            <p className="relative text-white/40 text-[9px] uppercase tracking-widest">Sofas, Chairs, Tables</p>
                        </button>

                        <button
                            onClick={() => setRoomType('dining')}
                            className="group relative overflow-hidden aspect-[16/9] bg-[#2d2a26] rounded-3xl p-8 flex flex-col items-center justify-center border border-white/5"
                        >
                            <img src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover opacity-20" />
                            <h3 className="relative text-white font-serif text-2xl mb-1">Dining Area</h3>
                            <p className="relative text-white/40 text-[9px] uppercase tracking-widest">Tables & Chairs</p>
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    // 2. Final Shortlist Screen
    if (showShortlist) {
        return (
            <div className="min-h-screen bg-[#F8F9FA] flex flex-col px-6 py-12 pb-32">
                <header className="mb-12 no-print">
                    <p className="text-[#2d2a26]/40 uppercase tracking-[0.2em] text-[9px] font-black mb-2">Curated Collection</p>
                    <h1 className="font-serif text-4xl text-[#1A1A1A]">Your Selection</h1>
                    <div className="flex gap-2 mt-6">
                        <button onClick={handleDownloadTxt} className="flex-grow py-4 bg-white border border-gray-200 text-[#1A1A1A] rounded-2xl text-[9px] font-bold uppercase tracking-widest">
                            Save .TXT
                        </button>
                        <button onClick={handlePrint} className="flex-grow py-4 bg-[#1A1A1A] text-white rounded-2xl text-[9px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                            <MessageSquare size={12} /> Save PDF
                        </button>
                    </div>
                </header>

                <div className="space-y-16">
                    {flow.map(cat => {
                        const ids = likedByCategory[cat];
                        if (!ids || ids.length === 0) return null;

                        return (
                            <section key={cat}>
                                <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-900 mb-6 border-b border-gray-100 pb-3 flex justify-between">
                                    {CATEGORY_LABELS[cat] || cat.replace('_', ' ')}
                                    <span className="text-gray-300 font-mono font-normal">({ids.length})</span>
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {ids.map(id => {
                                        const p = shuffledProducts.find(prod => prod.id === id);
                                        if (!p) return null;
                                        return (
                                            <div key={id} className="relative">
                                                <div className="aspect-[4/5] bg-white rounded-2xl overflow-hidden border border-gray-100 p-4 mb-2 flex items-center justify-center shadow-sm">
                                                    <img src={p.imagePath} className="max-w-full h-auto" />
                                                </div>
                                                <h4 className="font-serif text-xs text-gray-900 truncate">{p.title}</h4>
                                                <p className="text-[8px] text-gray-400 font-mono tracking-widest uppercase">{p.id}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        );
                    })}
                </div>

                {/* Final CTA Mobile: Sticky Bottom Float */}
                <div className="fixed bottom-0 left-0 right-0 p-6 z-50 bg-gradient-to-t from-[#F8F9FA] via-[#F8F9FA] to-transparent no-print">
                    <button
                        onClick={() => setIsLeadModalOpen(true)}
                        className="w-full py-5 bg-[#1A1A1A] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl flex items-center justify-center gap-3 active:scale-95 transition-all"
                    >
                        <Send size={14} /> Get Quotes on WhatsApp
                    </button>
                </div>

                {/* Lead Modal Mobile (Bottom Sheet Style) */}
                <AnimatePresence>
                    {isLeadModalOpen && (
                        <div className="fixed inset-0 z-[100] flex items-end">
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsLeadModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="relative w-full bg-white rounded-t-[2.5rem] p-10 pt-6 shadow-2xl">
                                <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-8" />
                                <h3 className="font-serif text-3xl mb-2">Final Details</h3>
                                <p className="text-gray-400 mb-8 text-xs leading-relaxed">Where should we send your curated catalog?</p>
                                <div className="space-y-3 mb-10">
                                    <input required type="text" placeholder="Full Name" className="w-full px-6 py-5 bg-gray-50 rounded-2xl border border-gray-100 outline-none text-sm placeholder:text-gray-400" value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
                                    <input required type="text" placeholder="City" className="w-full px-6 py-5 bg-gray-50 rounded-2xl border border-gray-100 outline-none text-sm placeholder:text-gray-400" value={userData.city} onChange={(e) => setUserData({ ...userData, city: e.target.value })} />
                                    <input required type="tel" placeholder="WhatsApp Number" className="w-full px-6 py-5 bg-gray-50 rounded-2xl border border-gray-100 outline-none text-sm placeholder:text-gray-400" value={userData.contact} onChange={(e) => setUserData({ ...userData, contact: e.target.value })} />
                                </div>
                                <button
                                    onClick={handleWhatsAppShortlist}
                                    disabled={isSaving}
                                    className={`w-full py-6 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-4 transition-all ${isSaving ? 'opacity-70' : ''}`}
                                >
                                    {isSaving ? 'Processing...' : 'Send WhatsApp Message'} {!isSaving && <Send size={16} />}
                                </button>
                                <div className="h-4" /> {/* Padding for bottom safe area */}
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    // 3. Swiper Flow Mobile
    return (
        <div className="h-screen bg-[#1a1a1a] flex flex-col items-center justify-center p-4 overflow-hidden relative">
            <button onClick={() => setRoomType(null)} className="absolute top-8 left-8 text-white/40 flex items-center gap-2 text-[10px] uppercase tracking-widest z-50">
                <ArrowLeft size={14} /> Reset
            </button>


            <div className="w-full max-w-sm mb-12">
                <CategorySwiper
                    key={currentCategory}
                    roomType={roomType}
                    category={currentCategory}
                    products={shuffledProducts}
                    onCategoryDone={handleCategoryDone}
                />
            </div>

            {/* Global Progress Mobile */}
            <div className="absolute bottom-12 flex gap-1.5">
                {flow.map((_, idx) => (
                    <div key={idx} className={`h-1 w-6 rounded-full transition-all duration-500 ${idx === categoryIndex ? 'bg-white w-10' : idx < categoryIndex ? 'bg-white/40' : 'bg-white/10'}`} />
                ))}
            </div>

            <style>{`
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
            `}</style>
        </div>
    );
};
