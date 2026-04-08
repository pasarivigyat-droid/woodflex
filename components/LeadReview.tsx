import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../src/lib/supabase';
import { products, RoomCategory } from '../src/data/products';
import { ArrowLeft, Loader2, Mail, Phone, MapPin } from 'lucide-react';

export const LeadReview: React.FC = () => {
    const { id } = useParams();
    const [lead, setLead] = useState<any>(null);
    const [interactions, setInteractions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeadData = async () => {
            // Remove any accidental brackets if user copied them literally
            const cleanId = id?.replace(/[\[\]]/g, '');

            const [leadRes, interRes] = await Promise.all([
                supabase.from('leads').select('*').eq('id', cleanId).single(),
                supabase.from('interactions').select('*').eq('lead_id', cleanId).order('created_at', { ascending: true })
            ]);

            if (leadRes.data) setLead(leadRes.data);
            if (interRes.data) setInteractions(interRes.data);
            setLoading(false);
        };
        fetchLeadData();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-400">
            <Loader2 className="animate-spin" size={40} />
        </div>
    );

    if (!lead) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
            <h1 className="text-2xl font-serif mb-4 text-gray-800">Lead Not Found</h1>
            <p className="text-gray-500 mb-8">The ID might be incorrect or the lead was deleted.</p>
            <Link to="/" className="px-6 py-3 bg-black text-white rounded-xl text-sm uppercase tracking-widest font-bold">Back to Lobby</Link>
        </div>
    );

    const shortlist = lead.shortlist || {};
    const categories = Object.keys(shortlist) as RoomCategory[];

    return (
        <div className="min-h-screen bg-white">
            {/* Developer/Admin Toolbar (Hides on Print) */}
            <div className="no-print sticky top-0 bg-[#1A1A1A] text-white p-4 flex justify-between items-center z-50">
                <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-white/60">
                    <span className="bg-white/10 px-2 py-1 rounded text-white">ADMIN VIEW</span>
                    <span>Lead ID: {id}</span>
                </div>
                <div className="flex gap-4">
                    <button onClick={() => window.print()} className="px-4 py-2 border border-white/20 rounded-lg text-xs hover:bg-white/10 transition-all font-bold">SAVE PDF</button>
                    <Link to="/" className="px-4 py-2 bg-white text-black rounded-lg text-xs font-bold">EXIT</Link>
                </div>
            </div>

            <div className="max-w-4xl mx-auto p-12 lg:p-20">
                {/* PDF Header Section */}
                <div className="text-center mb-16 border-b-2 border-black pb-10">
                    <h1 className="font-serif text-5xl text-black mb-3 tracking-tight">WOODFLEX DESIGNS</h1>
                    <p className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-10 font-bold font-sans">Handcrafted Furniture Collection</p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-left text-sm max-w-3xl mx-auto border border-gray-100 p-8 rounded-2xl bg-gray-50/50">
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Client Name</p>
                            <p className="font-serif text-lg flex items-center gap-2 text-gray-800">{lead.full_name}</p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Contact</p>
                            <p className="font-mono text-gray-800 flex items-center gap-2"><Phone size={12} /> {lead.phone}</p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Location</p>
                            <p className="text-gray-800 flex items-center gap-2"><MapPin size={12} /> {lead.city}</p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Room Selection</p>
                            <p className="capitalize text-gray-800">{lead.room_type || 'Custom'}</p>
                        </div>
                        <div className="md:col-span-2">
                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Generated On</p>
                            <p className="text-gray-800">{new Date(lead.created_at).toLocaleDateString()} at {new Date(lead.created_at).toLocaleTimeString()}</p>
                        </div>
                    </div>
                </div>

                {/* Shortlist Content */}
                <div className="space-y-16">
                    {categories.length === 0 ? (
                        <p className="text-center py-20 text-gray-400 italic">No items were selected in this session.</p>
                    ) : (
                        categories.map(cat => {
                            const ids = shortlist[cat];
                            if (!ids || ids.length === 0) return null;
                            return (
                                <section key={cat} className="page-break-inside-avoid">
                                    <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4">
                                        {cat.replace('_', ' ')}s Selected
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                                        {ids.map((prodId: string) => {
                                            const p = products.find(prod => prod.id === prodId);
                                            if (!p) return null;
                                            return (
                                                <div key={prodId} className="group">
                                                    <div className="aspect-[4/5] bg-gray-50 rounded-2xl overflow-hidden p-6 mb-4 border border-gray-100 transition-all">
                                                        <img src={p.imagePath} className="w-full h-full object-contain mix-blend-multiply" />
                                                    </div>
                                                    <h4 className="font-serif text-base text-gray-900 leading-tight">{p.title}</h4>
                                                    <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-1">Ref: {p.id}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </section>
                            );
                        })
                    )}
                </div>

                {/* Interaction Timeline (Developer Only, hidden on print) */}
                <div className="mt-32 no-print">
                    <h3 className="text-sm uppercase tracking-widest font-black text-gray-900 mb-10 pb-4 border-b">Interaction Timeline</h3>
                    <div className="space-y-6">
                        {interactions.map((event, idx) => (
                            <div key={event.id} className="flex gap-6 group">
                                <div className="flex flex-col items-center">
                                    <div className={`w-3 h-3 rounded-full mt-1.5 ${event.event_name.includes('swipe')
                                        ? (event.payload?.direction === 'right' ? 'bg-green-500' : 'bg-red-400')
                                        : 'bg-blue-500'
                                        }`}></div>
                                    {idx !== interactions.length - 1 && <div className="w-px h-full bg-gray-100 my-2"></div>}
                                </div>
                                <div className="pb-8">
                                    <p className="text-[10px] text-gray-400 font-mono mb-1">
                                        {new Date(event.created_at).toLocaleTimeString()}
                                    </p>
                                    <h4 className="text-sm font-bold text-gray-800 capitalize">
                                        {event.event_name.replace(/_/g, ' ')}
                                    </h4>
                                    {event.payload && (
                                        <div className="mt-2 p-4 bg-gray-50 rounded-xl border border-gray-100 text-[11px] text-gray-600 space-y-1">
                                            {event.event_name === 'houseowner_product_swiped' ? (
                                                <p>
                                                    <span className={`font-bold uppercase ${event.payload.direction === 'right' ? 'text-green-600' : 'text-red-500'}`}>
                                                        {event.payload.direction === 'right' ? 'Liked' : 'Skipped'}
                                                    </span>
                                                    {" "}{event.payload.productTitle} ({event.payload.productId})
                                                </p>
                                            ) : (
                                                Object.entries(event.payload).map(([k, v]) => (
                                                    <div key={k} className="flex gap-2">
                                                        <span className="font-bold text-gray-400">{k}:</span>
                                                        <span>{typeof v === 'object' ? JSON.stringify(v) : String(v)}</span>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Section (Print Only) */}
                <div className="hidden print:block mt-24 pt-12 border-t border-gray-200 text-center text-xs text-gray-400 space-y-2">
                    <p className="font-bold text-gray-900">WOODFLEX DESIGNS - Manufacturer of Bespoke Furniture</p>
                    <p>Site: woodflexdesigns.com • Phone: +91 94290 04803</p>
                </div>
            </div>
        </div>
    );
};
