import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../src/lib/supabase';
import { Send, Sparkles, Lock, X } from 'lucide-react';
import { setLeadId, getLeadId, trackEvent } from '../src/utils/analytics';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '../src/hooks/useIsMobile';

export const LeadWall: React.FC = () => {
    const location = useLocation();
    const isMobile = useIsMobile();
    const [isVisible, setIsVisible] = useState(false);
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [city, setCity] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const forceReset = urlParams.get('reset') === 'true';

        if (forceReset) {
            localStorage.removeItem('woodflex_lead_captured');
            localStorage.removeItem('woodflex_lead_id');
            // Remove the param to avoid loop
            window.history.replaceState({}, '', location.pathname);
        }

        const handleRequestLead = () => {
            if (localStorage.getItem('woodflex_lead_captured') !== 'true') {
                setIsVisible(true);
            }
        };

        window.addEventListener('request-lead', handleRequestLead);

        // Hide if already captured, unless forceReset
        if (localStorage.getItem('woodflex_lead_captured') === 'true' && !forceReset) {
            setIsVisible(false);
        }

        return () => {
            window.removeEventListener('request-lead', handleRequestLead);
        };
    }, [location.pathname]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !contact.trim() || !city.trim()) {
            alert("Please provide ALL 3 details: Name, WhatsApp Number, and City to proceed.");
            return;
        }

        const existingId = getLeadId();
        const detectedPersona = location.pathname.includes('architect') ? 'architect' :
            location.pathname.includes('house-owner') ? 'houseowner' :
                location.pathname.includes('cafe-owner') ? 'retail' : 'unknown';

        const leadRecord: any = {
            full_name: name,
            phone: contact,
            city: city,
            source: 'LeadWall_Entry',
            persona: detectedPersona
        };

        if (existingId) leadRecord.id = existingId;

        setIsSaving(true);
        try {
            const { data, error } = await supabase
                .from('leads')
                .upsert([leadRecord])
                .select();

            if (error) throw error;

            const capturedLead = data?.[0];
            if (capturedLead) {
                setLeadId(capturedLead.id.toString());
                trackEvent("lead_created", {
                    persona: detectedPersona,
                    source: "lead_wall"
                });
                localStorage.setItem('woodflex_lead_captured', 'true');
            }

            setIsVisible(false);
            window.dispatchEvent(new Event('lead-capture-success'));
        } catch (err: any) {
            console.error('Error saving lead:', err);
            alert(`Error: ${err.message || "Connection Error"}`);
        } finally {
            setIsSaving(false);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />

            <AnimatePresence>
                {isMobile ? (
                    /* MOBILE: BOTTOM SHEET */
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[3rem] p-10 pt-6 shadow-2xl flex flex-col"
                    >
                        <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-8" />

                        <div className="flex items-center gap-2 mb-6">
                            <Sparkles size={16} className="text-gray-400" />
                            <span className="text-[10px] uppercase font-black tracking-widest text-gray-400">Entry Required</span>
                        </div>

                        <h2 className="font-serif text-3xl text-gray-900 mb-2 leading-tight">Welcome to Woodflex Designs.</h2>
                        <p className="text-gray-400 text-sm font-light mb-10 leading-relaxed">Enter your details to unlock our premium collections and studio features.</p>

                        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                            <input required type="text" placeholder="Full Name" className="w-full px-6 py-5 bg-gray-50 rounded-2xl border border-gray-100 text-sm outline-none focus:bg-white focus:border-black transition-all" value={name} onChange={(e) => setName(e.target.value)} />
                            <input required type="tel" placeholder="WhatsApp Number" className="w-full px-6 py-5 bg-gray-50 rounded-2xl border border-gray-100 text-sm outline-none focus:bg-white focus:border-black transition-all" value={contact} onChange={(e) => setContact(e.target.value)} />
                            <input required type="text" placeholder="City" className="w-full px-6 py-5 bg-gray-50 rounded-2xl border border-gray-100 text-sm outline-none focus:bg-white focus:border-black transition-all" value={city} onChange={(e) => setCity(e.target.value)} />

                            <button
                                type="submit"
                                disabled={isSaving}
                                className={`w-full py-5 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-4 shadow-xl transition-all active:scale-[0.98] ${isSaving ? 'opacity-70' : ''}`}
                            >
                                {isSaving ? 'Authenticating...' : 'Enter Studio'} {!isSaving && <Send size={16} />}
                            </button>
                        </form>
                    </motion.div>
                ) : (
                    /* DESKTOP: CENTERED MODAL */
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative w-full max-w-xl bg-white rounded-[4rem] p-20 shadow-2xl overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none">
                            <Lock size={150} />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
                                    <Sparkles size={18} className="text-gray-400" />
                                </div>
                                <span className="text-[10px] uppercase font-black tracking-widest text-gray-400">Secure Access</span>
                            </div>

                            <h1 className="font-serif text-5xl text-gray-900 mb-6 leading-tight">Identify yourself to proceed.</h1>
                            <p className="text-gray-400 text-lg font-light mb-12 leading-relaxed">
                                We curate our studio experience for serious collaborators. Please provide your contact details to unlock full specifications.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <input required type="text" placeholder="Full Name" className="w-full px-8 py-5 bg-gray-50 rounded-2xl border border-gray-100 text-sm outline-none focus:bg-white focus:border-black transition-all" value={name} onChange={(e) => setName(e.target.value)} />
                                    <input required type="tel" placeholder="WhatsApp Number" className="w-full px-8 py-5 bg-gray-50 rounded-2xl border border-gray-100 text-sm outline-none focus:bg-white focus:border-black transition-all" value={contact} onChange={(e) => setContact(e.target.value)} />
                                </div>
                                <input required type="text" placeholder="City" className="w-full px-8 py-5 bg-gray-50 rounded-2xl border border-gray-100 text-sm outline-none focus:bg-white focus:border-black transition-all" value={city} onChange={(e) => setCity(e.target.value)} />

                                <div className="pt-8">
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className={`w-full py-6 bg-black text-white rounded-full font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-6 shadow-2xl hover:scale-[1.02] transition-all active:scale-[0.98] ${isSaving ? 'opacity-70 cursor-wait' : ''}`}
                                    >
                                        {isSaving ? 'Synchronizing...' : 'Unlock Collection'} {!isSaving && <Send size={18} />}
                                    </button>
                                </div>

                                <p className="text-center text-[8px] uppercase tracking-widest text-gray-300 mt-10">
                                    Privately managed by Woodflex Designs Data Engine
                                </p>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
