import React, { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { SmoothScroll } from './SmoothScroll';

export const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        role: '',
        name: '',
        city: '',
        phone: '',
        email: '',
        notes: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const { name, role, city, notes, phone, email } = formData;
        const message = `Hi, this is ${name} (${role}) from ${city}. I’m interested in custom furniture. Details: ${notes}. Phone: ${phone}. Email: ${email || 'Not provided'}.`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/919429004803?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
    };

    return (
        <SmoothScroll>
            <div className="min-h-screen flex flex-col w-full overflow-x-hidden bg-[#e8e6e1] text-[#1a1a1a] font-sans selection:bg-[#2d2a26] selection:text-white">
                <Header />

                <main className="flex-grow pt-40 pb-24">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">

                            {/* LEFT COLUMN */}
                            <div className="flex flex-col">
                                <h1 className="text-sm uppercase tracking-[0.2em] font-bold text-[#1a1a1a]/40 mb-8">Contact</h1>
                                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-[#1a1a1a] mb-8">
                                    Tell us what you’re planning. We’ll tell you if we can build it.
                                </h2>
                                <p className="text-xl leading-relaxed font-light text-[#1a1a1a]/70 max-w-lg">
                                    Share a few details about your project and we’ll get back with feasibility, rough costing and timelines. Architects can attach drawings; homeowners can mention reference links or screenshots.
                                </p>
                            </div>

                            {/* RIGHT COLUMN - FORM */}
                            <div className="bg-white p-8 md:p-12 shadow-sm border border-[#1a1a1a]/5 rounded-sm">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Role Select */}
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a]/40 mb-2">Who are you?</label>
                                        <select
                                            name="role"
                                            required
                                            value={formData.role}
                                            onChange={handleInputChange}
                                            className="w-full bg-[#f9f9f9] border border-[#1a1a1a]/10 focus:border-[#1a1a1a] p-4 text-sm outline-none transition-colors appearance-none cursor-pointer"
                                        >
                                            <option value="" disabled>Select your role</option>
                                            <option value="Architect / Interior designer">Architect / Interior designer</option>
                                            <option value="Homeowner">Homeowner</option>
                                            <option value="Builder / Contractor">Builder / Contractor</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    {/* Name & City */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a]/40 mb-2">Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Your Name"
                                                className="w-full bg-[#f9f9f9] border border-[#1a1a1a]/10 focus:border-[#1a1a1a] p-4 text-sm outline-none transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a]/40 mb-2">City</label>
                                            <input
                                                type="text"
                                                name="city"
                                                required
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                placeholder="City Name"
                                                className="w-full bg-[#f9f9f9] border border-[#1a1a1a]/10 focus:border-[#1a1a1a] p-4 text-sm outline-none transition-colors"
                                            />
                                        </div>
                                    </div>

                                    {/* Phone & Email */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a]/40 mb-2">Phone / WhatsApp</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="+91"
                                                className="w-full bg-[#f9f9f9] border border-[#1a1a1a]/10 focus:border-[#1a1a1a] p-4 text-sm outline-none transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a]/40 mb-2">Email (Optional)</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="Email Address"
                                                className="w-full bg-[#f9f9f9] border border-[#1a1a1a]/10 focus:border-[#1a1a1a] p-4 text-sm outline-none transition-colors"
                                            />
                                        </div>
                                    </div>

                                    {/* Project Notes */}
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a]/40 mb-2">Project notes (sizes, room type, references...)</label>
                                        <textarea
                                            name="notes"
                                            required
                                            rows={4}
                                            value={formData.notes}
                                            onChange={handleInputChange}
                                            placeholder="Tell us about your requirements"
                                            className="w-full bg-[#f9f9f9] border border-[#1a1a1a]/10 focus:border-[#1a1a1a] p-4 text-sm outline-none transition-colors resize-none"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="w-full py-5 bg-[#1a1a1a] text-white text-xs uppercase tracking-[0.3em] font-bold hover:bg-[#2d2a26] transition-colors rounded-sm shadow-xl"
                                    >
                                        Send via WhatsApp
                                    </button>
                                </form>
                            </div>

                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </SmoothScroll>
    );
};
