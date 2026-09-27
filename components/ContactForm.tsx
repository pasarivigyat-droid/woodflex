'use client';

import { useEffect, useState } from 'react';
import { whatsappLink } from '@/lib/site';

const ROLES = [
  'Architect / Interior designer',
  'Homeowner',
  'Café / Restaurant / Retail owner',
  'Builder / Contractor',
  'Other',
];

// ?role= values used by the persona cards on the home page
const ROLE_FROM_QUERY: Record<string, string> = {
  architect: ROLES[0],
  homeowner: ROLES[1],
  cafe: ROLES[2],
};

const fieldClass =
  'w-full bg-[#f9f9f9] border border-ink/10 focus:border-ink p-4 text-sm outline-none transition-colors';
const labelClass = 'block text-[10px] uppercase tracking-widest font-bold text-ink/50 mb-2';

export function ContactForm() {
  const [form, setForm] = useState({ role: '', name: '', city: '', phone: '', email: '', notes: '' });

  useEffect(() => {
    const role = ROLE_FROM_QUERY[new URLSearchParams(window.location.search).get('role') ?? ''];
    if (role) setForm((f) => ({ ...f, role }));
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, role, city, notes, phone, email } = form;
    const message = `Hi, this is ${name} (${role}) from ${city}. I’m interested in custom furniture. Details: ${notes}. Phone: ${phone}. Email: ${email || 'Not provided'}.`;
    window.gtag?.('event', 'contact_whatsapp_submit', { role });
    window.open(whatsappLink(message), '_blank', 'noopener');
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label htmlFor="role" className={labelClass}>
          Who are you?
        </label>
        <select id="role" name="role" required value={form.role} onChange={onChange} className={`${fieldClass} appearance-none cursor-pointer`}>
          <option value="" disabled>
            Select your role
          </option>
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input id="name" type="text" name="name" autoComplete="name" required value={form.name} onChange={onChange} placeholder="Your name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="city" className={labelClass}>
            City
          </label>
          <input id="city" type="text" name="city" autoComplete="address-level2" required value={form.city} onChange={onChange} placeholder="City" className={fieldClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone / WhatsApp
          </label>
          <input id="phone" type="tel" name="phone" autoComplete="tel" required value={form.phone} onChange={onChange} placeholder="+91" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email (optional)
          </label>
          <input id="email" type="email" name="email" autoComplete="email" value={form.email} onChange={onChange} placeholder="Email address" className={fieldClass} />
        </div>
      </div>

      <div>
        <label htmlFor="notes" className={labelClass}>
          Project notes (sizes, room type, references...)
        </label>
        <textarea id="notes" name="notes" required rows={4} value={form.notes} onChange={onChange} placeholder="Tell us about your requirements" className={`${fieldClass} resize-none`} />
      </div>

      <button
        type="submit"
        className="w-full py-5 bg-ink text-white text-xs uppercase tracking-[0.3em] font-bold hover:bg-wood-900 transition-colors rounded-sm shadow-xl"
      >
        Send via WhatsApp
      </button>
    </form>
  );
}
